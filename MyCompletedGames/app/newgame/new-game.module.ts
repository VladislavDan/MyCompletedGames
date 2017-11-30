import {NgModule} from "@angular/core";
import {NativeScriptModule} from "nativescript-angular/nativescript.module";
import {NativeScriptFormsModule} from "nativescript-angular/forms"

import {NewGameComponent} from "./new-game.component";
import {ChooserModule} from "../consolechooser/chooser.module";
import {ImageChooserModule} from "../imagechooser/image-chooser.module";
import {GoogleFileSyncService} from "../services/GoogleFileSyncService";

@NgModule({
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        ChooserModule,
        ImageChooserModule
    ],
    declarations: [
        NewGameComponent
    ],
    providers: [
        GoogleFileSyncService
    ]
})
export class NewGameModule {
}
