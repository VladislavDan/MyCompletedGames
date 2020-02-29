"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var new_game_component_1 = require("./newgame/new-game.component");
var games_list_component_1 = require("./gameslist/games-list.component");
var page_container_component_1 = require("./pagescontainer/page-container.component");
var routes = [
    { path: "", redirectTo: "/page-container", pathMatch: "full" },
    { path: "new-game", component: new_game_component_1.NewGameComponent },
    { path: "edit/:id", component: new_game_component_1.NewGameComponent },
    { path: "games-list", component: games_list_component_1.GamesListComponent },
    { path: "page-container", component: page_container_component_1.PageContainerComponent }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.NativeScriptRouterModule.forRoot(routes)],
            exports: [router_1.NativeScriptRouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXJvdXRpbmcubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLXJvdXRpbmcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXVDO0FBRXZDLHNEQUFxRTtBQUVyRSxtRUFBOEQ7QUFDOUQseUVBQW9FO0FBQ3BFLHNGQUFpRjtBQUVqRixJQUFNLE1BQU0sR0FBVztJQUNuQixFQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUM7SUFDNUQsRUFBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxxQ0FBZ0IsRUFBQztJQUMvQyxFQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLHFDQUFnQixFQUFDO0lBQy9DLEVBQUMsSUFBSSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUseUNBQWtCLEVBQUM7SUFDbkQsRUFBQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsU0FBUyxFQUFFLGlEQUFzQixFQUFDO0NBQzlELENBQUM7QUFNRjtJQUFBO0lBQ0EsQ0FBQztJQURZLGdCQUFnQjtRQUo1QixlQUFRLENBQUM7WUFDTixPQUFPLEVBQUUsQ0FBQyxpQ0FBd0IsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbkQsT0FBTyxFQUFFLENBQUMsaUNBQXdCLENBQUM7U0FDdEMsQ0FBQztPQUNXLGdCQUFnQixDQUM1QjtJQUFELHVCQUFDO0NBQUEsQUFERCxJQUNDO0FBRFksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHtSb3V0ZXN9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHtOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGV9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuXHJcbmltcG9ydCB7TmV3R2FtZUNvbXBvbmVudH0gZnJvbSBcIi4vbmV3Z2FtZS9uZXctZ2FtZS5jb21wb25lbnRcIjtcclxuaW1wb3J0IHtHYW1lc0xpc3RDb21wb25lbnR9IGZyb20gXCIuL2dhbWVzbGlzdC9nYW1lcy1saXN0LmNvbXBvbmVudFwiO1xyXG5pbXBvcnQge1BhZ2VDb250YWluZXJDb21wb25lbnR9IGZyb20gXCIuL3BhZ2VzY29udGFpbmVyL3BhZ2UtY29udGFpbmVyLmNvbXBvbmVudFwiO1xyXG5cclxuY29uc3Qgcm91dGVzOiBSb3V0ZXMgPSBbXHJcbiAgICB7cGF0aDogXCJcIiwgcmVkaXJlY3RUbzogXCIvcGFnZS1jb250YWluZXJcIiwgcGF0aE1hdGNoOiBcImZ1bGxcIn0sXHJcbiAgICB7cGF0aDogXCJuZXctZ2FtZVwiLCBjb21wb25lbnQ6IE5ld0dhbWVDb21wb25lbnR9LFxyXG4gICAge3BhdGg6IFwiZWRpdC86aWRcIiwgY29tcG9uZW50OiBOZXdHYW1lQ29tcG9uZW50fSxcclxuICAgIHtwYXRoOiBcImdhbWVzLWxpc3RcIiwgY29tcG9uZW50OiBHYW1lc0xpc3RDb21wb25lbnR9LFxyXG4gICAge3BhdGg6IFwicGFnZS1jb250YWluZXJcIiwgY29tcG9uZW50OiBQYWdlQ29udGFpbmVyQ29tcG9uZW50fVxyXG5dO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUuZm9yUm9vdChyb3V0ZXMpXSxcclxuICAgIGV4cG9ydHM6IFtOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGVdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBcHBSb3V0aW5nTW9kdWxlIHtcclxufVxyXG4iXX0=