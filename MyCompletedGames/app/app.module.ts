import {NgModule, NgModuleFactoryLoader, NO_ERRORS_SCHEMA} from "@angular/core";
import {NativeScriptModule} from "nativescript-angular/nativescript.module";
import {NSModuleFactoryLoader} from "nativescript-angular/router";
import {HttpModule} from "@angular/http";

import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {GamesService} from "./services/GamesFileService";
import {GoogleAuthService} from "./services/GoogleAuthService";
import {GoogleFileSyncService} from "./services/GoogleFileSyncService";
import {ModalDialogService} from "nativescript-angular";
import {NewGameModule} from "./newgame/new-game.module";
import {GamesListModule} from "./gameslist/games-list.module";
import {ThreadService} from "./services/ThreadService";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NewGameModule,
        GamesListModule,
        HttpModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        GamesService,
        GoogleAuthService,
        GoogleFileSyncService,
        ModalDialogService,
        ThreadService,
        {provide: NgModuleFactoryLoader, useClass: NSModuleFactoryLoader}
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule {
}
