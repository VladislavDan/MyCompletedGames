import {Component, Input, OnInit} from "@angular/core";
import {Game} from "../common/Game";
import {GamesFileService} from "../services/GamesFileService";
import {MOCK_GAMES} from "../common/MockGames";

import Application = require("application");
import SocialLogin = require("nativescript-social-login");

@Component({
    selector: "games-list",
    moduleId: module.id,
    templateUrl: "./games-list.component.html",
    styleUrls: ['./games-list.css']
})
export class GamesListComponent implements OnInit {

    @Input()
    public games: Game[];

    constructor(private gamesFileService: GamesFileService) {
    }

    ngOnInit(): void {

        this.gamesFileService.updateFile(MOCK_GAMES).subscribe(
            () => {
                this.gamesFileService.getGames().subscribe(
                    (games) => {
                        this.games = games;
                    },
                    (error) => {
                        console.dir(error)
                    }
                )
            },
            (error) => {
                console.dir(error);
            }
        );
    }
}
