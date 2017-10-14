import {NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import {NativeScriptModule} from "nativescript-angular/nativescript.module";

import {GamesListRoutingModule} from "./games-list-routing.module";
import {GamesListComponent} from "./games-list.component";

@NgModule({
    imports: [
        NativeScriptModule,
        GamesListRoutingModule
    ],
    declarations: [
        GamesListComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class GamesListModule {
}
