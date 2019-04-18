import {Component, Input} from "@angular/core";
import {Game} from "~/typings/Game";
import {RouterExtensions} from "nativescript-angular";

@Component({
    selector: "games-list-item",
    moduleId: module.id,
    templateUrl: "./games-list-item.component.html",
    styleUrls: ['./games-list-item.css']
})
export class GamesListItemComponent {

    @Input()
    public game: Game;

    constructor(private routerExtensions: RouterExtensions) {

    }

    onItemTap(event) {
        this.routerExtensions.navigate(["edit", this.game.id]);
    }
}
