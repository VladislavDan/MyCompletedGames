import {NgModule, NgModuleFactoryLoader, NO_ERRORS_SCHEMA} from "@angular/core";
import {NativeScriptModule} from "nativescript-angular/nativescript.module";
import {NSModuleFactoryLoader} from "nativescript-angular/router";
import {HttpModule} from "@angular/http";

import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {GamesService} from "./services/GamesService";
import {GoogleAuthService} from "./services/GoogleAuthService";
import {GoogleFileSyncService} from "./services/GoogleFileSyncService";
import {ModalDialogService} from "nativescript-angular";
import {NewGameModule} from "./newgame/new-game.module";
import {PageContainerModule} from "./pagescontainer/page-container.module";

import {registerElement} from "nativescript-angular/element-registry";
import {NativeScriptHttpClientModule} from "nativescript-angular/http-client";
import {ImagesService} from "~/services/ImagesService";


registerElement("Fab", () => require("nativescript-floatingactionbutton").Fab);

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptHttpClientModule,
        NativeScriptModule,
        AppRoutingModule,
        NewGameModule,
        PageContainerModule,
        HttpModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        GamesService,
        ImagesService,
        GoogleAuthService,
        GoogleFileSyncService,
        ModalDialogService,
        {provide: NgModuleFactoryLoader, useClass: NSModuleFactoryLoader}
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule {
}
