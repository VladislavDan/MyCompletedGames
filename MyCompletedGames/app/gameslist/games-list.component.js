"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var GamesFileService_1 = require("../services/GamesFileService");
var MockGames_1 = require("../common/MockGames");
var GoogleAuthService_1 = require("../services/GoogleAuthService");
var GoogleFileSyncService_1 = require("../services/GoogleFileSyncService");
var nativescript_angular_1 = require("nativescript-angular");
var console_chooser_component_1 = require("../consolechooser/console-chooser.component");
var GamesListComponent = /** @class */ (function () {
    function GamesListComponent(modal, vcRef, googleAuthService, googleFileSyncService, gamesFileService) {
        this.modal = modal;
        this.vcRef = vcRef;
        this.googleAuthService = googleAuthService;
        this.googleFileSyncService = googleFileSyncService;
        this.gamesFileService = gamesFileService;
        this.games = [];
        this.games = MockGames_1.MOCK_GAMES.games;
    }
    GamesListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.googleAuthService.getToken().subscribe(function (result) {
            console.log("Result request token: " + result);
            _this.googleFileSyncService.requestLoadFile(result).subscribe(function (result) {
                console.dir(result);
                _this.gamesFileService.updateFile(result).subscribe(function () {
                    _this.gamesFileService.getGames().subscribe(function (games) {
                        console.log("GamesListComponent getGames ");
                        console.dir(games);
                        _this.games = games;
                    }, function (error) {
                        console.log("GamesListComponent getGames error " + error);
                    });
                }, function (error) {
                    console.log("GamesListComponent updateFile error " + error);
                });
            }, function (error) {
                console.log("GamesListComponent requestLoadFile error " + error);
            });
        });
    };
    GamesListComponent.prototype.onTextChanged = function (args) {
        var _this = this;
        var searchBar = args.object;
        var searchValue = searchBar.text;
        this.gamesFileService.findGamesByName(searchValue).subscribe(function (games) {
            _this.games = games;
        }, function (error) {
            console.log("GamesListComponent getGames error " + error);
        });
    };
    GamesListComponent.prototype.onTap = function (event) {
        var options = {
            context: {},
            fullscreen: false,
            viewContainerRef: this.vcRef
        };
        this.modal.showModal(console_chooser_component_1.ConsoleChooserComponent, options).then(function (res) {
            console.log("Chooser closed");
        });
    };
    GamesListComponent = __decorate([
        core_1.Component({
            selector: "games-list",
            moduleId: module.id,
            templateUrl: "./games-list.component.html",
            styleUrls: ['./games-list.css']
        }),
        __metadata("design:paramtypes", [nativescript_angular_1.ModalDialogService, core_1.ViewContainerRef, GoogleAuthService_1.GoogleAuthService, GoogleFileSyncService_1.GoogleFileSyncService, GamesFileService_1.GamesFileService])
    ], GamesListComponent);
    return GamesListComponent;
}());
exports.GamesListComponent = GamesListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZXMtbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnYW1lcy1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRTtBQUlsRSxpRUFBOEQ7QUFDOUQsaURBQStDO0FBQy9DLG1FQUFnRTtBQUNoRSwyRUFBd0U7QUFDeEUsNkRBQXdEO0FBQ3hELHlGQUFvRjtBQVFwRjtJQUlJLDRCQUFvQixLQUF5QixFQUFVLEtBQXVCLEVBQVUsaUJBQW9DLEVBQVUscUJBQTRDLEVBQVUsZ0JBQWtDO1FBQTFNLFVBQUssR0FBTCxLQUFLLENBQW9CO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBa0I7UUFBVSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQVUsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUF1QjtRQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFGdk4sVUFBSyxHQUFnQixFQUFFLENBQUM7UUFJM0IsSUFBSSxDQUFDLEtBQUssR0FBRyxzQkFBVSxDQUFDLEtBQUssQ0FBQztJQUNsQyxDQUFDO0lBRUQscUNBQVEsR0FBUjtRQUFBLGlCQWdDQztRQTlCRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFLENBQUMsU0FBUyxDQUN2QyxVQUFDLE1BQU07WUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixHQUFHLE1BQU0sQ0FBQyxDQUFDO1lBQy9DLEtBQUksQ0FBQyxxQkFBcUIsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUMsU0FBUyxDQUN4RCxVQUFDLE1BQU07Z0JBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDcEIsS0FBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQzlDO29CQUNJLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxTQUFTLENBQ3RDLFVBQUMsS0FBSzt3QkFDRixPQUFPLENBQUMsR0FBRyxDQUFDLDhCQUE4QixDQUFDLENBQUM7d0JBQzVDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ25CLEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO29CQUN2QixDQUFDLEVBQ0QsVUFBQyxLQUFLO3dCQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0NBQW9DLEdBQUcsS0FBSyxDQUFDLENBQUM7b0JBQzlELENBQUMsQ0FDSixDQUFBO2dCQUNMLENBQUMsRUFDRCxVQUFDLEtBQUs7b0JBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQ0FBc0MsR0FBRyxLQUFLLENBQUMsQ0FBQztnQkFDaEUsQ0FBQyxDQUNKLENBQUM7WUFDTixDQUFDLEVBQ0QsVUFBQyxLQUFLO2dCQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkNBQTJDLEdBQUcsS0FBSyxDQUFDLENBQUM7WUFDckUsQ0FBQyxDQUNKLENBQUE7UUFDTCxDQUFDLENBQ0osQ0FBQztJQUNOLENBQUM7SUFFRCwwQ0FBYSxHQUFiLFVBQWMsSUFBSTtRQUFsQixpQkFZQztRQVZHLElBQUksU0FBUyxHQUFjLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDdkMsSUFBSSxXQUFXLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQztRQUNqQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFDLFNBQVMsQ0FDeEQsVUFBQyxLQUFLO1lBQ0YsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDdkIsQ0FBQyxFQUNELFVBQUMsS0FBSztZQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0NBQW9DLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDOUQsQ0FBQyxDQUNKLENBQUE7SUFDTCxDQUFDO0lBRUQsa0NBQUssR0FBTCxVQUFNLEtBQUs7UUFFUCxJQUFJLE9BQU8sR0FBRztZQUNWLE9BQU8sRUFBRSxFQUFFO1lBQ1gsVUFBVSxFQUFFLEtBQUs7WUFDakIsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLEtBQUs7U0FDL0IsQ0FBQztRQUNGLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLG1EQUF1QixFQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLEdBQUc7WUFDM0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ2xDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQW5FUSxrQkFBa0I7UUFOOUIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsNkJBQTZCO1lBQzFDLFNBQVMsRUFBRSxDQUFDLGtCQUFrQixDQUFDO1NBQ2xDLENBQUM7eUNBSzZCLHlDQUFrQixFQUFpQix1QkFBZ0IsRUFBNkIscUNBQWlCLEVBQWlDLDZDQUFxQixFQUE0QixtQ0FBZ0I7T0FKck4sa0JBQWtCLENBb0U5QjtJQUFELHlCQUFDO0NBQUEsQUFwRUQsSUFvRUM7QUFwRVksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdCwgVmlld0NvbnRhaW5lclJlZn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHtTZWFyY2hCYXJ9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3NlYXJjaC1iYXJcIjtcclxuXHJcbmltcG9ydCB7R2FtZX0gZnJvbSBcIi4uL2NvbW1vbi9HYW1lXCI7XHJcbmltcG9ydCB7R2FtZXNGaWxlU2VydmljZX0gZnJvbSBcIi4uL3NlcnZpY2VzL0dhbWVzRmlsZVNlcnZpY2VcIjtcclxuaW1wb3J0IHtNT0NLX0dBTUVTfSBmcm9tIFwiLi4vY29tbW9uL01vY2tHYW1lc1wiO1xyXG5pbXBvcnQge0dvb2dsZUF1dGhTZXJ2aWNlfSBmcm9tIFwiLi4vc2VydmljZXMvR29vZ2xlQXV0aFNlcnZpY2VcIjtcclxuaW1wb3J0IHtHb29nbGVGaWxlU3luY1NlcnZpY2V9IGZyb20gXCIuLi9zZXJ2aWNlcy9Hb29nbGVGaWxlU3luY1NlcnZpY2VcIjtcclxuaW1wb3J0IHtNb2RhbERpYWxvZ1NlcnZpY2V9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhclwiO1xyXG5pbXBvcnQge0NvbnNvbGVDaG9vc2VyQ29tcG9uZW50fSBmcm9tIFwiLi4vY29uc29sZWNob29zZXIvY29uc29sZS1jaG9vc2VyLmNvbXBvbmVudFwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJnYW1lcy1saXN0XCIsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9nYW1lcy1saXN0LmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9nYW1lcy1saXN0LmNzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBHYW1lc0xpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICAgIHB1YmxpYyBnYW1lczogQXJyYXk8R2FtZT4gPSBbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1vZGFsOiBNb2RhbERpYWxvZ1NlcnZpY2UsIHByaXZhdGUgdmNSZWY6IFZpZXdDb250YWluZXJSZWYsIHByaXZhdGUgZ29vZ2xlQXV0aFNlcnZpY2U6IEdvb2dsZUF1dGhTZXJ2aWNlLCBwcml2YXRlIGdvb2dsZUZpbGVTeW5jU2VydmljZTogR29vZ2xlRmlsZVN5bmNTZXJ2aWNlLCBwcml2YXRlIGdhbWVzRmlsZVNlcnZpY2U6IEdhbWVzRmlsZVNlcnZpY2UpIHtcclxuXHJcbiAgICAgICAgdGhpcy5nYW1lcyA9IE1PQ0tfR0FNRVMuZ2FtZXM7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcblxyXG4gICAgICAgIHRoaXMuZ29vZ2xlQXV0aFNlcnZpY2UuZ2V0VG9rZW4oKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUmVzdWx0IHJlcXVlc3QgdG9rZW46IFwiICsgcmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ29vZ2xlRmlsZVN5bmNTZXJ2aWNlLnJlcXVlc3RMb2FkRmlsZShyZXN1bHQpLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAgICAgICAocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZXNGaWxlU2VydmljZS51cGRhdGVGaWxlKHJlc3VsdCkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZXNGaWxlU2VydmljZS5nZXRHYW1lcygpLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGdhbWVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdhbWVzTGlzdENvbXBvbmVudCBnZXRHYW1lcyBcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRpcihnYW1lcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVzID0gZ2FtZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJHYW1lc0xpc3RDb21wb25lbnQgZ2V0R2FtZXMgZXJyb3IgXCIgKyBlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJHYW1lc0xpc3RDb21wb25lbnQgdXBkYXRlRmlsZSBlcnJvciBcIiArIGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdhbWVzTGlzdENvbXBvbmVudCByZXF1ZXN0TG9hZEZpbGUgZXJyb3IgXCIgKyBlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBvblRleHRDaGFuZ2VkKGFyZ3MpIHtcclxuXHJcbiAgICAgICAgbGV0IHNlYXJjaEJhciA9IDxTZWFyY2hCYXI+YXJncy5vYmplY3Q7XHJcbiAgICAgICAgbGV0IHNlYXJjaFZhbHVlID0gc2VhcmNoQmFyLnRleHQ7XHJcbiAgICAgICAgdGhpcy5nYW1lc0ZpbGVTZXJ2aWNlLmZpbmRHYW1lc0J5TmFtZShzZWFyY2hWYWx1ZSkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAoZ2FtZXMpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZXMgPSBnYW1lcztcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdhbWVzTGlzdENvbXBvbmVudCBnZXRHYW1lcyBlcnJvciBcIiArIGVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuICAgIH1cclxuXHJcbiAgICBvblRhcChldmVudCkge1xyXG5cclxuICAgICAgICBsZXQgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgY29udGV4dDoge30sXHJcbiAgICAgICAgICAgIGZ1bGxzY3JlZW46IGZhbHNlLFxyXG4gICAgICAgICAgICB2aWV3Q29udGFpbmVyUmVmOiB0aGlzLnZjUmVmXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLm1vZGFsLnNob3dNb2RhbChDb25zb2xlQ2hvb3NlckNvbXBvbmVudCwgb3B0aW9ucykudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNob29zZXIgY2xvc2VkXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==