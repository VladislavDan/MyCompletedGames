import {NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import {NativeScriptModule} from "nativescript-angular/nativescript.module";

import {GamesListRoutingModule} from "./games-list-routing.module";
import {GamesListComponent} from "./games-list.component";
import {GamesListItemComponent} from "../gameslistitem/games-list-item.component";
import {ChooserModule} from "../consolechooser/chooser.module";

@NgModule({
    imports: [
        NativeScriptModule,
        GamesListRoutingModule,
        ChooserModule
    ],
    declarations: [
        GamesListComponent,
        GamesListItemComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class GamesListModule {
}
