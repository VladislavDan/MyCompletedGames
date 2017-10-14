import {Component, Input, OnInit} from "@angular/core";
import {Game} from "../common/Game";

@Component({
    selector: "games-list-item",
    moduleId: module.id,
    templateUrl: "./games-list-item.component.html",
    styleUrls: ['./games-list-item.css']
})
export class GamesListItemComponent implements OnInit {

    @Input()
    public game: Game;

    constructor() {
    }

    ngOnInit(): void {
        console.log(this.game);
    }
}
