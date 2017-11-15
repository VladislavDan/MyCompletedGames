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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZXMtbGlzdC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnYW1lcy1saXN0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5RDtBQUN6RCxnRkFBNEU7QUFFNUUseUVBQW1FO0FBQ25FLCtEQUEwRDtBQUMxRCx3RkFBa0Y7QUFDbEYsbUVBQStEO0FBZ0IvRDtJQUFBO0lBQ0EsQ0FBQztJQURZLGVBQWU7UUFkM0IsZUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFO2dCQUNMLHdDQUFrQjtnQkFDbEIsa0RBQXNCO2dCQUN0Qiw4QkFBYTthQUNoQjtZQUNELFlBQVksRUFBRTtnQkFDVix5Q0FBa0I7Z0JBQ2xCLGtEQUFzQjthQUN6QjtZQUNELE9BQU8sRUFBRTtnQkFDTCx1QkFBZ0I7YUFDbkI7U0FDSixDQUFDO09BQ1csZUFBZSxDQUMzQjtJQUFELHNCQUFDO0NBQUEsQUFERCxJQUNDO0FBRFksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtOYXRpdmVTY3JpcHRNb2R1bGV9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9uYXRpdmVzY3JpcHQubW9kdWxlXCI7XG5cbmltcG9ydCB7R2FtZXNMaXN0Um91dGluZ01vZHVsZX0gZnJvbSBcIi4vZ2FtZXMtbGlzdC1yb3V0aW5nLm1vZHVsZVwiO1xuaW1wb3J0IHtHYW1lc0xpc3RDb21wb25lbnR9IGZyb20gXCIuL2dhbWVzLWxpc3QuY29tcG9uZW50XCI7XG5pbXBvcnQge0dhbWVzTGlzdEl0ZW1Db21wb25lbnR9IGZyb20gXCIuLi9nYW1lc2xpc3RpdGVtL2dhbWVzLWxpc3QtaXRlbS5jb21wb25lbnRcIjtcbmltcG9ydCB7Q2hvb3Nlck1vZHVsZX0gZnJvbSBcIi4uL2NvbnNvbGVjaG9vc2VyL2Nob29zZXIubW9kdWxlXCI7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBOYXRpdmVTY3JpcHRNb2R1bGUsXG4gICAgICAgIEdhbWVzTGlzdFJvdXRpbmdNb2R1bGUsXG4gICAgICAgIENob29zZXJNb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBHYW1lc0xpc3RDb21wb25lbnQsXG4gICAgICAgIEdhbWVzTGlzdEl0ZW1Db21wb25lbnRcbiAgICBdLFxuICAgIHNjaGVtYXM6IFtcbiAgICAgICAgTk9fRVJST1JTX1NDSEVNQVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgR2FtZXNMaXN0TW9kdWxlIHtcbn1cbiJdfQ==