import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";
import * as fs from "tns-core-modules/file-system";

import {GAME_FILE_NAME} from "../common/Constants";
import {GamesFileModel} from "../common/GamesFile";
import {Game} from "../common/Game";

@Injectable()
export class GamesFileService {

    constructor() {
    }

    public getGames(): Observable<Array<Game>> {
        return this.readFile().map((gamesFileModel: GamesFileModel) => {
            return gamesFileModel.games;
        });
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
                return JSON.parse(content);
            })
    }

    private isFileExist(): boolean {
        let documents = fs.knownFolders.documents();
        let filePath = fs.path.join(documents.path, GAME_FILE_NAME);
        return fs.File.exists(filePath);
    }
}
