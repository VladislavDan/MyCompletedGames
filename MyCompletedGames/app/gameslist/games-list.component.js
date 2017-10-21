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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZXMtbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnYW1lcy1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFtRztBQUVuRyxpRUFBOEQ7QUFDOUQsaURBQStDO0FBSS9DLG1FQUFnRTtBQUNoRSwyRUFBd0U7QUFReEU7SUFJSSw0QkFBb0IsaUJBQW9DLEVBQVUscUJBQTRDLEVBQVUsZ0JBQWtDO1FBQXRJLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFBVSwwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUZuSixVQUFLLEdBQWdCLEVBQUUsQ0FBQztRQUczQixJQUFJLENBQUMsS0FBSyxHQUFHLHNCQUFVLENBQUMsS0FBSyxDQUFDO0lBQ2xDLENBQUM7SUFFRCxxQ0FBUSxHQUFSO1FBQUEsaUJBK0JDO1FBOUJHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxTQUFTLENBQ3ZDLFVBQUMsTUFBTTtZQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLEdBQUcsTUFBTSxDQUFDLENBQUM7WUFDL0MsS0FBSSxDQUFDLHFCQUFxQixDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQ3hELFVBQUMsTUFBTTtnQkFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNwQixLQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFNBQVMsQ0FDOUM7b0JBQ0ksS0FBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDLFNBQVMsQ0FDdEMsVUFBQyxLQUFLO3dCQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsOEJBQThCLENBQUMsQ0FBQzt3QkFDNUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDbkIsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7b0JBQ3ZCLENBQUMsRUFDRCxVQUFDLEtBQUs7d0JBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQ0FBb0MsR0FBRyxLQUFLLENBQUMsQ0FBQztvQkFDOUQsQ0FBQyxDQUNKLENBQUE7Z0JBQ0wsQ0FBQyxFQUNELFVBQUMsS0FBSztvQkFDRixPQUFPLENBQUMsR0FBRyxDQUFDLHNDQUFzQyxHQUFHLEtBQUssQ0FBQyxDQUFDO2dCQUNoRSxDQUFDLENBQ0osQ0FBQztZQUNOLENBQUMsRUFDRCxVQUFDLEtBQUs7Z0JBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQ0FBMkMsR0FBRyxLQUFLLENBQUMsQ0FBQztZQUNyRSxDQUFDLENBQ0osQ0FBQTtRQUNMLENBQUMsQ0FDSixDQUFDO0lBQ04sQ0FBQztJQXZDUSxrQkFBa0I7UUFOOUIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsNkJBQTZCO1lBQzFDLFNBQVMsRUFBRSxDQUFDLGtCQUFrQixDQUFDO1NBQ2xDLENBQUM7eUNBS3lDLHFDQUFpQixFQUFpQyw2Q0FBcUIsRUFBNEIsbUNBQWdCO09BSmpKLGtCQUFrQixDQXdDOUI7SUFBRCx5QkFBQztDQUFBLEFBeENELElBd0NDO0FBeENZLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIElucHV0LCBPbkluaXR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0dhbWV9IGZyb20gXCIuLi9jb21tb24vR2FtZVwiO1xuaW1wb3J0IHtHYW1lc0ZpbGVTZXJ2aWNlfSBmcm9tIFwiLi4vc2VydmljZXMvR2FtZXNGaWxlU2VydmljZVwiO1xuaW1wb3J0IHtNT0NLX0dBTUVTfSBmcm9tIFwiLi4vY29tbW9uL01vY2tHYW1lc1wiO1xuXG5pbXBvcnQgQXBwbGljYXRpb24gPSByZXF1aXJlKFwiYXBwbGljYXRpb25cIik7XG5pbXBvcnQgU29jaWFsTG9naW4gPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXNvY2lhbC1sb2dpblwiKTtcbmltcG9ydCB7R29vZ2xlQXV0aFNlcnZpY2V9IGZyb20gXCIuLi9zZXJ2aWNlcy9Hb29nbGVBdXRoU2VydmljZVwiO1xuaW1wb3J0IHtHb29nbGVGaWxlU3luY1NlcnZpY2V9IGZyb20gXCIuLi9zZXJ2aWNlcy9Hb29nbGVGaWxlU3luY1NlcnZpY2VcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiZ2FtZXMtbGlzdFwiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9nYW1lcy1saXN0LmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbJy4vZ2FtZXMtbGlzdC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBHYW1lc0xpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgcHVibGljIGdhbWVzOiBBcnJheTxHYW1lPiA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBnb29nbGVBdXRoU2VydmljZTogR29vZ2xlQXV0aFNlcnZpY2UsIHByaXZhdGUgZ29vZ2xlRmlsZVN5bmNTZXJ2aWNlOiBHb29nbGVGaWxlU3luY1NlcnZpY2UsIHByaXZhdGUgZ2FtZXNGaWxlU2VydmljZTogR2FtZXNGaWxlU2VydmljZSkge1xuICAgICAgICB0aGlzLmdhbWVzID0gTU9DS19HQU1FUy5nYW1lcztcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5nb29nbGVBdXRoU2VydmljZS5nZXRUb2tlbigpLnN1YnNjcmliZShcbiAgICAgICAgICAgIChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJlc3VsdCByZXF1ZXN0IHRva2VuOiBcIiArIHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgdGhpcy5nb29nbGVGaWxlU3luY1NlcnZpY2UucmVxdWVzdExvYWRGaWxlKHJlc3VsdCkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRpcihyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lc0ZpbGVTZXJ2aWNlLnVwZGF0ZUZpbGUocmVzdWx0KS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVzRmlsZVNlcnZpY2UuZ2V0R2FtZXMoKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZ2FtZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdhbWVzTGlzdENvbXBvbmVudCBnZXRHYW1lcyBcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5kaXIoZ2FtZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZXMgPSBnYW1lcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdhbWVzTGlzdENvbXBvbmVudCBnZXRHYW1lcyBlcnJvciBcIiArIGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR2FtZXNMaXN0Q29tcG9uZW50IHVwZGF0ZUZpbGUgZXJyb3IgXCIgKyBlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdhbWVzTGlzdENvbXBvbmVudCByZXF1ZXN0TG9hZEZpbGUgZXJyb3IgXCIgKyBlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxufVxuIl19