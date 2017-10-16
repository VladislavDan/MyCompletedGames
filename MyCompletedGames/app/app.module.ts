import {NgModule, NgModuleFactoryLoader, NO_ERRORS_SCHEMA} from "@angular/core";
import {NativeScriptModule} from "nativescript-angular/nativescript.module";
import {NSModuleFactoryLoader} from "nativescript-angular/router";

import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {GamesFileService} from "./services/GamesFileService";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        GamesFileService,
        {provide: NgModuleFactoryLoader, useClass: NSModuleFactoryLoader}
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule {
}
