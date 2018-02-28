import {NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import {NativeScriptModule} from "nativescript-angular/nativescript.module";
import {NativeScriptUIChartModule} from "nativescript-pro-ui/chart/angular";
import {NativeScriptUISideDrawerModule} from "nativescript-pro-ui/sidedrawer/angular";


import {PageContainerComponent} from "./page-container.component";
import {GamesListComponent} from "../gameslist/games-list.component";
import {GamesListItemComponent} from "../gameslistitem/games-list-item.component";
import {ChooserModule} from "../consolechooser/chooser.module";
import {PieChartComponent} from "../chart/pie-chart.component";
import {BarChartComponent} from "../chart/bar-chart.component";
import {BackupComponent} from "../backup/backup.component";

@NgModule({
    imports: [
        NativeScriptModule,
        ChooserModule,
        NativeScriptUIChartModule,
        NativeScriptUISideDrawerModule
    ],
    declarations: [
        PageContainerComponent,
        GamesListComponent,
        GamesListItemComponent,
        PieChartComponent,
        BarChartComponent,
        BackupComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class PageContainerModule {
}
