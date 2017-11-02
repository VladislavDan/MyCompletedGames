import {NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import {NativeScriptModule} from "nativescript-angular/nativescript.module";

import {NewGameComponent} from "./new-game.component";

@NgModule({
    imports: [
        NativeScriptModule
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
