import {NgModule} from "@angular/core";
import {Routes} from "@angular/router";
import {NativeScriptRouterModule} from "nativescript-angular/router";

const routes: Routes = [
    {path: "", redirectTo: "/games-list", pathMatch: "full"},
    {path: "games-list", loadChildren: "./gameslist/games-list.module#GamesListModule"}
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {
}
