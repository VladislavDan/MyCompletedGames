import {NgModule} from "@angular/core";
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
    ]
})
export class ChooserModule {
}