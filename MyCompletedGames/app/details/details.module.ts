import {NgModule} from "@angular/core";
import {NativeScriptModule} from "nativescript-angular/nativescript.module";
import {NativeScriptFormsModule} from "nativescript-angular/forms"

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
        GoogleFileSyncService
    ]
})
export class DetailsModule {
}
