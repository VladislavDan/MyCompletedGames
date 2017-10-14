"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var games_list_routing_module_1 = require("./games-list-routing.module");
var games_list_component_1 = require("./games-list.component");
var GamesService_1 = require("../services/GamesService");
var GamesListModule = /** @class */ (function () {
    function GamesListModule() {
    }
    GamesListModule = __decorate([
        core_1.NgModule({
            imports: [
                nativescript_module_1.NativeScriptModule,
                games_list_routing_module_1.GamesListRoutingModule
            ],
            declarations: [
                games_list_component_1.GamesListComponent
            ],
            providers: [GamesService_1.GamesService],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], GamesListModule);
    return GamesListModule;
}());
exports.GamesListModule = GamesListModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZXMtbGlzdC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnYW1lcy1saXN0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5RDtBQUN6RCxnRkFBNEU7QUFFNUUseUVBQW1FO0FBQ25FLCtEQUEwRDtBQUMxRCx5REFBc0Q7QUFldEQ7SUFBQTtJQUNBLENBQUM7SUFEWSxlQUFlO1FBYjNCLGVBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRTtnQkFDTCx3Q0FBa0I7Z0JBQ2xCLGtEQUFzQjthQUN6QjtZQUNELFlBQVksRUFBRTtnQkFDVix5Q0FBa0I7YUFDckI7WUFDRCxTQUFTLEVBQUUsQ0FBQywyQkFBWSxDQUFDO1lBQ3pCLE9BQU8sRUFBRTtnQkFDTCx1QkFBZ0I7YUFDbkI7U0FDSixDQUFDO09BQ1csZUFBZSxDQUMzQjtJQUFELHNCQUFDO0NBQUEsQUFERCxJQUNDO0FBRFksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtOYXRpdmVTY3JpcHRNb2R1bGV9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9uYXRpdmVzY3JpcHQubW9kdWxlXCI7XG5cbmltcG9ydCB7R2FtZXNMaXN0Um91dGluZ01vZHVsZX0gZnJvbSBcIi4vZ2FtZXMtbGlzdC1yb3V0aW5nLm1vZHVsZVwiO1xuaW1wb3J0IHtHYW1lc0xpc3RDb21wb25lbnR9IGZyb20gXCIuL2dhbWVzLWxpc3QuY29tcG9uZW50XCI7XG5pbXBvcnQge0dhbWVzU2VydmljZX0gZnJvbSBcIi4uL3NlcnZpY2VzL0dhbWVzU2VydmljZVwiO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgTmF0aXZlU2NyaXB0TW9kdWxlLFxuICAgICAgICBHYW1lc0xpc3RSb3V0aW5nTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgR2FtZXNMaXN0Q29tcG9uZW50XG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtHYW1lc1NlcnZpY2VdLFxuICAgIHNjaGVtYXM6IFtcbiAgICAgICAgTk9fRVJST1JTX1NDSEVNQVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgR2FtZXNMaXN0TW9kdWxlIHtcbn1cbiJdfQ==