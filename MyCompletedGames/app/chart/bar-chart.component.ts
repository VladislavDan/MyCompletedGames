import {Component} from "@angular/core";

import {ChartComponent} from "./chart.component";
import {GamesService} from "../services/GamesFileService";

@Component({
    selector: "games-bar-chart",
    moduleId: module.id,
    templateUrl: "./bar-chart.component.html"
})
export class BarChartComponent extends ChartComponent {

    constructor(private gamesFileService: GamesService,) {
        super(gamesFileService);
    }
}