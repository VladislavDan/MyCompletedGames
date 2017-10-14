import {Component, Input, OnInit} from "@angular/core";
import {GamesService} from "../services/GamesService";
import {Game} from "../common/Game";

@Component({
    selector: "games-list",
    moduleId: module.id,
    providers: [GamesService],
    templateUrl: "./games-list.component.html",
    styleUrls: ['./games-list.css']
})
export class GamesListComponent implements OnInit {

    @Input()
    public games: Game[];

    constructor(private gamesService: GamesService) {
    }

    ngOnInit(): void {

        this.gamesService.getGames().subscribe(
            (games) => {
                this.games = games;
            },
            (error) => {
                console.log(error);
            }
        );
    }
}
