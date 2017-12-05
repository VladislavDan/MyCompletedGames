import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";
import * as fs from "tns-core-modules/file-system";
import * as _ from "lodash";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

import {FILE_NAME, ONLY_ME, TOGETHER} from "../common/Constants";
import {GamesFileModel} from "../common/GamesFile";
import {Game} from "../common/Game";
import {Filter} from "../common/Filter";

@Injectable()
export class GamesFileService {

    public gamesChannel: BehaviorSubject<Game[]> = new BehaviorSubject([]);

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

    public getGamesById(id: String): Observable<Game> {
        this.getGames("", {who: "", console: ""});
        return this.gamesChannel
            .concatMap((games) => {
                return games;
            })
            .filter((game) => {
                return game.id === id;
            })
            .first();
    }

    public addNewGame(game: Game): Observable<GamesFileModel> {
        return this.readFile().flatMap((content) => {
            content.games.push(game);
            return this.updateFile(content);
        });
    }

    public changeGame(game: Game): Observable<GamesFileModel> {
        return this.readFile().flatMap((content) => {
            let index = _.findIndex(content.games, (item) => {
                return item.id === game.id;
            });
            let value = content.games[index];
            if (value.id === game.id) {
                value.name = game.name;
                value.console = game.console;
                value.isTogether = game.isTogether;
                value.images = game.images;
            }
            return this.updateFile(content);
        });
    }

    public deleteGame(game: Game): Observable<GamesFileModel> {
        return this.readFile().flatMap((content) => {
            _.remove(content.games, function (item: Game) {
                return item.id === game.id;
            });
            return this.updateFile(content);
        });
    }

    public updateFile(gamesFileModel: GamesFileModel): Observable<GamesFileModel> {
        let documents = fs.knownFolders.documents();
        let gamesFile = documents.getFile(FILE_NAME);
        gamesFileModel.dateChanged = new Date(Date.now()).toDateString();
        gamesFileModel.games = _.sortBy(gamesFileModel.games, function (game) {
            return game.name;
        });
        return Observable.fromPromise(gamesFile.writeText(JSON.stringify(gamesFileModel)))
            .map(() => {
                return gamesFileModel;
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
