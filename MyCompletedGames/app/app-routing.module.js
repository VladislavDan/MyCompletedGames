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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXJvdXRpbmcubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLXJvdXRpbmcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXVDO0FBRXZDLHNEQUFxRTtBQUNyRSxtRUFBOEQ7QUFDOUQseUVBQW9FO0FBRXBFLElBQU0sTUFBTSxHQUFXO0lBQ25CLEVBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsYUFBYSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUM7SUFDeEQsRUFBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxxQ0FBZ0IsRUFBQztJQUMvQyxFQUFDLElBQUksRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLHlDQUFrQixFQUFDO0NBQ3RELENBQUM7QUFNRjtJQUFBO0lBQ0EsQ0FBQztJQURZLGdCQUFnQjtRQUo1QixlQUFRLENBQUM7WUFDTixPQUFPLEVBQUUsQ0FBQyxpQ0FBd0IsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbkQsT0FBTyxFQUFFLENBQUMsaUNBQXdCLENBQUM7U0FDdEMsQ0FBQztPQUNXLGdCQUFnQixDQUM1QjtJQUFELHVCQUFDO0NBQUEsQUFERCxJQUNDO0FBRFksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7Um91dGVzfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQge05hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZX0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHtOZXdHYW1lQ29tcG9uZW50fSBmcm9tIFwiLi9uZXdnYW1lL25ldy1nYW1lLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtHYW1lc0xpc3RDb21wb25lbnR9IGZyb20gXCIuL2dhbWVzbGlzdC9nYW1lcy1saXN0LmNvbXBvbmVudFwiO1xuXG5jb25zdCByb3V0ZXM6IFJvdXRlcyA9IFtcbiAgICB7cGF0aDogXCJcIiwgcmVkaXJlY3RUbzogXCIvZ2FtZXMtbGlzdFwiLCBwYXRoTWF0Y2g6IFwiZnVsbFwifSxcbiAgICB7cGF0aDogXCJuZXctZ2FtZVwiLCBjb21wb25lbnQ6IE5ld0dhbWVDb21wb25lbnR9LFxuICAgIHtwYXRoOiBcImdhbWVzLWxpc3RcIiwgY29tcG9uZW50OiBHYW1lc0xpc3RDb21wb25lbnR9XG5dO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUuZm9yUm9vdChyb3V0ZXMpXSxcbiAgICBleHBvcnRzOiBbTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlXVxufSlcbmV4cG9ydCBjbGFzcyBBcHBSb3V0aW5nTW9kdWxlIHtcbn1cbiJdfQ==