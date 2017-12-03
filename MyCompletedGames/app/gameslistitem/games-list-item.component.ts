import {Component, Input, OnInit} from "@angular/core";
import {Game} from "../common/Game";
import * as fs from "tns-core-modules/file-system";

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
    }

    getImage() {
        let documents = fs.knownFolders.documents();
        let imageFile = documents.getFile(this.game.id.toString());
        return imageFile.path;
    }
}
