import {NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import {NativeScriptModule} from "nativescript-angular/nativescript.module";

import {GamesListRoutingModule} from "./games-list-routing.module";
import {GamesListComponent} from "./games-list.component";
import {GamesListItemComponent} from "../gameslistitem/games-list-item.component";
import {ConsoleChooserComponent} from "../consolechooser/console-chooser.component";

@NgModule({
    imports: [
        NativeScriptModule,
        GamesListRoutingModule
    ],
    declarations: [
        GamesListComponent,
        GamesListItemComponent,
        ConsoleChooserComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class GamesListModule {
}
