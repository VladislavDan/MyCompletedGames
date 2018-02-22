import {NgModule} from "@angular/core";
import {Routes} from "@angular/router";
import {NativeScriptRouterModule} from "nativescript-angular/router";

import {PageContainerComponent} from "./page-container.component";

const routes: Routes = [
    {path: "", component: PageContainerComponent}
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class PageContainerRoutingModule {
}
