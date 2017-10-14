import {NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import {NativeScriptModule} from "nativescript-angular/nativescript.module";

import {GamesListRoutingModule} from "./games-list-routing.module";
import {GamesListComponent} from "./games-list.component";
import {GamesService} from "../services/GamesService";

@NgModule({
    imports: [
        NativeScriptModule,
        GamesListRoutingModule
    ],
    declarations: [
        GamesListComponent
    ],
    providers: [GamesService],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class GamesListModule {
}
