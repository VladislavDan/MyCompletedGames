import {NgModule} from "@angular/core";
import {NativeScriptModule} from "nativescript-angular/nativescript.module";
import {NativeScriptFormsModule} from "nativescript-angular/forms"

import {CameraService} from "../services/CameraService";
import {GoogleFileSyncService} from "../services/GoogleFileSyncService";
import {DetailsComponent} from "./details.component";

@NgModule({
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule
    ],
    declarations: [
        DetailsComponent
    ],
    providers: [
        CameraService,
        GoogleFileSyncService
    ]
})
export class DetailsModule {
}
