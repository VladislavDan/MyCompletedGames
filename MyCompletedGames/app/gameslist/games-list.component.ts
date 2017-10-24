import {Component, OnInit, ViewContainerRef} from "@angular/core";
import {SearchBar} from "tns-core-modules/ui/search-bar";

import {Game} from "../common/Game";
import {GamesFileService} from "../services/GamesFileService";
import {MOCK_GAMES} from "../common/MockGames";
import {GoogleAuthService} from "../services/GoogleAuthService";
import {GoogleFileSyncService} from "../services/GoogleFileSyncService";
import {ModalDialogService} from "nativescript-angular";
import {ConsoleChooserComponent} from "../consolechooser/console-chooser.component";

@Component({
    selector: "games-list",
    moduleId: module.id,
    templateUrl: "./games-list.component.html",
    styleUrls: ['./games-list.css']
})
export class GamesListComponent implements OnInit {

    public games: Array<Game> = [];

    constructor(private modal: ModalDialogService, private vcRef: ViewContainerRef, private googleAuthService: GoogleAuthService, private googleFileSyncService: GoogleFileSyncService, private gamesFileService: GamesFileService) {

        this.games = MOCK_GAMES.games;
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

    onTap(event) {

        let options = {
            context: {},
            fullscreen: false,
            viewContainerRef: this.vcRef
        };
        this.modal.showModal(ConsoleChooserComponent, options).then(res => {
            console.log("Chooser closed");
        });
    }
}
