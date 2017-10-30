import {Component, OnInit} from "@angular/core";
import {SearchBar} from "tns-core-modules/ui/search-bar";

import {Game} from "../common/Game";
import {GamesFileService} from "../services/GamesFileService";
import {MOCK_GAMES} from "../common/MockGames";
import {GoogleAuthService} from "../services/GoogleAuthService";
import {GoogleFileSyncService} from "../services/GoogleFileSyncService";
import {VIDEO_GAME_CONSOLES, WHO} from "../common/Constants";
import {Filter} from "../common/Filter";

@Component({
    selector: "games-list",
    moduleId: module.id,
    templateUrl: "./games-list.component.html",
    styleUrls: ['./games-list.css']
})
export class GamesListComponent implements OnInit {

    private filter: Filter;

    public consoles: Array<String> = VIDEO_GAME_CONSOLES;

    public who: Array<String> = WHO;

    public games: Array<Game> = [];

    public isShowConsoleChooser: boolean;

    public isShowWhoChooser: boolean;

    constructor(private googleAuthService: GoogleAuthService,
                private googleFileSyncService: GoogleFileSyncService,
                private gamesFileService: GamesFileService) {
        this.filter = {
            console: "",
            who: ""
        };
        this.games = MOCK_GAMES.games;
        this.isShowConsoleChooser = false;
        this.isShowWhoChooser = false;
    }

    ngOnInit(): void {

        this.googleAuthService.getToken().subscribe(
            (result) => {
                console.log("Result request token: " + result);
                this.googleFileSyncService.requestLoadFile(result).subscribe(
                    (result) => {
                        console.dir(result);
                        this.gamesFileService.updateFile(result).subscribe(
                            () => {
                                this.gamesFileService.getGames(this.filter).subscribe(
                                    (games) => {
                                        console.log("GamesListComponent getGames ");
                                        console.dir(games);
                                        this.games = games;
                                    },
                                    (error) => {
                                        console.log("GamesListComponent getGames error " + error);
                                    }
                                )
                            },
                            (error) => {
                                console.log("GamesListComponent updateFile error " + error);
                            }
                        );
                    },
                    (error) => {
                        console.log("GamesListComponent requestLoadFile error " + error);
                    }
                )
            }
        );
    }

    onTextChanged(args) {

        let searchBar = <SearchBar>args.object;
        let searchValue = searchBar.text;
        this.gamesFileService.findGamesByName(searchValue, this.filter).subscribe(
            (games) => {
                this.games = games;
            },
            (error) => {
                console.log("GamesListComponent getGames error " + error);
            }
        )
    }

    onShowConsoleChooser(event) {
        this.isShowConsoleChooser = !this.isShowConsoleChooser;
    }

    onShowWhoChooser(event) {
        this.isShowWhoChooser = !this.isShowWhoChooser;
    }

    onClearFilter(event) {
        this.filter = {
            console: "",
            who: ""
        };
    }

    onChooseConsole(index: number) {
        if (Number.isNaN(index)) {
            this.filter.console = VIDEO_GAME_CONSOLES[0];
        } else {
            this.filter.console = VIDEO_GAME_CONSOLES[index];
        }
    }

    onChooseWho(index) {
        if (Number.isNaN(index)) {
            this.filter.who = WHO[0];
        } else {
            this.filter.who = WHO[index];

        }
    }
}
