import {NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import {NativeScriptModule} from "nativescript-angular/nativescript.module";

import {ImageChooserComponent} from "./image-chooser.component";
import {ImagesService} from "../services/ImagesService";

@NgModule({
    imports: [
        NativeScriptModule
    ],
    declarations: [
        ImageChooserComponent
    ],
    providers: [
        ImagesService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ImageChooserModule {
}
