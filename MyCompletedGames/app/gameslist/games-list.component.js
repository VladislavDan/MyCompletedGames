"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var GamesFileService_1 = require("../services/GamesFileService");
var MockGames_1 = require("../common/MockGames");
var GoogleAuthService_1 = require("../services/GoogleAuthService");
var GoogleFileSyncService_1 = require("../services/GoogleFileSyncService");
var GamesListComponent = /** @class */ (function () {
    function GamesListComponent(googleAuthService, googleFileSyncService, gamesFileService) {
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
    GamesListComponent = __decorate([
        core_1.Component({
            selector: "games-list",
            moduleId: module.id,
            templateUrl: "./games-list.component.html",
            styleUrls: ['./games-list.css']
        }),
        __metadata("design:paramtypes", [GoogleAuthService_1.GoogleAuthService, GoogleFileSyncService_1.GoogleFileSyncService, GamesFileService_1.GamesFileService])
    ], GamesListComponent);
    return GamesListComponent;
}());
exports.GamesListComponent = GamesListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZXMtbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnYW1lcy1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFnRDtBQUloRCxpRUFBOEQ7QUFDOUQsaURBQStDO0FBQy9DLG1FQUFnRTtBQUNoRSwyRUFBd0U7QUFReEU7SUFJSSw0QkFBb0IsaUJBQW9DLEVBQVUscUJBQTRDLEVBQVUsZ0JBQWtDO1FBQXRJLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFBVSwwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUZuSixVQUFLLEdBQWdCLEVBQUUsQ0FBQztRQUkzQixJQUFJLENBQUMsS0FBSyxHQUFHLHNCQUFVLENBQUMsS0FBSyxDQUFDO0lBQ2xDLENBQUM7SUFFRCxxQ0FBUSxHQUFSO1FBQUEsaUJBZ0NDO1FBOUJHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxTQUFTLENBQ3ZDLFVBQUMsTUFBTTtZQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLEdBQUcsTUFBTSxDQUFDLENBQUM7WUFDL0MsS0FBSSxDQUFDLHFCQUFxQixDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQ3hELFVBQUMsTUFBTTtnQkFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNwQixLQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFNBQVMsQ0FDOUM7b0JBQ0ksS0FBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDLFNBQVMsQ0FDdEMsVUFBQyxLQUFLO3dCQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsOEJBQThCLENBQUMsQ0FBQzt3QkFDNUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDbkIsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7b0JBQ3ZCLENBQUMsRUFDRCxVQUFDLEtBQUs7d0JBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQ0FBb0MsR0FBRyxLQUFLLENBQUMsQ0FBQztvQkFDOUQsQ0FBQyxDQUNKLENBQUE7Z0JBQ0wsQ0FBQyxFQUNELFVBQUMsS0FBSztvQkFDRixPQUFPLENBQUMsR0FBRyxDQUFDLHNDQUFzQyxHQUFHLEtBQUssQ0FBQyxDQUFDO2dCQUNoRSxDQUFDLENBQ0osQ0FBQztZQUNOLENBQUMsRUFDRCxVQUFDLEtBQUs7Z0JBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQ0FBMkMsR0FBRyxLQUFLLENBQUMsQ0FBQztZQUNyRSxDQUFDLENBQ0osQ0FBQTtRQUNMLENBQUMsQ0FDSixDQUFDO0lBQ04sQ0FBQztJQUVELDBDQUFhLEdBQWIsVUFBYyxJQUFJO1FBQWxCLGlCQVlDO1FBVkcsSUFBSSxTQUFTLEdBQWMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN2QyxJQUFJLFdBQVcsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLENBQUMsU0FBUyxDQUN4RCxVQUFDLEtBQUs7WUFDRixLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUN2QixDQUFDLEVBQ0QsVUFBQyxLQUFLO1lBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQ0FBb0MsR0FBRyxLQUFLLENBQUMsQ0FBQztRQUM5RCxDQUFDLENBQ0osQ0FBQTtJQUNMLENBQUM7SUF2RFEsa0JBQWtCO1FBTjlCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsWUFBWTtZQUN0QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLDZCQUE2QjtZQUMxQyxTQUFTLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztTQUNsQyxDQUFDO3lDQUt5QyxxQ0FBaUIsRUFBaUMsNkNBQXFCLEVBQTRCLG1DQUFnQjtPQUpqSixrQkFBa0IsQ0F3RDlCO0lBQUQseUJBQUM7Q0FBQSxBQXhERCxJQXdEQztBQXhEWSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgT25Jbml0fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtTZWFyY2hCYXJ9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3NlYXJjaC1iYXJcIjtcblxuaW1wb3J0IHtHYW1lfSBmcm9tIFwiLi4vY29tbW9uL0dhbWVcIjtcbmltcG9ydCB7R2FtZXNGaWxlU2VydmljZX0gZnJvbSBcIi4uL3NlcnZpY2VzL0dhbWVzRmlsZVNlcnZpY2VcIjtcbmltcG9ydCB7TU9DS19HQU1FU30gZnJvbSBcIi4uL2NvbW1vbi9Nb2NrR2FtZXNcIjtcbmltcG9ydCB7R29vZ2xlQXV0aFNlcnZpY2V9IGZyb20gXCIuLi9zZXJ2aWNlcy9Hb29nbGVBdXRoU2VydmljZVwiO1xuaW1wb3J0IHtHb29nbGVGaWxlU3luY1NlcnZpY2V9IGZyb20gXCIuLi9zZXJ2aWNlcy9Hb29nbGVGaWxlU3luY1NlcnZpY2VcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiZ2FtZXMtbGlzdFwiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9nYW1lcy1saXN0LmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbJy4vZ2FtZXMtbGlzdC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBHYW1lc0xpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgcHVibGljIGdhbWVzOiBBcnJheTxHYW1lPiA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBnb29nbGVBdXRoU2VydmljZTogR29vZ2xlQXV0aFNlcnZpY2UsIHByaXZhdGUgZ29vZ2xlRmlsZVN5bmNTZXJ2aWNlOiBHb29nbGVGaWxlU3luY1NlcnZpY2UsIHByaXZhdGUgZ2FtZXNGaWxlU2VydmljZTogR2FtZXNGaWxlU2VydmljZSkge1xuXG4gICAgICAgIHRoaXMuZ2FtZXMgPSBNT0NLX0dBTUVTLmdhbWVzO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuXG4gICAgICAgIHRoaXMuZ29vZ2xlQXV0aFNlcnZpY2UuZ2V0VG9rZW4oKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJSZXN1bHQgcmVxdWVzdCB0b2tlbjogXCIgKyByZXN1bHQpO1xuICAgICAgICAgICAgICAgIHRoaXMuZ29vZ2xlRmlsZVN5bmNTZXJ2aWNlLnJlcXVlc3RMb2FkRmlsZShyZXN1bHQpLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5kaXIocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZXNGaWxlU2VydmljZS51cGRhdGVGaWxlKHJlc3VsdCkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lc0ZpbGVTZXJ2aWNlLmdldEdhbWVzKCkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGdhbWVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJHYW1lc0xpc3RDb21wb25lbnQgZ2V0R2FtZXMgXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKGdhbWVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVzID0gZ2FtZXM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJHYW1lc0xpc3RDb21wb25lbnQgZ2V0R2FtZXMgZXJyb3IgXCIgKyBlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdhbWVzTGlzdENvbXBvbmVudCB1cGRhdGVGaWxlIGVycm9yIFwiICsgZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJHYW1lc0xpc3RDb21wb25lbnQgcmVxdWVzdExvYWRGaWxlIGVycm9yIFwiICsgZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIG9uVGV4dENoYW5nZWQoYXJncykge1xuXG4gICAgICAgIGxldCBzZWFyY2hCYXIgPSA8U2VhcmNoQmFyPmFyZ3Mub2JqZWN0O1xuICAgICAgICBsZXQgc2VhcmNoVmFsdWUgPSBzZWFyY2hCYXIudGV4dDtcbiAgICAgICAgdGhpcy5nYW1lc0ZpbGVTZXJ2aWNlLmZpbmRHYW1lc0J5TmFtZShzZWFyY2hWYWx1ZSkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgKGdhbWVzKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lcyA9IGdhbWVzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR2FtZXNMaXN0Q29tcG9uZW50IGdldEdhbWVzIGVycm9yIFwiICsgZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICApXG4gICAgfVxufVxuIl19