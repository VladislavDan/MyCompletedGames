"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var games_list_routing_module_1 = require("./games-list-routing.module");
var games_list_component_1 = require("./games-list.component");
var games_list_item_component_1 = require("../gameslistitem/games-list-item.component");
var chooser_module_1 = require("../consolechooser/chooser.module");
var GamesListModule = /** @class */ (function () {
    function GamesListModule() {
    }
    GamesListModule = __decorate([
        core_1.NgModule({
            imports: [
                nativescript_module_1.NativeScriptModule,
                games_list_routing_module_1.GamesListRoutingModule,
                chooser_module_1.ChooserModule
            ],
            declarations: [
                games_list_component_1.GamesListComponent,
                games_list_item_component_1.GamesListItemComponent
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], GamesListModule);
    return GamesListModule;
}());
exports.GamesListModule = GamesListModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZXMtbGlzdC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnYW1lcy1saXN0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5RDtBQUN6RCxnRkFBNEU7QUFFNUUseUVBQW1FO0FBQ25FLCtEQUEwRDtBQUMxRCx3RkFBa0Y7QUFDbEYsbUVBQStEO0FBZ0IvRDtJQUFBO0lBQ0EsQ0FBQztJQURZLGVBQWU7UUFkM0IsZUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFO2dCQUNMLHdDQUFrQjtnQkFDbEIsa0RBQXNCO2dCQUN0Qiw4QkFBYTthQUNoQjtZQUNELFlBQVksRUFBRTtnQkFDVix5Q0FBa0I7Z0JBQ2xCLGtEQUFzQjthQUN6QjtZQUNELE9BQU8sRUFBRTtnQkFDTCx1QkFBZ0I7YUFDbkI7U0FDSixDQUFDO09BQ1csZUFBZSxDQUMzQjtJQUFELHNCQUFDO0NBQUEsQUFERCxJQUNDO0FBRFksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQge05hdGl2ZVNjcmlwdE1vZHVsZX0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL25hdGl2ZXNjcmlwdC5tb2R1bGVcIjtcclxuXHJcbmltcG9ydCB7R2FtZXNMaXN0Um91dGluZ01vZHVsZX0gZnJvbSBcIi4vZ2FtZXMtbGlzdC1yb3V0aW5nLm1vZHVsZVwiO1xyXG5pbXBvcnQge0dhbWVzTGlzdENvbXBvbmVudH0gZnJvbSBcIi4vZ2FtZXMtbGlzdC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHtHYW1lc0xpc3RJdGVtQ29tcG9uZW50fSBmcm9tIFwiLi4vZ2FtZXNsaXN0aXRlbS9nYW1lcy1saXN0LWl0ZW0uY29tcG9uZW50XCI7XHJcbmltcG9ydCB7Q2hvb3Nlck1vZHVsZX0gZnJvbSBcIi4uL2NvbnNvbGVjaG9vc2VyL2Nob29zZXIubW9kdWxlXCI7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW1xyXG4gICAgICAgIE5hdGl2ZVNjcmlwdE1vZHVsZSxcclxuICAgICAgICBHYW1lc0xpc3RSb3V0aW5nTW9kdWxlLFxyXG4gICAgICAgIENob29zZXJNb2R1bGVcclxuICAgIF0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtcclxuICAgICAgICBHYW1lc0xpc3RDb21wb25lbnQsXHJcbiAgICAgICAgR2FtZXNMaXN0SXRlbUNvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIHNjaGVtYXM6IFtcclxuICAgICAgICBOT19FUlJPUlNfU0NIRU1BXHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBHYW1lc0xpc3RNb2R1bGUge1xyXG59XHJcbiJdfQ==