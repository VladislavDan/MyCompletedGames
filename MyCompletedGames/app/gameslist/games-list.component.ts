import {Component, NgZone, OnInit} from "@angular/core";
import {SearchBar} from "tns-core-modules/ui/search-bar";

import {Game} from "../common/Game";
import {GamesFileService} from "../services/GamesFileService";
import {GoogleAuthService} from "../services/GoogleAuthService";
import {GoogleFileSyncService} from "../services/GoogleFileSyncService";
import {VIDEO_GAME_CONSOLES, WHO} from "../common/Constants";
import {Filter} from "../common/Filter";
import {BaseComponent} from "../common/BaseComponent";

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
        this.googleAuthService.getToken()
            .switchMap((result) => {
                return this.googleFileSyncService.requestLoadFile(result);
            })
            .switchMap((result) => {
                return this.gamesFileService.updateFile(result)
            })
            .switchMap(() => {
                return this.gamesFileService.getGames(this.filter);
            })
            .subscribe(
                (games) => {
                    this.hideProgress();
                    this.zone.run(() => {
                        this.games = games
                    });
                },
                (error) => {
                    this.hideProgress();
                    this.showAlert({
                        title: "First getting games",
                        message: error.message
                    });
                }
            );
    }

    onTextChanged(args) {

        let searchBar = <SearchBar>args.object;
        let searchValue = searchBar.text;
        let subscription = this.gamesFileService.findGamesByName(searchValue, this.filter).subscribe(
            (games) => {
                this.games = games;
            },
            (error) => {
                this.showAlert({
                    title: "Finding game",
                    message: error.message
                });
            }
        );
        this.subscriptions.push(subscription);
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

    private getGames() {
        let subscription = this.gamesFileService.getGames(this.filter).subscribe(
            (games) => {
                this.hideProgress();
                this.games = games;
            },
            (error) => {
                this.hideProgress();
                this.showAlert({
                    title: "Getting games",
                    message: error.message
                });
            }
        );
        this.subscriptions.push(subscription);
    }
}
