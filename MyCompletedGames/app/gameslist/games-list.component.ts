import {Component, OnInit} from "@angular/core";
import {SearchBar} from "tns-core-modules/ui/search-bar";

import {Game} from "../common/Game";
import {GamesFileService} from "../services/GamesFileService";
import {MOCK_GAMES} from "../common/MockGames";
import {GoogleAuthService} from "../services/GoogleAuthService";
import {GoogleFileSyncService} from "../services/GoogleFileSyncService";
import {VIDEO_GAME_CONSOLES, WHO} from "../common/Constants";

@Component({
    selector: "games-list",
    moduleId: module.id,
    templateUrl: "./games-list.component.html",
    styleUrls: ['./games-list.css']
})
export class GamesListComponent implements OnInit {

    public consoles: Array<String> = VIDEO_GAME_CONSOLES;

    public who: Array<String> = WHO;

    public games: Array<Game> = [];

    public isShowConsoleChooser: boolean;

    public isShowWhoChooser: boolean;

    public chosenConsoleIndex: number = 0;

    public chosenWhoIndex: number = 0;

    constructor(private googleAuthService: GoogleAuthService,
                private googleFileSyncService: GoogleFileSyncService,
                private gamesFileService: GamesFileService) {

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
                                this.gamesFileService.getGames().subscribe(
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
        this.gamesFileService.findGamesByName(searchValue).subscribe(
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

    onChooseConsole(index) {
        this.chosenConsoleIndex = index;
        console.log("console chosen")
    }

    onChooseWho(index) {
        this.chosenWhoIndex = index;
        console.log("who chosen")
    }
}
