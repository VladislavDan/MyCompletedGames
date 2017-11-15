import {NgModule} from "@angular/core";
import {NativeScriptModule} from "nativescript-angular/nativescript.module";

import {NewGameComponent} from "./new-game.component";
import {ChooserModule} from "../consolechooser/chooser.module";
import {CameraService} from "../services/CameraService";
import {ImageChooserModule} from "../imagechooser/image-chooser.module";

@NgModule({
    imports: [
        NativeScriptModule,
        ChooserModule,
        ImageChooserModule
    ],
    declarations: [
        NewGameComponent
    ],
    providers: [
        CameraService
    ]
})
export class NewGameModule {
}
