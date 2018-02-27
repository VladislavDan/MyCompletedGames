import {Component, ViewChild} from "@angular/core";
import 'rxjs/add/operator/mergeMap'
import * as _ from "lodash";

import {GamesService} from "../services/GamesService";
import {GamesChartPoint} from "../common/GamesChartData";
import {VIDEO_GAME_CONSOLES} from "../common/Constants";
import {Game} from "../common/Game";
import {BaseComponent} from "../common/BaseComponent";
import {TabView} from "tns-core-modules/ui/tab-view";
import {ObservableArray} from "tns-core-modules/data/observable-array";
import {BackupComponent} from "../backup/backup.component";
import {GamesListComponent} from "../gameslist/games-list.component";

@Component({
    selector: "page-container",
    moduleId: module.id,
    templateUrl: "./page-container.component.html",
    styleUrls: ['./page-container.css']
})
export class PageContainerComponent extends BaseComponent {

    @ViewChild('backup')
    public backup: BackupComponent;

    @ViewChild('gamelist')
    public gamesList: GamesListComponent;

    public chartData: ObservableArray<GamesChartPoint>;

    public isVisibleAddButton = true;

    public isConnectedBackups = false;

    public selectedIndex = 0;

    constructor(private gamesFileService: GamesService) {
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

    onClickAddButton() {
        if (this.selectedIndex === 0) {
            this.gamesList.createNewGame();
        } else {
            this.backup.createNewBackup();
        }
    }

    onIndexChanged = (args) => {
        let tabView = <TabView>args.object;
        this.selectedIndex = tabView.selectedIndex;

        switch (this.selectedIndex) {
            case 0:
                this.isVisibleAddButton = true;
                break;
            case 1:
                this.isVisibleAddButton = this.isConnectedBackups;
                break;
            case 2:
                this.isVisibleAddButton = false;
                this.computeChartData();
                break;
            case 3:
                this.isVisibleAddButton = false;
                this.computeChartData();
                break;
        }
    };

    computeChartData = () => {
        this.gamesFileService.getGames("", {
            console: "",
            who: ""
        })
    };

    onConnectedBackups(event) {
        this.isConnectedBackups = event;
        this.isVisibleAddButton = event;
    }
}
