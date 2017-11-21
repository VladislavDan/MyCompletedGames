"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var new_game_component_1 = require("./newgame/new-game.component");
var games_list_component_1 = require("./gameslist/games-list.component");
var image_chooser_component_1 = require("./imagechooser/image-chooser.component");
var details_component_1 = require("./details/details.component");
var routes = [
    { path: "", redirectTo: "/games-list", pathMatch: "full" },
    { path: "new-game", component: new_game_component_1.NewGameComponent },
    { path: "games-list", component: games_list_component_1.GamesListComponent },
    { path: "images-chooser", component: image_chooser_component_1.ImageChooserComponent },
    { path: "details/:id", component: details_component_1.DetailsComponent }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXJvdXRpbmcubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLXJvdXRpbmcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXVDO0FBRXZDLHNEQUFxRTtBQUVyRSxtRUFBOEQ7QUFDOUQseUVBQW9FO0FBQ3BFLGtGQUE2RTtBQUM3RSxpRUFBNkQ7QUFFN0QsSUFBTSxNQUFNLEdBQVc7SUFDbkIsRUFBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBQztJQUN4RCxFQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLHFDQUFnQixFQUFDO0lBQy9DLEVBQUMsSUFBSSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUseUNBQWtCLEVBQUM7SUFDbkQsRUFBQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsU0FBUyxFQUFFLCtDQUFxQixFQUFDO0lBQzFELEVBQUMsSUFBSSxFQUFFLGFBQWEsRUFBRSxTQUFTLEVBQUUsb0NBQWdCLEVBQUM7Q0FDckQsQ0FBQztBQU1GO0lBQUE7SUFDQSxDQUFDO0lBRFksZ0JBQWdCO1FBSjVCLGVBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRSxDQUFDLGlDQUF3QixDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNuRCxPQUFPLEVBQUUsQ0FBQyxpQ0FBd0IsQ0FBQztTQUN0QyxDQUFDO09BQ1csZ0JBQWdCLENBQzVCO0lBQUQsdUJBQUM7Q0FBQSxBQURELElBQ0M7QUFEWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtSb3V0ZXN9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7TmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5cbmltcG9ydCB7TmV3R2FtZUNvbXBvbmVudH0gZnJvbSBcIi4vbmV3Z2FtZS9uZXctZ2FtZS5jb21wb25lbnRcIjtcbmltcG9ydCB7R2FtZXNMaXN0Q29tcG9uZW50fSBmcm9tIFwiLi9nYW1lc2xpc3QvZ2FtZXMtbGlzdC5jb21wb25lbnRcIjtcbmltcG9ydCB7SW1hZ2VDaG9vc2VyQ29tcG9uZW50fSBmcm9tIFwiLi9pbWFnZWNob29zZXIvaW1hZ2UtY2hvb3Nlci5jb21wb25lbnRcIjtcbmltcG9ydCB7RGV0YWlsc0NvbXBvbmVudH0gZnJvbSBcIi4vZGV0YWlscy9kZXRhaWxzLmNvbXBvbmVudFwiO1xuXG5jb25zdCByb3V0ZXM6IFJvdXRlcyA9IFtcbiAgICB7cGF0aDogXCJcIiwgcmVkaXJlY3RUbzogXCIvZ2FtZXMtbGlzdFwiLCBwYXRoTWF0Y2g6IFwiZnVsbFwifSxcbiAgICB7cGF0aDogXCJuZXctZ2FtZVwiLCBjb21wb25lbnQ6IE5ld0dhbWVDb21wb25lbnR9LFxuICAgIHtwYXRoOiBcImdhbWVzLWxpc3RcIiwgY29tcG9uZW50OiBHYW1lc0xpc3RDb21wb25lbnR9LFxuICAgIHtwYXRoOiBcImltYWdlcy1jaG9vc2VyXCIsIGNvbXBvbmVudDogSW1hZ2VDaG9vc2VyQ29tcG9uZW50fSxcbiAgICB7cGF0aDogXCJkZXRhaWxzLzppZFwiLCBjb21wb25lbnQ6IERldGFpbHNDb21wb25lbnR9XG5dO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUuZm9yUm9vdChyb3V0ZXMpXSxcbiAgICBleHBvcnRzOiBbTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlXVxufSlcbmV4cG9ydCBjbGFzcyBBcHBSb3V0aW5nTW9kdWxlIHtcbn1cbiJdfQ==