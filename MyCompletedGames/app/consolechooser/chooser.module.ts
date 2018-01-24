import {NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import {NativeScriptModule} from "nativescript-angular/nativescript.module";
import {ChooserComponent} from "./chooser.component";


@NgModule({
    imports: [
        NativeScriptModule
    ],
    declarations: [
        ChooserComponent
    ],
    exports: [
        ChooserComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ChooserModule {
}