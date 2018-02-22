import {NgModule} from "@angular/core";
import {Routes} from "@angular/router";
import {NativeScriptRouterModule} from "nativescript-angular/router";

import {NewGameComponent} from "./newgame/new-game.component";
import {GamesListComponent} from "./gameslist/games-list.component";
import {PageContainerComponent} from "./pagescontainer/page-container.component";

const routes: Routes = [
    {path: "", redirectTo: "/page-container", pathMatch: "full"},
    {path: "new-game", component: NewGameComponent},
    {path: "edit/:id", component: NewGameComponent},
    {path: "games-list", component: GamesListComponent},
    {path: "page-container", component: PageContainerComponent}
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {
}
