"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var GamesFileService_1 = require("../services/GamesFileService");
var MockGames_1 = require("../common/MockGames");
var GoogleAuthService_1 = require("../services/GoogleAuthService");
var GoogleFileSyncService_1 = require("../services/GoogleFileSyncService");
var Constants_1 = require("../common/Constants");
var GamesListComponent = /** @class */ (function () {
    function GamesListComponent(googleAuthService, googleFileSyncService, gamesFileService) {
        this.googleAuthService = googleAuthService;
        this.googleFileSyncService = googleFileSyncService;
        this.gamesFileService = gamesFileService;
        this.consoles = Constants_1.VIDEO_GAME_CONSOLES;
        this.who = Constants_1.WHO;
        this.games = [];
        this.chosenConsoleIndex = 0;
        this.chosenWhoIndex = 0;
        this.games = MockGames_1.MOCK_GAMES.games;
        this.isShowConsoleChooser = false;
        this.isShowWhoChooser = false;
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
    GamesListComponent.prototype.onShowConsoleChooser = function (event) {
        this.isShowConsoleChooser = !this.isShowConsoleChooser;
    };
    GamesListComponent.prototype.onShowWhoChooser = function (event) {
        this.isShowWhoChooser = !this.isShowWhoChooser;
    };
    GamesListComponent.prototype.onChooseConsole = function (index) {
        this.chosenConsoleIndex = index;
        console.log("console chosen");
    };
    GamesListComponent.prototype.onChooseWho = function (index) {
        this.chosenWhoIndex = index;
        console.log("who chosen");
    };
    GamesListComponent = __decorate([
        core_1.Component({
            selector: "games-list",
            moduleId: module.id,
            templateUrl: "./games-list.component.html",
            styleUrls: ['./games-list.css']
        }),
        __metadata("design:paramtypes", [GoogleAuthService_1.GoogleAuthService,
            GoogleFileSyncService_1.GoogleFileSyncService,
            GamesFileService_1.GamesFileService])
    ], GamesListComponent);
    return GamesListComponent;
}());
exports.GamesListComponent = GamesListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZXMtbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnYW1lcy1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFnRDtBQUloRCxpRUFBOEQ7QUFDOUQsaURBQStDO0FBQy9DLG1FQUFnRTtBQUNoRSwyRUFBd0U7QUFDeEUsaURBQTZEO0FBUTdEO0lBZ0JJLDRCQUFvQixpQkFBb0MsRUFDcEMscUJBQTRDLEVBQzVDLGdCQUFrQztRQUZsQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBdUI7UUFDNUMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQWhCL0MsYUFBUSxHQUFrQiwrQkFBbUIsQ0FBQztRQUU5QyxRQUFHLEdBQWtCLGVBQUcsQ0FBQztRQUV6QixVQUFLLEdBQWdCLEVBQUUsQ0FBQztRQU14Qix1QkFBa0IsR0FBVyxDQUFDLENBQUM7UUFFL0IsbUJBQWMsR0FBVyxDQUFDLENBQUM7UUFNOUIsSUFBSSxDQUFDLEtBQUssR0FBRyxzQkFBVSxDQUFDLEtBQUssQ0FBQztRQUM5QixJQUFJLENBQUMsb0JBQW9CLEdBQUcsS0FBSyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7SUFDbEMsQ0FBQztJQUVELHFDQUFRLEdBQVI7UUFBQSxpQkFnQ0M7UUE5QkcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxDQUFDLFNBQVMsQ0FDdkMsVUFBQyxNQUFNO1lBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsR0FBRyxNQUFNLENBQUMsQ0FBQztZQUMvQyxLQUFJLENBQUMscUJBQXFCLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFNBQVMsQ0FDeEQsVUFBQyxNQUFNO2dCQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3BCLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsU0FBUyxDQUM5QztvQkFDSSxLQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLENBQUMsU0FBUyxDQUN0QyxVQUFDLEtBQUs7d0JBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO3dCQUM1QyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUNuQixLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztvQkFDdkIsQ0FBQyxFQUNELFVBQUMsS0FBSzt3QkFDRixPQUFPLENBQUMsR0FBRyxDQUFDLG9DQUFvQyxHQUFHLEtBQUssQ0FBQyxDQUFDO29CQUM5RCxDQUFDLENBQ0osQ0FBQTtnQkFDTCxDQUFDLEVBQ0QsVUFBQyxLQUFLO29CQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0NBQXNDLEdBQUcsS0FBSyxDQUFDLENBQUM7Z0JBQ2hFLENBQUMsQ0FDSixDQUFDO1lBQ04sQ0FBQyxFQUNELFVBQUMsS0FBSztnQkFDRixPQUFPLENBQUMsR0FBRyxDQUFDLDJDQUEyQyxHQUFHLEtBQUssQ0FBQyxDQUFDO1lBQ3JFLENBQUMsQ0FDSixDQUFBO1FBQ0wsQ0FBQyxDQUNKLENBQUM7SUFDTixDQUFDO0lBRUQsMENBQWEsR0FBYixVQUFjLElBQUk7UUFBbEIsaUJBWUM7UUFWRyxJQUFJLFNBQVMsR0FBYyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3ZDLElBQUksV0FBVyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUM7UUFDakMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxTQUFTLENBQ3hELFVBQUMsS0FBSztZQUNGLEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLENBQUMsRUFDRCxVQUFDLEtBQUs7WUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLG9DQUFvQyxHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQzlELENBQUMsQ0FDSixDQUFBO0lBQ0wsQ0FBQztJQUVELGlEQUFvQixHQUFwQixVQUFxQixLQUFLO1FBQ3RCLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQztJQUMzRCxDQUFDO0lBRUQsNkNBQWdCLEdBQWhCLFVBQWlCLEtBQUs7UUFDbEIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDO0lBQ25ELENBQUM7SUFFRCw0Q0FBZSxHQUFmLFVBQWdCLEtBQUs7UUFDakIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQztRQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUE7SUFDakMsQ0FBQztJQUVELHdDQUFXLEdBQVgsVUFBWSxLQUFLO1FBQ2IsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7UUFDNUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUM3QixDQUFDO0lBekZRLGtCQUFrQjtRQU45QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFlBQVk7WUFDdEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSw2QkFBNkI7WUFDMUMsU0FBUyxFQUFFLENBQUMsa0JBQWtCLENBQUM7U0FDbEMsQ0FBQzt5Q0FpQnlDLHFDQUFpQjtZQUNiLDZDQUFxQjtZQUMxQixtQ0FBZ0I7T0FsQjdDLGtCQUFrQixDQTBGOUI7SUFBRCx5QkFBQztDQUFBLEFBMUZELElBMEZDO0FBMUZZLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBPbkluaXR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7U2VhcmNoQmFyfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9zZWFyY2gtYmFyXCI7XHJcblxyXG5pbXBvcnQge0dhbWV9IGZyb20gXCIuLi9jb21tb24vR2FtZVwiO1xyXG5pbXBvcnQge0dhbWVzRmlsZVNlcnZpY2V9IGZyb20gXCIuLi9zZXJ2aWNlcy9HYW1lc0ZpbGVTZXJ2aWNlXCI7XHJcbmltcG9ydCB7TU9DS19HQU1FU30gZnJvbSBcIi4uL2NvbW1vbi9Nb2NrR2FtZXNcIjtcclxuaW1wb3J0IHtHb29nbGVBdXRoU2VydmljZX0gZnJvbSBcIi4uL3NlcnZpY2VzL0dvb2dsZUF1dGhTZXJ2aWNlXCI7XHJcbmltcG9ydCB7R29vZ2xlRmlsZVN5bmNTZXJ2aWNlfSBmcm9tIFwiLi4vc2VydmljZXMvR29vZ2xlRmlsZVN5bmNTZXJ2aWNlXCI7XHJcbmltcG9ydCB7VklERU9fR0FNRV9DT05TT0xFUywgV0hPfSBmcm9tIFwiLi4vY29tbW9uL0NvbnN0YW50c1wiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJnYW1lcy1saXN0XCIsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9nYW1lcy1saXN0LmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9nYW1lcy1saXN0LmNzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBHYW1lc0xpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICAgIHB1YmxpYyBjb25zb2xlczogQXJyYXk8U3RyaW5nPiA9IFZJREVPX0dBTUVfQ09OU09MRVM7XHJcblxyXG4gICAgcHVibGljIHdobzogQXJyYXk8U3RyaW5nPiA9IFdITztcclxuXHJcbiAgICBwdWJsaWMgZ2FtZXM6IEFycmF5PEdhbWU+ID0gW107XHJcblxyXG4gICAgcHVibGljIGlzU2hvd0NvbnNvbGVDaG9vc2VyOiBib29sZWFuO1xyXG5cclxuICAgIHB1YmxpYyBpc1Nob3dXaG9DaG9vc2VyOiBib29sZWFuO1xyXG5cclxuICAgIHB1YmxpYyBjaG9zZW5Db25zb2xlSW5kZXg6IG51bWJlciA9IDA7XHJcblxyXG4gICAgcHVibGljIGNob3Nlbldob0luZGV4OiBudW1iZXIgPSAwO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZ29vZ2xlQXV0aFNlcnZpY2U6IEdvb2dsZUF1dGhTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBnb29nbGVGaWxlU3luY1NlcnZpY2U6IEdvb2dsZUZpbGVTeW5jU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgZ2FtZXNGaWxlU2VydmljZTogR2FtZXNGaWxlU2VydmljZSkge1xyXG5cclxuICAgICAgICB0aGlzLmdhbWVzID0gTU9DS19HQU1FUy5nYW1lcztcclxuICAgICAgICB0aGlzLmlzU2hvd0NvbnNvbGVDaG9vc2VyID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc1Nob3dXaG9DaG9vc2VyID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcblxyXG4gICAgICAgIHRoaXMuZ29vZ2xlQXV0aFNlcnZpY2UuZ2V0VG9rZW4oKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUmVzdWx0IHJlcXVlc3QgdG9rZW46IFwiICsgcmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ29vZ2xlRmlsZVN5bmNTZXJ2aWNlLnJlcXVlc3RMb2FkRmlsZShyZXN1bHQpLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAgICAgICAocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZXNGaWxlU2VydmljZS51cGRhdGVGaWxlKHJlc3VsdCkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZXNGaWxlU2VydmljZS5nZXRHYW1lcygpLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGdhbWVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdhbWVzTGlzdENvbXBvbmVudCBnZXRHYW1lcyBcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRpcihnYW1lcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVzID0gZ2FtZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJHYW1lc0xpc3RDb21wb25lbnQgZ2V0R2FtZXMgZXJyb3IgXCIgKyBlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJHYW1lc0xpc3RDb21wb25lbnQgdXBkYXRlRmlsZSBlcnJvciBcIiArIGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdhbWVzTGlzdENvbXBvbmVudCByZXF1ZXN0TG9hZEZpbGUgZXJyb3IgXCIgKyBlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBvblRleHRDaGFuZ2VkKGFyZ3MpIHtcclxuXHJcbiAgICAgICAgbGV0IHNlYXJjaEJhciA9IDxTZWFyY2hCYXI+YXJncy5vYmplY3Q7XHJcbiAgICAgICAgbGV0IHNlYXJjaFZhbHVlID0gc2VhcmNoQmFyLnRleHQ7XHJcbiAgICAgICAgdGhpcy5nYW1lc0ZpbGVTZXJ2aWNlLmZpbmRHYW1lc0J5TmFtZShzZWFyY2hWYWx1ZSkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAoZ2FtZXMpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZXMgPSBnYW1lcztcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdhbWVzTGlzdENvbXBvbmVudCBnZXRHYW1lcyBlcnJvciBcIiArIGVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuICAgIH1cclxuXHJcbiAgICBvblNob3dDb25zb2xlQ2hvb3NlcihldmVudCkge1xyXG4gICAgICAgIHRoaXMuaXNTaG93Q29uc29sZUNob29zZXIgPSAhdGhpcy5pc1Nob3dDb25zb2xlQ2hvb3NlcjtcclxuICAgIH1cclxuXHJcbiAgICBvblNob3dXaG9DaG9vc2VyKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5pc1Nob3dXaG9DaG9vc2VyID0gIXRoaXMuaXNTaG93V2hvQ2hvb3NlcjtcclxuICAgIH1cclxuXHJcbiAgICBvbkNob29zZUNvbnNvbGUoaW5kZXgpIHtcclxuICAgICAgICB0aGlzLmNob3NlbkNvbnNvbGVJbmRleCA9IGluZGV4O1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiY29uc29sZSBjaG9zZW5cIilcclxuICAgIH1cclxuXHJcbiAgICBvbkNob29zZVdobyhpbmRleCkge1xyXG4gICAgICAgIHRoaXMuY2hvc2VuV2hvSW5kZXggPSBpbmRleDtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIndobyBjaG9zZW5cIilcclxuICAgIH1cclxufVxyXG4iXX0=