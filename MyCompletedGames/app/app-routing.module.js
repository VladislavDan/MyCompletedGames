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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXJvdXRpbmcubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLXJvdXRpbmcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXVDO0FBRXZDLHNEQUFxRTtBQUVyRSxtRUFBOEQ7QUFDOUQseUVBQW9FO0FBQ3BFLGtGQUE2RTtBQUM3RSxpRUFBNkQ7QUFFN0QsSUFBTSxNQUFNLEdBQVc7SUFDbkIsRUFBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBQztJQUN4RCxFQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLHFDQUFnQixFQUFDO0lBQy9DLEVBQUMsSUFBSSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUseUNBQWtCLEVBQUM7SUFDbkQsRUFBQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsU0FBUyxFQUFFLCtDQUFxQixFQUFDO0lBQzFELEVBQUMsSUFBSSxFQUFFLGFBQWEsRUFBRSxTQUFTLEVBQUUsb0NBQWdCLEVBQUM7Q0FDckQsQ0FBQztBQU1GO0lBQUE7SUFDQSxDQUFDO0lBRFksZ0JBQWdCO1FBSjVCLGVBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRSxDQUFDLGlDQUF3QixDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNuRCxPQUFPLEVBQUUsQ0FBQyxpQ0FBd0IsQ0FBQztTQUN0QyxDQUFDO09BQ1csZ0JBQWdCLENBQzVCO0lBQUQsdUJBQUM7Q0FBQSxBQURELElBQ0M7QUFEWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQge1JvdXRlc30gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQge05hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZX0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5cclxuaW1wb3J0IHtOZXdHYW1lQ29tcG9uZW50fSBmcm9tIFwiLi9uZXdnYW1lL25ldy1nYW1lLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQge0dhbWVzTGlzdENvbXBvbmVudH0gZnJvbSBcIi4vZ2FtZXNsaXN0L2dhbWVzLWxpc3QuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7SW1hZ2VDaG9vc2VyQ29tcG9uZW50fSBmcm9tIFwiLi9pbWFnZWNob29zZXIvaW1hZ2UtY2hvb3Nlci5jb21wb25lbnRcIjtcclxuaW1wb3J0IHtEZXRhaWxzQ29tcG9uZW50fSBmcm9tIFwiLi9kZXRhaWxzL2RldGFpbHMuY29tcG9uZW50XCI7XHJcblxyXG5jb25zdCByb3V0ZXM6IFJvdXRlcyA9IFtcclxuICAgIHtwYXRoOiBcIlwiLCByZWRpcmVjdFRvOiBcIi9nYW1lcy1saXN0XCIsIHBhdGhNYXRjaDogXCJmdWxsXCJ9LFxyXG4gICAge3BhdGg6IFwibmV3LWdhbWVcIiwgY29tcG9uZW50OiBOZXdHYW1lQ29tcG9uZW50fSxcclxuICAgIHtwYXRoOiBcImdhbWVzLWxpc3RcIiwgY29tcG9uZW50OiBHYW1lc0xpc3RDb21wb25lbnR9LFxyXG4gICAge3BhdGg6IFwiaW1hZ2VzLWNob29zZXJcIiwgY29tcG9uZW50OiBJbWFnZUNob29zZXJDb21wb25lbnR9LFxyXG4gICAge3BhdGg6IFwiZGV0YWlscy86aWRcIiwgY29tcG9uZW50OiBEZXRhaWxzQ29tcG9uZW50fVxyXG5dO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUuZm9yUm9vdChyb3V0ZXMpXSxcclxuICAgIGV4cG9ydHM6IFtOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGVdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBcHBSb3V0aW5nTW9kdWxlIHtcclxufVxyXG4iXX0=