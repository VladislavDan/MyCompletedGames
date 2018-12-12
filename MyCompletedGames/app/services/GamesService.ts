import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, of} from "rxjs";
import * as _ from "lodash";
import {concatMap, filter, first, flatMap, map, toArray} from 'rxjs/operators'
import {getString, setString} from "application-settings";

import {GAMES_KEY, ONLY_ME, TOGETHER} from "~/common/Constants";
import {GamesFileModel} from "~/typings/GamesFileModel";
import {Game} from "~/typings/Game";
import {Filter} from "~/typings/Filter";


@Injectable()
export class GamesService {

    public gamesChannel: BehaviorSubject<Game[]> = new BehaviorSubject([]);

    constructor() {
    }

    public getGames = (name: string, filterParam: Filter) => {
        of(this.getGamesFromSetting())
            .pipe(
                map((gamesFileModel: GamesFileModel) => {
                    return gamesFileModel.games;
                }),
                concatMap((games) => {
                    return games ? games : [];
                }),
                filter((game: Game) => {
                    return GamesService.isComplainFilter(game, name, filterParam);
                }),
                toArray()
            )
            .subscribe((games) => {
                this.gamesChannel.next(games)
            });
    };

    public getGamesById(id: String): Observable<Game> {
        this.getGames("", {who: "", console: ""});
        return this.gamesChannel
            .pipe(
                concatMap((games) => {
                    return games;
                }),
                filter((game) => {
                    return game.id === id;
                }),
                first()
            );
    }

    public addNewGame(game: Game): Observable<GamesFileModel> {
        return of(this.getGamesFromSetting())
            .pipe(
                flatMap((content: GamesFileModel) => {
                    content.games.push(game);
                    return this.updateGames(content);
                })
            );
    }

    public changeGame(game: Game): Observable<GamesFileModel> {
        return of(this.getGamesFromSetting())
            .pipe(
                flatMap((content: GamesFileModel) => {
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
                })
            );
    }

    public deleteGame(id: string): Observable<GamesFileModel> {
        return of(this.getGamesFromSetting()).pipe(
            flatMap((content: GamesFileModel) => {
                _.remove(content.games, function (item: Game) {
                    return item.id === id;
                });
                return this.updateGames(content);
            })
        );
    }

    public updateGames(gamesFileModel: GamesFileModel): Observable<GamesFileModel> {
        gamesFileModel.games = _.sortBy(gamesFileModel.games, ['name']);
        setString(GAMES_KEY, JSON.stringify(gamesFileModel));
        return of(getString(GAMES_KEY))
            .pipe(
                map(
                    savedGames => JSON.parse(savedGames)
                )
            );
    }

    public getGamesFromSetting(): GamesFileModel {
        let gamesFromSetting = getString(GAMES_KEY);
        return JSON.parse(gamesFromSetting ? gamesFromSetting : '{}');
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
