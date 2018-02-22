import {Component} from "@angular/core";

import {ChartComponent} from "./chart.component";
import {GamesService} from "../services/GamesFileService";

@Component({
    selector: "games-pie-chart",
    moduleId: module.id,
    templateUrl: "./pie-chart.component.html"
})
export class PieChartComponent extends ChartComponent {

    constructor(private gamesFileService: GamesService,) {
        super(gamesFileService);
    }
}