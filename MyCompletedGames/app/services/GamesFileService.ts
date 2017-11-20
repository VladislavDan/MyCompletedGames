import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";
import * as fs from "tns-core-modules/file-system";
import {ReplaySubject} from "rxjs/ReplaySubject";

import {FILE_NAME, ONLY_ME, TOGETHER} from "../common/Constants";
import {GamesFileModel} from "../common/GamesFile";
import {Game} from "../common/Game";
import {Filter} from "../common/Filter";

@Injectable()
export class GamesFileService {

    public gamesChannel: ReplaySubject<Game[]> = new ReplaySubject();

    constructor() {
    }

    public getGames(name: string, filter: Filter) {
        this.readFile().map((gamesFileModel: GamesFileModel) => {
            return gamesFileModel.games;
        }).concatMap((games) => {
            return games;
        }).filter((game: Game) => {
            return this.isComplainFilter(game, name, filter);
        }).toArray().subscribe((games) => {
            this.gamesChannel.next(games);
        });
    }

    public addNewGame(game: Game): Observable<GamesFileModel> {
        return this.readFile().flatMap((content) => {
            content.games.push(game);
            return this.updateFile(content);
        });
    }

    public updateFile(games: GamesFileModel): Observable<GamesFileModel> {
        let documents = fs.knownFolders.documents();
        let gamesFile = documents.getFile(FILE_NAME);
        games.dateChanged = new Date(Date.now()).toDateString();
        return Observable.fromPromise(gamesFile.writeText(JSON.stringify(games)))
            .map(() => {
                return games;
            })
    }

    private readFile(): Observable<GamesFileModel> {
        let documents = fs.knownFolders.documents();
        let gamesFile = documents.getFile(FILE_NAME);
        return Observable.fromPromise(gamesFile.readText())
            .map((content: string): GamesFileModel => {
                return JSON.parse(content);
            })
    }

    private isFileExist(): boolean {
        let documents = fs.knownFolders.documents();
        let filePath = fs.path.join(documents.path, FILE_NAME);
        return fs.File.exists(filePath);
    }

    private isComplainFilter(game: Game, name: string, filter: Filter) {
        let isThisConsole = game.console === filter.console || filter.console === '';
        let isThisWho;
        if (filter.who === TOGETHER) {
            isThisWho = game.isTogether === true;
        } else if (filter.who === ONLY_ME) {
            isThisWho = game.isTogether === false;
        } else {
            isThisWho = true;
        }
        if (!name) {
            name = "";
        }
        return isThisConsole && isThisWho && game.name.toLowerCase().indexOf(name.toLowerCase()) !== -1;
    }
}
