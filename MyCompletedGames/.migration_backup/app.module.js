"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var router_1 = require("nativescript-angular/router");
var http_1 = require("@angular/http");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var GamesService_1 = require("./services/GamesService");
var GoogleAuthService_1 = require("./services/GoogleAuthService");
var GoogleFileSyncService_1 = require("./services/GoogleFileSyncService");
var nativescript_angular_1 = require("nativescript-angular");
var new_game_module_1 = require("./newgame/new-game.module");
var page_container_module_1 = require("./pagescontainer/page-container.module");
var element_registry_1 = require("nativescript-angular/element-registry");
element_registry_1.registerElement("Fab", function () { return require("nativescript-floatingactionbutton").Fab; });
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            bootstrap: [
                app_component_1.AppComponent
            ],
            imports: [
                nativescript_module_1.NativeScriptModule,
                app_routing_module_1.AppRoutingModule,
                new_game_module_1.NewGameModule,
                page_container_module_1.PageContainerModule,
                http_1.HttpModule
            ],
            declarations: [
                app_component_1.AppComponent
            ],
            providers: [
                GamesService_1.GamesService,
                GoogleAuthService_1.GoogleAuthService,
                GoogleFileSyncService_1.GoogleFileSyncService,
                nativescript_angular_1.ModalDialogService,
                { provide: core_1.NgModuleFactoryLoader, useClass: router_1.NSModuleFactoryLoader }
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBZ0Y7QUFDaEYsZ0ZBQTRFO0FBQzVFLHNEQUFrRTtBQUNsRSxzQ0FBeUM7QUFFekMsMkRBQXNEO0FBQ3RELGlEQUE2QztBQUM3Qyx3REFBcUQ7QUFDckQsa0VBQStEO0FBQy9ELDBFQUF1RTtBQUN2RSw2REFBd0Q7QUFDeEQsNkRBQXdEO0FBQ3hELGdGQUEyRTtBQUUzRSwwRUFBc0U7QUFFdEUsa0NBQWUsQ0FBQyxLQUFLLEVBQUUsY0FBTSxPQUFBLE9BQU8sQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDLEdBQUcsRUFBaEQsQ0FBZ0QsQ0FBQyxDQUFDO0FBMkIvRTtJQUFBO0lBQ0EsQ0FBQztJQURZLFNBQVM7UUF6QnJCLGVBQVEsQ0FBQztZQUNOLFNBQVMsRUFBRTtnQkFDUCw0QkFBWTthQUNmO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLHdDQUFrQjtnQkFDbEIscUNBQWdCO2dCQUNoQiwrQkFBYTtnQkFDYiwyQ0FBbUI7Z0JBQ25CLGlCQUFVO2FBQ2I7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsNEJBQVk7YUFDZjtZQUNELFNBQVMsRUFBRTtnQkFDUCwyQkFBWTtnQkFDWixxQ0FBaUI7Z0JBQ2pCLDZDQUFxQjtnQkFDckIseUNBQWtCO2dCQUNsQixFQUFDLE9BQU8sRUFBRSw0QkFBcUIsRUFBRSxRQUFRLEVBQUUsOEJBQXFCLEVBQUM7YUFDcEU7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsdUJBQWdCO2FBQ25CO1NBQ0osQ0FBQztPQUNXLFNBQVMsQ0FDckI7SUFBRCxnQkFBQztDQUFBLEFBREQsSUFDQztBQURZLDhCQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSwgTmdNb2R1bGVGYWN0b3J5TG9hZGVyLCBOT19FUlJPUlNfU0NIRU1BfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQge05hdGl2ZVNjcmlwdE1vZHVsZX0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL25hdGl2ZXNjcmlwdC5tb2R1bGVcIjtcclxuaW1wb3J0IHtOU01vZHVsZUZhY3RvcnlMb2FkZXJ9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHtIdHRwTW9kdWxlfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xyXG5cclxuaW1wb3J0IHtBcHBSb3V0aW5nTW9kdWxlfSBmcm9tIFwiLi9hcHAtcm91dGluZy5tb2R1bGVcIjtcclxuaW1wb3J0IHtBcHBDb21wb25lbnR9IGZyb20gXCIuL2FwcC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHtHYW1lc1NlcnZpY2V9IGZyb20gXCIuL3NlcnZpY2VzL0dhbWVzU2VydmljZVwiO1xyXG5pbXBvcnQge0dvb2dsZUF1dGhTZXJ2aWNlfSBmcm9tIFwiLi9zZXJ2aWNlcy9Hb29nbGVBdXRoU2VydmljZVwiO1xyXG5pbXBvcnQge0dvb2dsZUZpbGVTeW5jU2VydmljZX0gZnJvbSBcIi4vc2VydmljZXMvR29vZ2xlRmlsZVN5bmNTZXJ2aWNlXCI7XHJcbmltcG9ydCB7TW9kYWxEaWFsb2dTZXJ2aWNlfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXJcIjtcclxuaW1wb3J0IHtOZXdHYW1lTW9kdWxlfSBmcm9tIFwiLi9uZXdnYW1lL25ldy1nYW1lLm1vZHVsZVwiO1xyXG5pbXBvcnQge1BhZ2VDb250YWluZXJNb2R1bGV9IGZyb20gXCIuL3BhZ2VzY29udGFpbmVyL3BhZ2UtY29udGFpbmVyLm1vZHVsZVwiO1xyXG5cclxuaW1wb3J0IHtyZWdpc3RlckVsZW1lbnR9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9lbGVtZW50LXJlZ2lzdHJ5XCI7XHJcblxyXG5yZWdpc3RlckVsZW1lbnQoXCJGYWJcIiwgKCkgPT4gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1mbG9hdGluZ2FjdGlvbmJ1dHRvblwiKS5GYWIpO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGJvb3RzdHJhcDogW1xyXG4gICAgICAgIEFwcENvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIGltcG9ydHM6IFtcclxuICAgICAgICBOYXRpdmVTY3JpcHRNb2R1bGUsXHJcbiAgICAgICAgQXBwUm91dGluZ01vZHVsZSxcclxuICAgICAgICBOZXdHYW1lTW9kdWxlLFxyXG4gICAgICAgIFBhZ2VDb250YWluZXJNb2R1bGUsXHJcbiAgICAgICAgSHR0cE1vZHVsZVxyXG4gICAgXSxcclxuICAgIGRlY2xhcmF0aW9uczogW1xyXG4gICAgICAgIEFwcENvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIEdhbWVzU2VydmljZSxcclxuICAgICAgICBHb29nbGVBdXRoU2VydmljZSxcclxuICAgICAgICBHb29nbGVGaWxlU3luY1NlcnZpY2UsXHJcbiAgICAgICAgTW9kYWxEaWFsb2dTZXJ2aWNlLFxyXG4gICAgICAgIHtwcm92aWRlOiBOZ01vZHVsZUZhY3RvcnlMb2FkZXIsIHVzZUNsYXNzOiBOU01vZHVsZUZhY3RvcnlMb2FkZXJ9XHJcbiAgICBdLFxyXG4gICAgc2NoZW1hczogW1xyXG4gICAgICAgIE5PX0VSUk9SU19TQ0hFTUFcclxuICAgIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7XHJcbn1cclxuIl19