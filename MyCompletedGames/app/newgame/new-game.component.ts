import {Component} from "@angular/core";
import {PageRoute, RouterExtensions} from "nativescript-angular";
import {requestPermissions} from "nativescript-camera";
import {ReplaySubject} from "rxjs/ReplaySubject";

import {TOGETHER, VIDEO_GAME_CONSOLES, WHO} from "../common/Constants";
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
                private gamesFileService: GamesFileService,
                private googleFileSyncService: GoogleFileSyncService,
                private googleAuthService: GoogleAuthService) {
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

    onSaveNewGame(event) {
        this.showProgress();
        let subscription;
        if (!this.id) {
            subscription = this.addGame();
        } else {
            subscription = this.changeGame();
        }
        this.subscriptions.push(subscription);
    }

    onDeleteGame() {
        this.showProgress();
        this.gamesFileService.deleteGame(this.id.toString())
            .switchMap((result: GamesFileModel) => {
                return this.googleFileSyncService.requestUploadFile(
                    this.googleAuthService.getTokenFromStorage(),
                    JSON.stringify(result, null, 4),
                    this.googleFileSyncService.getFileIdFromStorage()
                );
            })
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
    }

    onBack() {
        this.routerExtensions.backToPreviousPage();
    }

    private addGame() {
        return this.gamesFileService.addNewGame({
            id: Date.now().toString(),
            name: this.what,
            console: this.consoles[this.chosenConsoleIndex],
            isTogether: this.who[this.chosenWhoIndex] === TOGETHER,
        }).switchMap((result: GamesFileModel) => {
            return this.googleFileSyncService.requestUploadFile(
                this.googleAuthService.getTokenFromStorage(),
                JSON.stringify(result, null, 4),
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
                isTogether: this.who[this.chosenWhoIndex] === TOGETHER
            })
            .switchMap((result: GamesFileModel) => {
                return this.googleFileSyncService.requestUploadFile(
                    this.googleAuthService.getTokenFromStorage(),
                    JSON.stringify(result, null, 4),
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
