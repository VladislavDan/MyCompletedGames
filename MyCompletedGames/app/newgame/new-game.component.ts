import {Component, NgZone, ViewContainerRef} from "@angular/core";
import {ModalDialogOptions, ModalDialogService, PageRoute, RouterExtensions} from "nativescript-angular";
import {requestPermissions} from "nativescript-camera";
import {ReplaySubject} from "rxjs/ReplaySubject";

import {MAX_IMAGE_COUNT, TOGETHER, VIDEO_GAME_CONSOLES, WHO} from "../common/Constants";
import {ImageChooserComponent} from "../imagechooser/image-chooser.component";
import {GamesFileService} from "../services/GamesFileService";
import {BaseComponent} from "../common/BaseComponent";
import {GamesFileModel} from "../common/GamesFile";
import {GoogleFileSyncService} from "../services/GoogleFileSyncService";
import {GoogleAuthService} from "../services/GoogleAuthService";

@Component({
    selector: "games-list",
    moduleId: module.id,
    templateUrl: "./new-game.component.html",
    styleUrls: ['./new-game.css']
})
export class NewGameComponent extends BaseComponent {

    public consoles: Array<String> = VIDEO_GAME_CONSOLES;

    public who: Array<String> = WHO;

    public images: Array<String> = [];

    public what: String = "";

    public chosenConsoleIndex: number = 0;

    public chosenWhoIndex: number = 0;

    public id: String = "";

    private imageChooseChannel: ReplaySubject<Array<string>> = new ReplaySubject();

    constructor(private pageRoute: PageRoute,
                private routerExtensions: RouterExtensions,
                private modalService: ModalDialogService,
                private vcRef: ViewContainerRef,
                private gamesFileService: GamesFileService,
                private googleFileSyncService: GoogleFileSyncService,
                private googleAuthService: GoogleAuthService,
                private zone: NgZone) {
        super();
        requestPermissions();
        this.imageChooseChannel.subscribe((images: Array<string>) => {
            this.images = images;
        });
        let subscription = this.pageRoute.activatedRoute
            .switchMap(activatedRoute => activatedRoute.params)
            .switchMap((params) => {
                return this.gamesFileService.getGamesById(params['id'])
            })
            .subscribe(
                (game) => {
                    this.chosenWhoIndex = game.isTogether ? 0 : 1;
                    this.chosenConsoleIndex = this.consoles.indexOf(game.console);
                    this.images = game.images;
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

    onChooseWhere(index: number) {
        this.chosenConsoleIndex = index;
    }

    onChooseWho(index) {
        this.chosenWhoIndex = index;
    }

    onChooseImage(event) {
        this.showImagesChooser()
            .then(result => {
                if (result) {
                    this.images = result;
                } else {
                    this.images = [];
                }
            })
            .catch(error => this.showAlert({
                title: "Choosing image",
                message: error.message
            }));
    }

    onSaveNewGame(event) {
        if (this.what && this.images.length === 3) {
            this.showProgress();
            let subscription;
            if (!this.id) {
                console.log("add game");
                subscription = this.addGame();
            } else {
                console.log("change game " + this.id);
                subscription = this.changeGame();
            }
            this.subscriptions.push(subscription);
        } else {
            this.showAlert({
                title: "Saving image",
                message: "Choose " + MAX_IMAGE_COUNT + " image and input name"
            })
        }
    }

    onBack() {
        this.routerExtensions.backToPreviousPage();
    }

    private showImagesChooser(): Promise<any> {
        const options: ModalDialogOptions = {
            viewContainerRef: this.vcRef,
            fullscreen: true
        };
        return this.modalService.showModal(ImageChooserComponent, options);
    }

    private addGame() {
        return this.gamesFileService.addNewGame({
            id: Date.now().toString(),
            name: this.what,
            console: this.consoles[this.chosenConsoleIndex],
            isTogether: this.who[this.chosenWhoIndex] === TOGETHER,
            images: this.images
        }).switchMap((result: GamesFileModel) => {
            return this.googleFileSyncService.requestUploadFile(
                this.googleAuthService.getTokenFromStorage(),
                JSON.stringify(result),
                this.googleFileSyncService.getFileIdFromStorage()
            );
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
    }

    private changeGame() {
        return this.gamesFileService
            .changeGame({
                id: this.id,
                name: this.what,
                console: this.consoles[this.chosenConsoleIndex],
                isTogether: this.who[this.chosenWhoIndex] === TOGETHER,
                images: this.images
            })
            .switchMap((result: GamesFileModel) => {
                return this.googleFileSyncService.requestUploadFile(
                    this.googleAuthService.getTokenFromStorage(),
                    JSON.stringify(result),
                    this.googleFileSyncService.getFileIdFromStorage()
                );
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
