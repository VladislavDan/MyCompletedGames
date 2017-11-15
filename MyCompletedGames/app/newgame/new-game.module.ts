import {NgModule} from "@angular/core";
import {NativeScriptModule} from "nativescript-angular/nativescript.module";

import {NewGameComponent} from "./new-game.component";
import {ChooserModule} from "../consolechooser/chooser.module";
import {ImageService} from "../services/ImageService";

@NgModule({
    imports: [
        NativeScriptModule,
        ChooserModule
    ],
    declarations: [
        NewGameComponent
    ],
    providers: [
        ImageService
    ]
})
export class NewGameModule {
}
