import {Component} from "@angular/core";
import {RouterExtensions} from "nativescript-angular";

@Component({
    selector: "games-list",
    moduleId: module.id,
    templateUrl: "./new-game.component.html",
    styleUrls: ['./new-game.css']
})
export class NewGameComponent {

    constructor(private routerExtensions: RouterExtensions) {
    }

    onBack() {
        this.routerExtensions.back();
    }
}
