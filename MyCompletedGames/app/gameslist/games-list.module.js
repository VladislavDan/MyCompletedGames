"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var games_list_routing_module_1 = require("./games-list-routing.module");
var games_list_component_1 = require("./games-list.component");
var GamesService_1 = require("../services/GamesService");
var games_list_item_component_1 = require("../gameslistitem/games-list-item.component");
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
                games_list_component_1.GamesListComponent,
                games_list_item_component_1.GamesListItemComponent
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZXMtbGlzdC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnYW1lcy1saXN0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5RDtBQUN6RCxnRkFBNEU7QUFFNUUseUVBQW1FO0FBQ25FLCtEQUEwRDtBQUMxRCx5REFBc0Q7QUFDdEQsd0ZBQWtGO0FBZ0JsRjtJQUFBO0lBQ0EsQ0FBQztJQURZLGVBQWU7UUFkM0IsZUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFO2dCQUNMLHdDQUFrQjtnQkFDbEIsa0RBQXNCO2FBQ3pCO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLHlDQUFrQjtnQkFDbEIsa0RBQXNCO2FBQ3pCO1lBQ0QsU0FBUyxFQUFFLENBQUMsMkJBQVksQ0FBQztZQUN6QixPQUFPLEVBQUU7Z0JBQ0wsdUJBQWdCO2FBQ25CO1NBQ0osQ0FBQztPQUNXLGVBQWUsQ0FDM0I7SUFBRCxzQkFBQztDQUFBLEFBREQsSUFDQztBQURZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7TmF0aXZlU2NyaXB0TW9kdWxlfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbmF0aXZlc2NyaXB0Lm1vZHVsZVwiO1xuXG5pbXBvcnQge0dhbWVzTGlzdFJvdXRpbmdNb2R1bGV9IGZyb20gXCIuL2dhbWVzLWxpc3Qtcm91dGluZy5tb2R1bGVcIjtcbmltcG9ydCB7R2FtZXNMaXN0Q29tcG9uZW50fSBmcm9tIFwiLi9nYW1lcy1saXN0LmNvbXBvbmVudFwiO1xuaW1wb3J0IHtHYW1lc1NlcnZpY2V9IGZyb20gXCIuLi9zZXJ2aWNlcy9HYW1lc1NlcnZpY2VcIjtcbmltcG9ydCB7R2FtZXNMaXN0SXRlbUNvbXBvbmVudH0gZnJvbSBcIi4uL2dhbWVzbGlzdGl0ZW0vZ2FtZXMtbGlzdC1pdGVtLmNvbXBvbmVudFwiO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgTmF0aXZlU2NyaXB0TW9kdWxlLFxuICAgICAgICBHYW1lc0xpc3RSb3V0aW5nTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgR2FtZXNMaXN0Q29tcG9uZW50LFxuICAgICAgICBHYW1lc0xpc3RJdGVtQ29tcG9uZW50XG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtHYW1lc1NlcnZpY2VdLFxuICAgIHNjaGVtYXM6IFtcbiAgICAgICAgTk9fRVJST1JTX1NDSEVNQVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgR2FtZXNMaXN0TW9kdWxlIHtcbn1cbiJdfQ==