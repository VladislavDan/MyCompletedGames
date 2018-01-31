import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import * as _ from "lodash";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

import {ONLY_ME, TOGETHER} from "../common/Constants";
import {GamesFileModel} from "../common/GamesFileModel";
import {Game} from "../common/Game";
import {Filter} from "../common/Filter";

import 'rxjs/add/operator/map'
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/concatMap'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/toArray'
import 'rxjs/add/operator/first'
import 'rxjs/add/operator/mergeMap'


@Injectable()
export class GamesService {

    public gamesChannel: BehaviorSubject<Game[]> = new BehaviorSubject([]);

    private gamesFileModel: GamesFileModel = {
        dateChanged: '',
        games: []
    };

    constructor() {
    }

    public getGames(name: string, filter: Filter) {
        Observable.of(this.gamesFileModel).map((gamesFileModel: GamesFileModel) => {
            return gamesFileModel.games;
        }).concatMap((games) => {
            return games;
        }).filter((game: Game) => {
            return GamesService.isComplainFilter(game, name, filter);
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
        return Observable.of(this.gamesFileModel).flatMap((content) => {
            content.games.push(game);
            return this.updateGames(content);
        });
    }

    public changeGame(game: Game): Observable<GamesFileModel> {
        return Observable.of(this.gamesFileModel).flatMap((content) => {
            let index = _.findIndex(content.games, (item) => {
                return item.id === game.id;
            });
            let value = content.games[index];
            if (value.id === game.id) {
                value.name = game.name;
                value.console = game.console;
                value.isTogether = game.isTogether;
            }
            return this.updateGames(content);
        });
    }

    public deleteGame(id: string): Observable<GamesFileModel> {
        return Observable.of(this.gamesFileModel).flatMap((content) => {
            _.remove(content.games, function (item: Game) {
                return item.id === id;
            });
            return this.updateGames(content);
        });
    }

    public updateGames(gamesFileModel: GamesFileModel): Observable<GamesFileModel> {
        this.gamesFileModel = {
            dateChanged: gamesFileModel.dateChanged,
            games: _.orderBy(gamesFileModel.games, ['name'], ['asc'])
        };
        return Observable.of(this.gamesFileModel);
    }

    private static isComplainFilter(game: Game, name: string, filter: Filter) {
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
