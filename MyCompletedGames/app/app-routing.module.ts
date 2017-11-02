import {NgModule} from "@angular/core";
import {Routes} from "@angular/router";
import {NativeScriptRouterModule} from "nativescript-angular/router";

import {NewGameComponent} from "./newgame/new-game.component";
import {GamesListComponent} from "./gameslist/games-list.component";

const routes: Routes = [
    {path: "", redirectTo: "/games-list", pathMatch: "full"},
    {path: "new-game", component: NewGameComponent},
    {path: "games-list", component: GamesListComponent}
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {
}
