import {Component} from "@angular/core";
import {RouterExtensions} from "nativescript-angular";
import {VIDEO_GAME_CONSOLES, WHO} from "../common/Constants";

@Component({
    selector: "games-list",
    moduleId: module.id,
    templateUrl: "./new-game.component.html",
    styleUrls: ['./new-game.css']
})
export class NewGameComponent {

    public consoles: Array<String> = VIDEO_GAME_CONSOLES;

    public who: Array<String> = WHO;

    public images: Array<String> = [
        "data:image/gif;base64,R0lGODlhEAAOALMAAOazToeHh0tLS/7LZv/0jvb29t/f3//Ub//ge8WSLf/rhf/3kdbW1mxsbP//mf///yH5BAAAAAAALAAAAAAQAA4AAARe8L1Ekyky67QZ1hLnjM5UUde0ECwLJoExKcppV0aCcGCmTIHEIUEqjgaORCMxIC6e0CcguWw6aFjsVMkkIr7g77ZKPJjPZqIyd7sJAgVGoEGv2xsBxqNgYPj/gAwXEQA7"
    ];

    public what: string = "";

    public chosenConsoleIndex: number;

    public chosenWhoIndex: number;

    constructor(private routerExtensions: RouterExtensions) {
    }

    onChooseWhere(index: number) {
        this.chosenConsoleIndex = index;
    }

    onChooseWho(index) {
        this.chosenWhoIndex = index;
    }

    onChooseImage(event) {

    }

    onTakePhoto(event) {

    }

    onSaveNewGame(event) {

    }

    onBack() {
        this.routerExtensions.back();
    }
}
