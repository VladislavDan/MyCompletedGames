import {Injectable} from '@angular/core';
import {Game} from "../common/Game";

@Injectable()
export class NewGameService {

    private newGame: Game = {
        id: "",
        name: "",
        console: "",
        isTogether: false,
        images: []
    };

    public constructor() {
    }

    public setChosenImages(images: Array<string>) {
        this.newGame.images = images;
    }
}