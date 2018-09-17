import {Component, Input} from "@angular/core";
import {GamesChartPoint} from "~/typings/GamesChartData";
import {ObservableArray} from "tns-core-modules/data/observable-array";

@Component({
    selector: "games-bar-chart",
    moduleId: module.id,
    templateUrl: "./bar-chart.component.html"
})
export class BarChartComponent {

    @Input()
    public gamesChartData: ObservableArray<GamesChartPoint>;

    constructor() {
    }
}