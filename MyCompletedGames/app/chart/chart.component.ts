import {ObservableArray} from "tns-core-modules/data/observable-array";
import * as _ from "lodash";

import {GamesService} from "../services/GamesFileService";
import {GamesChartPoint} from "../common/GamesChartData";
import {VIDEO_GAME_CONSOLES} from "../common/Constants";
import {Game} from "../common/Game";
import {BaseComponent} from "../common/BaseComponent";

export class ChartComponent extends BaseComponent {

    public _pieSource: ObservableArray<GamesChartPoint>;

    get pieSource(): ObservableArray<GamesChartPoint> {
        return this._pieSource;
    }

    constructor(gamesFileService: GamesService) {
        super();
        let gamesChartData: Array<GamesChartPoint> = [];
        gamesFileService.gamesChannel
            .subscribe(
                (games) => {

                    _.forEach(VIDEO_GAME_CONSOLES, function (console, key) {
                        let amount = _.filter(games, function (game: Game) {
                                return game.console === console;
                            }
                        ).length;
                        gamesChartData.push({
                            console: console,
                            amount: amount
                        });
                    });

                    this._pieSource = new ObservableArray(gamesChartData);
                },
                (error) => {
                    this.hideProgress();
                    this.showAlert({
                        title: "Showing games",
                        message: error.message
                    });
                }
            );
    }
}
