import {Component} from "@angular/core";
import 'rxjs/add/operator/mergeMap'
import {RouterExtensions} from "nativescript-angular";
import * as _ from "lodash";

import {GamesService} from "../services/GamesService";
import {GamesChartPoint} from "../common/GamesChartData";
import {VIDEO_GAME_CONSOLES} from "../common/Constants";
import {Game} from "../common/Game";
import {BaseComponent} from "../common/BaseComponent";
import {TabView} from "tns-core-modules/ui/tab-view";
import {ObservableArray} from "tns-core-modules/data/observable-array";

@Component({
    selector: "page-container",
    moduleId: module.id,
    templateUrl: "./page-container.component.html",
    styleUrls: ['./page-container.css']
})
export class PageContainerComponent extends BaseComponent {

    public chartData: ObservableArray<GamesChartPoint>;

    public visibleButton = 'visible';

    constructor(private routerExtensions: RouterExtensions, private gamesFileService: GamesService) {
        super();
        this.gamesFileService.gamesChannel
            .subscribe(
                (games) => {
                    let gamesChartData = [];
                    _.forEach(VIDEO_GAME_CONSOLES, (gameConsole, key) => {
                        let amount = _.filter(games, (game: Game) => {
                                return game.console === gameConsole;
                            }
                        ).length;
                        gamesChartData.push({
                            console: gameConsole,
                            amount: amount
                        });
                        this.chartData = new ObservableArray(gamesChartData);
                    });
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

    onCreateNewGame() {
        this.routerExtensions.navigate(["/new-game"], {clearHistory: false});
    }

    onIndexChanged = (args) => {
        let tabView = <TabView>args.object;
        let tabSelectedIndex = tabView.selectedIndex;
        if (tabSelectedIndex === 0) {
            this.visibleButton = 'visible';
        } else if (tabSelectedIndex === 1) {
            this.visibleButton = 'hidden';
        } else if (tabSelectedIndex === 2) {
            this.visibleButton = 'hidden';
            this.computeChartData();
        } else if (tabSelectedIndex === 3) {
            this.visibleButton = 'hidden';
            this.computeChartData();
        }
    };

    computeChartData = () => {
        this.gamesFileService.getGames("", {
            console: "",
            who: ""
        })
    }
}
