import {Game} from "./Game";

export interface GamesFileModel {

    dateChanged: string;
    games: Array<Game>;
}
