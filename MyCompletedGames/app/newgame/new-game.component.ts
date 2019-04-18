import {Component, NgZone, ViewContainerRef} from "@angular/core";
import {ModalDialogOptions, ModalDialogService, PageRoute, RouterExtensions} from "nativescript-angular";
import {ReplaySubject} from "rxjs";

import {TOGETHER, VIDEO_GAME_CONSOLES, WHO} from "~/common/Constants";
import {GamesService} from "~/services/GamesService";
import {BaseComponent} from "~/common/BaseComponent";
import {WebImagePickerComponent} from "~/webimagepicker/web-image-picker.component";

import {switchMap} from 'rxjs/operators'
import {Image} from "~/typings/Image";
import {knownFolders} from "tns-core-modules/file-system";
import {fromBase64} from "tns-core-modules/image-source";

@Component({
    selector: "new-game",
    moduleId: module.id,
    templateUrl: "./new-game.component.html",
    styleUrls: ['./new-game.css']
})
export class NewGameComponent extends BaseComponent {

    public consoles: Array<string> = VIDEO_GAME_CONSOLES;

    public who: Array<string> = WHO;

    public image: Image;

    public what: string = "";

    public chosenConsoleIndex: number = 0;

    public chosenWhoIndex: number = 0;

    public id: string = "";

    public title: string = "New game";

    private imageChooseChannel: ReplaySubject<Array<number>> = new ReplaySubject();

    constructor(private pageRoute: PageRoute,
                private routerExtensions: RouterExtensions,
                private modalService: ModalDialogService,
                private vcRef: ViewContainerRef,
                private zone: NgZone,
                private gamesFileService: GamesService) {
        super();
        this.imageChooseChannel.subscribe((images: Array<number>) => {
            //TODO this.images = images;
        });
        let subscription = this.pageRoute.activatedRoute

            .pipe(
                switchMap(activatedRoute => activatedRoute.params),
                switchMap((params) => {
                    return this.gamesFileService.getGamesById(params['id'])
                })
            )
            .subscribe(
                (game) => {
                    this.title = "Changing game";
                    this.chosenWhoIndex = game.isTogether ? 0 : 1;
                    this.chosenConsoleIndex = this.consoles.indexOf(game.console);
                    let imageSource;
                    let path;
                    if (game.image) {
                        imageSource = fromBase64(game.image);
                        path = knownFolders.temp().path + "/" + Date.now() + ".jpg";
                        imageSource.saveToFile(path, "jpg");
                    }

                    this.image = {
                        id: new Date().getTime(),
                        cachedFilePath: path,
                        base64: game.image ? game.image : ''
                    };
                    this.what = game.name;
                    this.id = game.id;
                },
                (error) => {
                    this.showAlert({
                        title: "Getting game",
                        message: error.message
                    })
                }
            );
        this.subscriptions.push(subscription);
    }

    onChooseImage = (event) => {
        this.showImagesChooser()
            .then(result => {
                if (result) {
                    this.image = result;
                } else {
                    this.image = null;
                }
            })
            .catch(error => this.showAlert({
                title: "Choosing image",
                message: error.message
            }));
    };

    onChooseWhere = (index: number) => {
        this.chosenConsoleIndex = index;
    };

    onChooseWho = (index) => {
        this.chosenWhoIndex = index;
    };

    onSaveNewGame = (event) => {
        this.showProgress();
        let subscription;
        if (!this.id) {
            subscription = this.addGame();
        } else {
            subscription = this.changeGame();
        }
        this.subscriptions.push(subscription);
    };

    onDeleteGame = () => {
        this.showProgress();
        this.gamesFileService.deleteGame(this.id.toString())
            .subscribe(
                () => {
                    this.hideProgress();
                    this.gamesFileService.getGames("", {who: "", console: ""});
                    this.routerExtensions.back();
                },
                (error) => {
                    this.hideProgress();
                    this.showAlert({
                        title: "Deleting game",
                        message: error.message
                    })
                }
            );
    };

    onBack = () => {
        this.routerExtensions.backToPreviousPage();
    };

    private showImagesChooser = (): Promise<any> => {
        const options: ModalDialogOptions = {
            viewContainerRef: this.vcRef,
            fullscreen: true,
            context: {
                console: this.consoles[this.chosenConsoleIndex],
                name: this.what
            }
        };
        return this.modalService.showModal(WebImagePickerComponent, options);
    };

    private addGame = () => {
        let imagesStrings: string;
        imagesStrings = this.image.base64;
        return this.gamesFileService.addNewGame({
            id: Date.now().toString(),
            name: this.what,
            console: this.consoles[this.chosenConsoleIndex],
            isTogether: this.who[this.chosenWhoIndex] === TOGETHER,
            image: imagesStrings
        }).subscribe(
            () => {
                //TODO hack for update list
                this.gamesFileService.getGames("", {who: "", console: ""});
                this.hideProgress();
                this.routerExtensions.backToPreviousPage();
            },
            (error) => {
                this.hideProgress();
                this.showAlert({
                    title: "Saving new game",
                    message: error.message
                })
            }
        );
    };

    private changeGame = () => {
        let imagesStrings: string;
        imagesStrings = this.image.base64;
        return this.gamesFileService
            .changeGame({
                id: this.id,
                name: this.what,
                console: this.consoles[this.chosenConsoleIndex],
                isTogether: this.who[this.chosenWhoIndex] === TOGETHER,
                image: imagesStrings
            }).subscribe(
                () => {
                    //TODO hack for update list
                    this.gamesFileService.getGames("", {who: "", console: ""});
                    this.hideProgress();
                    this.routerExtensions.backToPreviousPage();
                },
                (error) => {
                    this.hideProgress();
                    this.showAlert({
                        title: "Saving changed game",
                        message: error.message
                    })
                }
            );
    }
}
