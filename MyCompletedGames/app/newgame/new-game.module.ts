import {NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import {NativeScriptModule} from "nativescript-angular/nativescript.module";

import {NewGameComponent} from "./new-game.component";
import {NewGameRoutingModule} from "./new-game-routing.module";

@NgModule({
    imports: [
        NativeScriptModule,
        NewGameRoutingModule
    ],
    declarations: [
        NewGameComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class NewGameModule {
}
