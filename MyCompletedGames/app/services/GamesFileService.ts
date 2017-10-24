import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";
import * as fs from "tns-core-modules/file-system";

import {GAME_FILE_NAME} from "../common/Constants";
import {GamesFileModel} from "../common/GamesFile";
import {Game} from "../common/Game";
import {MOCK_GAMES} from "../common/MockGames";

@Injectable()
export class GamesFileService {

    constructor() {
    }

    public getGames(): Observable<Array<Game>> {
        return this.readFile().map((gamesFileModel: GamesFileModel) => {
            return gamesFileModel.games;
        });
    }

    public findGamesByName(name: string): Observable<Array<Game>> {
        return this.getGames()
            .concatMap(games => games)
            .filter((game) => {
                return game.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
            })
            .toArray();
    }

    public updateFile(games: GamesFileModel): Observable<GamesFileModel> {
        let documents = fs.knownFolders.documents();
        let gamesFile = documents.getFile(GAME_FILE_NAME);
        games.dateChanged = "";
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
                // return JSON.parse(content);
                return MOCK_GAMES;
            })
    }

    private isFileExist(): boolean {
        let documents = fs.knownFolders.documents();
        let filePath = fs.path.join(documents.path, GAME_FILE_NAME);
        return fs.File.exists(filePath);
    }
}
