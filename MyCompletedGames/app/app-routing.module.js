"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var new_game_component_1 = require("./newgame/new-game.component");
var games_list_component_1 = require("./gameslist/games-list.component");
var image_chooser_component_1 = require("./imagechooser/image-chooser.component");
var routes = [
    { path: "", redirectTo: "/games-list", pathMatch: "full" },
    { path: "new-game", component: new_game_component_1.NewGameComponent },
    { path: "games-list", component: games_list_component_1.GamesListComponent },
    { path: "images-chooser", component: image_chooser_component_1.ImageChooserComponent }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXJvdXRpbmcubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLXJvdXRpbmcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXVDO0FBRXZDLHNEQUFxRTtBQUVyRSxtRUFBOEQ7QUFDOUQseUVBQW9FO0FBQ3BFLGtGQUE2RTtBQUU3RSxJQUFNLE1BQU0sR0FBVztJQUNuQixFQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLGFBQWEsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFDO0lBQ3hELEVBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUscUNBQWdCLEVBQUM7SUFDL0MsRUFBQyxJQUFJLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSx5Q0FBa0IsRUFBQztJQUNuRCxFQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxTQUFTLEVBQUUsK0NBQXFCLEVBQUM7Q0FDN0QsQ0FBQztBQU1GO0lBQUE7SUFDQSxDQUFDO0lBRFksZ0JBQWdCO1FBSjVCLGVBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRSxDQUFDLGlDQUF3QixDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNuRCxPQUFPLEVBQUUsQ0FBQyxpQ0FBd0IsQ0FBQztTQUN0QyxDQUFDO09BQ1csZ0JBQWdCLENBQzVCO0lBQUQsdUJBQUM7Q0FBQSxBQURELElBQ0M7QUFEWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtSb3V0ZXN9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7TmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5cbmltcG9ydCB7TmV3R2FtZUNvbXBvbmVudH0gZnJvbSBcIi4vbmV3Z2FtZS9uZXctZ2FtZS5jb21wb25lbnRcIjtcbmltcG9ydCB7R2FtZXNMaXN0Q29tcG9uZW50fSBmcm9tIFwiLi9nYW1lc2xpc3QvZ2FtZXMtbGlzdC5jb21wb25lbnRcIjtcbmltcG9ydCB7SW1hZ2VDaG9vc2VyQ29tcG9uZW50fSBmcm9tIFwiLi9pbWFnZWNob29zZXIvaW1hZ2UtY2hvb3Nlci5jb21wb25lbnRcIjtcblxuY29uc3Qgcm91dGVzOiBSb3V0ZXMgPSBbXG4gICAge3BhdGg6IFwiXCIsIHJlZGlyZWN0VG86IFwiL2dhbWVzLWxpc3RcIiwgcGF0aE1hdGNoOiBcImZ1bGxcIn0sXG4gICAge3BhdGg6IFwibmV3LWdhbWVcIiwgY29tcG9uZW50OiBOZXdHYW1lQ29tcG9uZW50fSxcbiAgICB7cGF0aDogXCJnYW1lcy1saXN0XCIsIGNvbXBvbmVudDogR2FtZXNMaXN0Q29tcG9uZW50fSxcbiAgICB7cGF0aDogXCJpbWFnZXMtY2hvb3NlclwiLCBjb21wb25lbnQ6IEltYWdlQ2hvb3NlckNvbXBvbmVudH1cbl07XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW05hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZS5mb3JSb290KHJvdXRlcyldLFxuICAgIGV4cG9ydHM6IFtOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGVdXG59KVxuZXhwb3J0IGNsYXNzIEFwcFJvdXRpbmdNb2R1bGUge1xufVxuIl19