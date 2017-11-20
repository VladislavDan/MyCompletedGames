import {NgModule, NgModuleFactoryLoader} from "@angular/core";
import {NativeScriptModule} from "nativescript-angular/nativescript.module";
import {NSModuleFactoryLoader} from "nativescript-angular/router";

import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {GamesFileService} from "./services/GamesFileService";
import {GoogleAuthService} from "./services/GoogleAuthService";
import {GoogleFileSyncService} from "./services/GoogleFileSyncService";
import {ModalDialogService} from "nativescript-angular";
import {NewGameModule} from "./newgame/new-game.module";
import {GamesListModule} from "./gameslist/games-list.module";
import {NewGameService} from "./services/NewGameService";
import {ImageChooserModule} from "./imagechooser/image-chooser.module";
import {HttpModule} from "@angular/http";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NewGameModule,
        GamesListModule,
        ImageChooserModule,
        HttpModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        GamesFileService,
        GoogleAuthService,
        GoogleFileSyncService,
        ModalDialogService,
        NewGameService,
        {provide: NgModuleFactoryLoader, useClass: NSModuleFactoryLoader}
    ]
})
export class AppModule {
}
