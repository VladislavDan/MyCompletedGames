import {Component, OnInit} from "@angular/core";
import * as dialogs from "ui/dialogs";

import {BaseComponent} from "../common/BaseComponent";
import {PageRoute, RouterExtensions} from "nativescript-angular";
import {Game} from "../common/Game";
import {GamesFileService} from "../services/GamesFileService";
import {GamesFileModel} from "../common/GamesFile";
import {GoogleFileSyncService} from "../services/GoogleFileSyncService";
import {GoogleAuthService} from "../services/GoogleAuthService";

@Component({
    selector: "details",
    moduleId: module.id,
    templateUrl: "./details.component.html",
    styleUrls: ['./details.css']
})
export class DetailsComponent extends BaseComponent implements OnInit {

    public game: Game;

    constructor(private pageRoute: PageRoute,
                private gamesService: GamesFileService,
                private routerExtensions: RouterExtensions,
                private googleFileSyncService: GoogleFileSyncService,
                private googleAuthService: GoogleAuthService) {
        super();
    }

    ngOnInit() {
        this.showProgress();
        let subscription = this.pageRoute.activatedRoute
            .switchMap(activatedRoute => activatedRoute.params)
            .switchMap((params) => {
                return this.gamesService.getGamesById(params['id'])
            })
            .subscribe(
                (game) => {
                    this.hideProgress();
                    this.game = game;
                },
                (error) => {
                    this.hideProgress();
                    this.showAlert({
                        title: "Getting game",
                        message: error.message
                    })
                });
        this.subscriptions.push(subscription);
    }

    onBack() {
        this.routerExtensions.back();
    }

    onDelete() {
        dialogs.confirm({
            title: "Delete game",
            message: "Are you sure?",
            okButtonText: "Ok",
            cancelButtonText: "Cancel"
        }).then((result) => {
            if (result) {
                this.deleteGame();
            }
        });
    }

    private deleteGame() {
        this.showProgress();
        this.gamesService.deleteGame(this.game)
            .switchMap((result: GamesFileModel) => {
                return this.googleFileSyncService.requestUploadFile(
                    this.googleAuthService.getTokenFromStorage(),
                    JSON.stringify(result)
                );
            })
            .subscribe(
                () => {
                    this.hideProgress();
                    this.gamesService.getGames("", {who: "", console: ""});
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
}
