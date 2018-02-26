import {Component, Input} from "@angular/core";
import {GamesChartPoint} from "../common/GamesChartData";
import {ObservableArray} from "tns-core-modules/data/observable-array";

@Component({
    selector: "games-pie-chart",
    moduleId: module.id,
    templateUrl: "./pie-chart.component.html"
})
export class PieChartComponent {

    @Input()
    public gamesChartData: ObservableArray<GamesChartPoint>;

    constructor() {
    }
}