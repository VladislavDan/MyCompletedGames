import {NgModule} from "@angular/core";
import {Routes} from "@angular/router";
import {NativeScriptRouterModule} from "nativescript-angular/router";

import {NewGameComponent} from "./new-game.component";

const routes: Routes = [
    {path: "", component: NewGameComponent}
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class NewGameRoutingModule {
}
