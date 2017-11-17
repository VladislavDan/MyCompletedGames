import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";
import * as fs from "tns-core-modules/file-system";

import {GAME_FILE_NAME, ONLY_ME, TOGETHER} from "../common/Constants";
import {GamesFileModel} from "../common/GamesFile";
import {Game} from "../common/Game";
import {Filter} from "../common/Filter";

@Injectable()
export class GamesFileService {

    constructor() {
    }

    public getGames(filter: Filter): Observable<Array<Game>> {
        return this.readFile().map((gamesFileModel: GamesFileModel) => {
            return gamesFileModel.games;
        }).concatMap((games) => {
            return games;
        }).filter((game: Game) => {
            return this.isComplainFilter(game, filter);
        }).toArray();
    }

    public findGamesByName(name: string, filter: Filter): Observable<Array<Game>> {
        return this.getGames(filter)
            .concatMap(games => games)
            .filter((game) => {
                return game.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
            })
            .toArray();
    }

    public addNewGame(game: Game): Observable<GamesFileModel> {
        return this.readFile().flatMap((content) => {
            content.games.push(game);
            return this.updateFile(content);
        });
    }

    public updateFile(games: GamesFileModel): Observable<GamesFileModel> {
        let documents = fs.knownFolders.documents();
        let gamesFile = documents.getFile(GAME_FILE_NAME);
        games.dateChanged = new Date(Date.now()).toDateString();
        return Observable.fromPromise(gamesFile.writeText(JSON.stringify(games)))
            .map(() => {
                return games;
            })
    }

    private readFile(): Observable<GamesFileModel> {
        let documents = fs.knownFolders.documents();
        let gamesFile = documents.getFile(GAME_FILE_NAME);
        return Observable.fromPromise(gamesFile.readText())
            .map((content: string): GamesFileModel => {
                return JSON.parse(content);
            })
    }

    private isFileExist(): boolean {
        let documents = fs.knownFolders.documents();
        let filePath = fs.path.join(documents.path, GAME_FILE_NAME);
        return fs.File.exists(filePath);
    }

    private isComplainFilter(game: Game, filter: Filter) {
        let isThisConsole = game.console === filter.console || filter.console === '';
        let isThisWho;
        if (filter.who === TOGETHER) {
            isThisWho = game.isTogether === true;
        } else if (filter.who === ONLY_ME) {
            isThisWho = game.isTogether === false;
        } else {
            isThisWho = true;
        }
        return isThisConsole && isThisWho;
    }
}
