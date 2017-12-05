import {Component, NgZone, OnInit} from "@angular/core";
import {SearchBar} from "tns-core-modules/ui/search-bar";
import * as dialogs from "ui/dialogs";
import * as _ from "lodash";

import {Game} from "../common/Game";
import {GamesFileService} from "../services/GamesFileService";
import {GoogleAuthService} from "../services/GoogleAuthService";
import {GoogleFileSyncService} from "../services/GoogleFileSyncService";
import {ADD_NEW_FILE, VIDEO_GAME_CONSOLES, WHO} from "../common/Constants";
import {Filter} from "../common/Filter";
import {BaseComponent} from "../common/BaseComponent";
import {RouterExtensions} from "nativescript-angular";
import {FIRST_UPLOAD_MODEL} from "../common/FirstUploadModel";
import {Subscriber} from "rxjs/Subscriber";
import {isAndroid} from "tns-core-modules/platform";

@Component({
    selector: "games-list",
    moduleId: module.id,
    templateUrl: "./games-list.component.html",
    styleUrls: ['./games-list.css']
})
export class GamesListComponent extends BaseComponent implements OnInit {

    private filter: Filter;

    public consoles: Array<String> = VIDEO_GAME_CONSOLES;

    public who: Array<String> = WHO;

    public games: Array<Game> = [];

    public isShowConsoleChooser: boolean;

    public isShowWhoChooser: boolean;

    public chosenConsoleIndex: number;

    public chosenWhoIndex: number;

    constructor(private googleAuthService: GoogleAuthService,
                private googleFileSyncService: GoogleFileSyncService,
                private gamesFileService: GamesFileService,
                private routerExtensions: RouterExtensions,
                private zone: NgZone) {
        super();
        this.filter = {
            console: "",
            who: ""
        };
        this.isShowConsoleChooser = false;
        this.isShowWhoChooser = false;
    }

    ngOnInit(): void {
        this.showProgress();
        let subscriptionAuth = this.googleAuthService.getToken().subscribe(
            (result) => {
                this.onReload(null);
            },
            (error) => {
                this.hideProgress();
                this.showAlert({
                    title: "Authorization",
                    message: error.message
                });
            }
        );
        let subscriptionGamesChannel = this.gamesFileService.gamesChannel
            .subscribe(
                (games) => {
                    this.zone.run(() => {
                        this.games = games;
                    });
                    this.hideProgress();
                },
                (error) => {
                    this.hideProgress();
                    this.showAlert({
                        title: "Showing games",
                        message: error.message
                    });
                }
            );

        this.subscriptions.push(subscriptionAuth);
        this.subscriptions.push(subscriptionGamesChannel);
    }

    onTextChanged(args) {

        let searchBar = <SearchBar>args.object;
        let searchValue = searchBar.text;
        this.gamesFileService.getGames(searchValue, this.filter);
    }

    onClearFocus(event) {
        if (isAndroid) {
            if (event.object.android) {
                event.object.dismissSoftInput();
                event.object.android.clearFocus();
                event.object.android.setFocusable(false);
            }
        }
    }

    onShowConsoleChooser(event) {
        this.isShowConsoleChooser = !this.isShowConsoleChooser;
        if (!this.isShowConsoleChooser) {
            this.getGames();
        }
    }

    onShowWhoChooser(event) {
        this.isShowWhoChooser = !this.isShowWhoChooser;
        if (!this.isShowWhoChooser) {
            this.getGames();
        }
    }

    onClearFilter(event) {
        this.filter = {
            console: "",
            who: ""
        };
        this.getGames();
    }

    onChooseWhere(index: number) {
        this.chosenConsoleIndex = index;
        if (Number.isNaN(index)) {
            this.filter.console = VIDEO_GAME_CONSOLES[0];
        } else {
            this.filter.console = VIDEO_GAME_CONSOLES[index];
        }
    }

    onChooseWho(index) {
        this.chosenWhoIndex = index;
        if (Number.isNaN(index)) {
            this.filter.who = WHO[0];
        } else {
            this.filter.who = WHO[index];
        }
    }

    onItemTap(event) {
        this.routerExtensions.navigate(["edit", this.games[event.index].id]);
    }

    onReload(event) {
        this.showProgress();
        this.reload();
    }

    private reload() {
        let subscription = this.googleFileSyncService.getExistFiles(this.googleAuthService.getTokenFromStorage())
            .subscribe(
                (result) => {
                    this.hideProgress();
                    this.showChooserDialog(result);
                },
                (error) => {
                    this.hideProgress();
                    this.showAlert({
                        title: "Showing exist files",
                        message: error.message
                    });
                }
            );
        this.subscriptions.push(subscription);
    }

    private showChooserDialog(result) {
        let options = _.map(result, (item: any) => {
            return item.id;
        });
        options.push(ADD_NEW_FILE);
        dialogs.action({
            message: "Choose file",
            actions: options
        }).then(result => {
            let subscription;
            if (result === ADD_NEW_FILE) {
                subscription = this.createAndLoadFile();
            } else if (result.length > 0) {
                subscription = this.loadFile(result);
            }
            this.subscriptions.push(subscription);
        });
    }

    private createAndLoadFile() {
        this.showProgress();
        return this.googleFileSyncService.createCompletedGamesFolder(this.googleAuthService.getTokenFromStorage())
            .switchMap((result) => {
                return this.googleFileSyncService.createCompletedGamesFile(
                    this.googleAuthService.getTokenFromStorage(),
                    result
                );
            })
            .switchMap((result) => {
                this.googleFileSyncService.setFileIdToStorage(result);
                return this.googleFileSyncService.requestUploadFile(this.googleAuthService.getTokenFromStorage(), JSON.stringify(FIRST_UPLOAD_MODEL, [], 4), result);
            })
            .switchMap((result) => {
                return this.googleFileSyncService.requestLoadFile(this.googleAuthService.getTokenFromStorage(), result);
            })
            .switchMap((result) => {
                return this.gamesFileService.updateFile(result)
            })
            .subscribe(
                () => {
                    this.hideProgress();
                },
                (error) => {
                    this.createGamesLoadingSubscriber();
                }
            );
    }

    private loadFile(result) {
        this.googleFileSyncService.setFileIdToStorage(result);
        this.showProgress();
        return this.googleFileSyncService.requestLoadFile(this.googleAuthService.getTokenFromStorage(), result)
            .switchMap((result) => {
                return this.gamesFileService.updateFile(result)
            })
            .subscribe(
                this.createGamesLoadingSubscriber()
            );
    }

    private createGamesLoadingSubscriber(): Subscriber<any> {
        return Subscriber.create(
            () => {
                this.hideProgress();
                this.gamesFileService.getGames("", this.filter);
            },
            (error) => {
                this.hideProgress();
                this.showAlert({
                    title: "Loading games",
                    message: error.message
                });
            }
        )
    }

    private getGames() {
        this.gamesFileService.getGames("", this.filter);
    }
}
