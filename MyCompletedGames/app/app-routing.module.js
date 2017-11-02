"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var new_game_component_1 = require("./newgame/new-game.component");
var games_list_component_1 = require("./gameslist/games-list.component");
var routes = [
    { path: "", redirectTo: "/games-list", pathMatch: "full" },
    { path: "new-game", component: new_game_component_1.NewGameComponent },
    { path: "games-list", component: games_list_component_1.GamesListComponent }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXJvdXRpbmcubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLXJvdXRpbmcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXVDO0FBRXZDLHNEQUFxRTtBQUVyRSxtRUFBOEQ7QUFDOUQseUVBQW9FO0FBRXBFLElBQU0sTUFBTSxHQUFXO0lBQ25CLEVBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsYUFBYSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUM7SUFDeEQsRUFBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxxQ0FBZ0IsRUFBQztJQUMvQyxFQUFDLElBQUksRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLHlDQUFrQixFQUFDO0NBQ3RELENBQUM7QUFNRjtJQUFBO0lBQ0EsQ0FBQztJQURZLGdCQUFnQjtRQUo1QixlQUFRLENBQUM7WUFDTixPQUFPLEVBQUUsQ0FBQyxpQ0FBd0IsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbkQsT0FBTyxFQUFFLENBQUMsaUNBQXdCLENBQUM7U0FDdEMsQ0FBQztPQUNXLGdCQUFnQixDQUM1QjtJQUFELHVCQUFDO0NBQUEsQUFERCxJQUNDO0FBRFksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7Um91dGVzfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQge05hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZX0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuXG5pbXBvcnQge05ld0dhbWVDb21wb25lbnR9IGZyb20gXCIuL25ld2dhbWUvbmV3LWdhbWUuY29tcG9uZW50XCI7XG5pbXBvcnQge0dhbWVzTGlzdENvbXBvbmVudH0gZnJvbSBcIi4vZ2FtZXNsaXN0L2dhbWVzLWxpc3QuY29tcG9uZW50XCI7XG5cbmNvbnN0IHJvdXRlczogUm91dGVzID0gW1xuICAgIHtwYXRoOiBcIlwiLCByZWRpcmVjdFRvOiBcIi9nYW1lcy1saXN0XCIsIHBhdGhNYXRjaDogXCJmdWxsXCJ9LFxuICAgIHtwYXRoOiBcIm5ldy1nYW1lXCIsIGNvbXBvbmVudDogTmV3R2FtZUNvbXBvbmVudH0sXG4gICAge3BhdGg6IFwiZ2FtZXMtbGlzdFwiLCBjb21wb25lbnQ6IEdhbWVzTGlzdENvbXBvbmVudH1cbl07XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW05hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZS5mb3JSb290KHJvdXRlcyldLFxuICAgIGV4cG9ydHM6IFtOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGVdXG59KVxuZXhwb3J0IGNsYXNzIEFwcFJvdXRpbmdNb2R1bGUge1xufVxuIl19