import {NgModule} from "@angular/core";
import {Routes} from "@angular/router";
import {NativeScriptRouterModule} from "nativescript-angular/router";

import {NewGameComponent} from "./newgame/new-game.component";
import {GamesListComponent} from "./gameslist/games-list.component";
import {ImageChooserComponent} from "./imagechooser/image-chooser.component";
import {DetailsComponent} from "./details/details.component";

const routes: Routes = [
    {path: "", redirectTo: "/games-list", pathMatch: "full"},
    {path: "new-game", component: NewGameComponent},
    {path: "games-list", component: GamesListComponent},
    {path: "images-chooser", component: ImageChooserComponent},
    {path: "details/:id", component: DetailsComponent}
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {
}
