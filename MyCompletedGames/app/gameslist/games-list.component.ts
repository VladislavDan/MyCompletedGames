import {Component, OnInit} from "@angular/core";
import {GamesService} from "../services/GamesService";

@Component({
    selector: "GamesList",
    moduleId: module.id,
    providers: [GamesService],
    templateUrl: "./games-list.component.html",
    styleUrls: ['./games-list.css']
})
export class GamesListComponent implements OnInit {

    constructor(private gamesService: GamesService) {
    }

    ngOnInit(): void {

        GamesService.getGames().subscribe(
            (data) => {
                console.log(data);
            },
            (error) => {
                console.log(error);
            }
        );
    }
}
