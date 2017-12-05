import {Component, NgZone, OnInit} from "@angular/core";
import * as dialogs from "ui/dialogs";
import * as _ from "lodash";

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
                private googleAuthService: GoogleAuthService,
                private zone: NgZone) {
        super();
    }

    ngOnInit() {
        let subscriptionGamesChannel;
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
                    subscriptionGamesChannel = this.gamesService.gamesChannel.subscribe((games) => {
                        this.hideProgress();
                        this.zone.run(() => {
                            this.game = _.find(games, (item) => {
                                return item.id === this.game.id;
                            })
                        });
                    });
                },
                (error) => {
                    this.hideProgress();
                    this.showAlert({
                        title: "Getting game",
                        message: error.message
                    })
                });
        this.subscriptions.push(subscription, subscriptionGamesChannel);
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

    onCreate() {
        this.routerExtensions.navigate(["edit", this.game.id]);
    }

    private deleteGame() {
        this.showProgress();
        this.gamesService.deleteGame(this.game)
            .switchMap((result: GamesFileModel) => {
                return this.googleFileSyncService.requestUploadFile(
                    this.googleAuthService.getTokenFromStorage(),
                    JSON.stringify(result),
                    this.googleFileSyncService.getFileIdFromStorage()
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
