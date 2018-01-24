import {NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import {NativeScriptModule} from "nativescript-angular/nativescript.module";
import {NativeScriptFormsModule} from "nativescript-angular/forms"

import {NewGameComponent} from "./new-game.component";
import {ChooserModule} from "../consolechooser/chooser.module";
import {GoogleFileSyncService} from "../services/GoogleFileSyncService";

@NgModule({
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        ChooserModule
    ],
    declarations: [
        NewGameComponent
    ],
    providers: [
        GoogleFileSyncService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class NewGameModule {
}
