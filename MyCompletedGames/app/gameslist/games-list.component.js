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
        this.filter = {
            console: "",
            who: ""
        };
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
                    _this.getGames();
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
        this.gamesFileService.findGamesByName(searchValue, this.filter).subscribe(function (games) {
            _this.games = games;
        }, function (error) {
            console.log("GamesListComponent getGames error " + error);
        });
    };
    GamesListComponent.prototype.onShowConsoleChooser = function (event) {
        this.isShowConsoleChooser = !this.isShowConsoleChooser;
        if (!this.isShowConsoleChooser) {
            this.getGames();
        }
    };
    GamesListComponent.prototype.onShowWhoChooser = function (event) {
        this.isShowWhoChooser = !this.isShowWhoChooser;
        if (!this.isShowWhoChooser) {
            this.getGames();
        }
    };
    GamesListComponent.prototype.onClearFilter = function (event) {
        this.filter = {
            console: "",
            who: ""
        };
        this.getGames();
    };
    GamesListComponent.prototype.onChooseConsole = function (index) {
        this.chosenConsoleIndex = index;
        if (Number.isNaN(index)) {
            this.filter.console = Constants_1.VIDEO_GAME_CONSOLES[0];
        }
        else {
            this.filter.console = Constants_1.VIDEO_GAME_CONSOLES[index];
        }
    };
    GamesListComponent.prototype.onChooseWho = function (index) {
        this.chosenWhoIndex = index;
        if (Number.isNaN(index)) {
            this.filter.who = Constants_1.WHO[0];
        }
        else {
            this.filter.who = Constants_1.WHO[index];
        }
    };
    GamesListComponent.prototype.onCreateNewGame = function () {
    };
    GamesListComponent.prototype.getGames = function () {
        var _this = this;
        this.gamesFileService.getGames(this.filter).subscribe(function (games) {
            console.log("GamesListComponent getGames ");
            console.dir(games);
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
        __metadata("design:paramtypes", [GoogleAuthService_1.GoogleAuthService,
            GoogleFileSyncService_1.GoogleFileSyncService,
            GamesFileService_1.GamesFileService])
    ], GamesListComponent);
    return GamesListComponent;
}());
exports.GamesListComponent = GamesListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZXMtbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnYW1lcy1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFnRDtBQUloRCxpRUFBOEQ7QUFDOUQsaURBQStDO0FBQy9DLG1FQUFnRTtBQUNoRSwyRUFBd0U7QUFDeEUsaURBQTZEO0FBUzdEO0lBa0JJLDRCQUFvQixpQkFBb0MsRUFDcEMscUJBQTRDLEVBQzVDLGdCQUFrQztRQUZsQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBdUI7UUFDNUMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQWhCL0MsYUFBUSxHQUFrQiwrQkFBbUIsQ0FBQztRQUU5QyxRQUFHLEdBQWtCLGVBQUcsQ0FBQztRQUV6QixVQUFLLEdBQWdCLEVBQUUsQ0FBQztRQWEzQixJQUFJLENBQUMsTUFBTSxHQUFHO1lBQ1YsT0FBTyxFQUFFLEVBQUU7WUFDWCxHQUFHLEVBQUUsRUFBRTtTQUNWLENBQUM7UUFDRixJQUFJLENBQUMsS0FBSyxHQUFHLHNCQUFVLENBQUMsS0FBSyxDQUFDO1FBQzlCLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxLQUFLLENBQUM7UUFDbEMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztJQUNsQyxDQUFDO0lBRUQscUNBQVEsR0FBUjtRQUFBLGlCQXVCQztRQXJCRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFLENBQUMsU0FBUyxDQUN2QyxVQUFDLE1BQU07WUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixHQUFHLE1BQU0sQ0FBQyxDQUFDO1lBQy9DLEtBQUksQ0FBQyxxQkFBcUIsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUMsU0FBUyxDQUN4RCxVQUFDLE1BQU07Z0JBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FB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QUM7UUFFakMsQ0FBQztJQUNMLENBQUM7SUFFRCw0Q0FBZSxHQUFmO0lBRUEsQ0FBQztJQUVPLHFDQUFRLEdBQWhCO1FBQUEsaUJBV0M7UUFWRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQ2pELFVBQUMsS0FBSztZQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsOEJBQThCLENBQUMsQ0FBQztZQUM1QyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25CLEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLENBQUMsRUFDRCxVQUFDLEtBQUs7WUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLG9DQUFvQyxHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQzlELENBQUMsQ0FDSixDQUFBO0lBQ0wsQ0FBQztJQTdIUSxrQkFBa0I7UUFOOUIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsNkJBQTZCO1lBQzFDLFNBQVMsRUFBRSxDQUFDLGtCQUFrQixDQUFDO1NBQ2xDLENBQUM7eUNBbUJ5QyxxQ0FBaUI7WUFDYiw2Q0FBcUI7WUFDMUIsbUNBQWdCO09BcEI3QyxrQkFBa0IsQ0E4SDlCO0lBQUQseUJBQUM7Q0FBQSxBQTlIRCxJQThIQztBQTlIWSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgT25Jbml0fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQge1NlYXJjaEJhcn0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvc2VhcmNoLWJhclwiO1xyXG5cclxuaW1wb3J0IHtHYW1lfSBmcm9tIFwiLi4vY29tbW9uL0dhbWVcIjtcclxuaW1wb3J0IHtHYW1lc0ZpbGVTZXJ2aWNlfSBmcm9tIFwiLi4vc2VydmljZXMvR2FtZXNGaWxlU2VydmljZVwiO1xyXG5pbXBvcnQge01PQ0tfR0FNRVN9IGZyb20gXCIuLi9jb21tb24vTW9ja0dhbWVzXCI7XHJcbmltcG9ydCB7R29vZ2xlQXV0aFNlcnZpY2V9IGZyb20gXCIuLi9zZXJ2aWNlcy9Hb29nbGVBdXRoU2VydmljZVwiO1xyXG5pbXBvcnQge0dvb2dsZUZpbGVTeW5jU2VydmljZX0gZnJvbSBcIi4uL3NlcnZpY2VzL0dvb2dsZUZpbGVTeW5jU2VydmljZVwiO1xyXG5pbXBvcnQge1ZJREVPX0dBTUVfQ09OU09MRVMsIFdIT30gZnJvbSBcIi4uL2NvbW1vbi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHtGaWx0ZXJ9IGZyb20gXCIuLi9jb21tb24vRmlsdGVyXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcImdhbWVzLWxpc3RcIixcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2dhbWVzLWxpc3QuY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogWycuL2dhbWVzLWxpc3QuY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIEdhbWVzTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gICAgcHJpdmF0ZSBmaWx0ZXI6IEZpbHRlcjtcclxuXHJcbiAgICBwdWJsaWMgY29uc29sZXM6IEFycmF5PFN0cmluZz4gPSBWSURFT19HQU1FX0NPTlNPTEVTO1xyXG5cclxuICAgIHB1YmxpYyB3aG86IEFycmF5PFN0cmluZz4gPSBXSE87XHJcblxyXG4gICAgcHVibGljIGdhbWVzOiBBcnJheTxHYW1lPiA9IFtdO1xyXG5cclxuICAgIHB1YmxpYyBpc1Nob3dDb25zb2xlQ2hvb3NlcjogYm9vbGVhbjtcclxuXHJcbiAgICBwdWJsaWMgaXNTaG93V2hvQ2hvb3NlcjogYm9vbGVhbjtcclxuXHJcbiAgICBwdWJsaWMgY2hvc2VuQ29uc29sZUluZGV4OiBudW1iZXI7XHJcblxyXG4gICAgcHVibGljIGNob3Nlbldob0luZGV4OiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBnb29nbGVBdXRoU2VydmljZTogR29vZ2xlQXV0aFNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGdvb2dsZUZpbGVTeW5jU2VydmljZTogR29vZ2xlRmlsZVN5bmNTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBnYW1lc0ZpbGVTZXJ2aWNlOiBHYW1lc0ZpbGVTZXJ2aWNlKSB7XHJcbiAgICAgICAgdGhpcy5maWx0ZXIgPSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGU6IFwiXCIsXHJcbiAgICAgICAgICAgIHdobzogXCJcIlxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5nYW1lcyA9IE1PQ0tfR0FNRVMuZ2FtZXM7XHJcbiAgICAgICAgdGhpcy5pc1Nob3dDb25zb2xlQ2hvb3NlciA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNTaG93V2hvQ2hvb3NlciA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG5cclxuICAgICAgICB0aGlzLmdvb2dsZUF1dGhTZXJ2aWNlLmdldFRva2VuKCkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJlc3VsdCByZXF1ZXN0IHRva2VuOiBcIiArIHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdvb2dsZUZpbGVTeW5jU2VydmljZS5yZXF1ZXN0TG9hZEZpbGUocmVzdWx0KS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgICAgICAgICAgKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRpcihyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVzRmlsZVNlcnZpY2UudXBkYXRlRmlsZShyZXN1bHQpLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldEdhbWVzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJHYW1lc0xpc3RDb21wb25lbnQgdXBkYXRlRmlsZSBlcnJvciBcIiArIGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdhbWVzTGlzdENvbXBvbmVudCByZXF1ZXN0TG9hZEZpbGUgZXJyb3IgXCIgKyBlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBvblRleHRDaGFuZ2VkKGFyZ3MpIHtcclxuXHJcbiAgICAgICAgbGV0IHNlYXJjaEJhciA9IDxTZWFyY2hCYXI+YXJncy5vYmplY3Q7XHJcbiAgICAgICAgbGV0IHNlYXJjaFZhbHVlID0gc2VhcmNoQmFyLnRleHQ7XHJcbiAgICAgICAgdGhpcy5nYW1lc0ZpbGVTZXJ2aWNlLmZpbmRHYW1lc0J5TmFtZShzZWFyY2hWYWx1ZSwgdGhpcy5maWx0ZXIpLnN1YnNjcmliZShcclxuICAgICAgICAgICAgKGdhbWVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVzID0gZ2FtZXM7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJHYW1lc0xpc3RDb21wb25lbnQgZ2V0R2FtZXMgZXJyb3IgXCIgKyBlcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgb25TaG93Q29uc29sZUNob29zZXIoZXZlbnQpIHtcclxuICAgICAgICB0aGlzLmlzU2hvd0NvbnNvbGVDaG9vc2VyID0gIXRoaXMuaXNTaG93Q29uc29sZUNob29zZXI7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzU2hvd0NvbnNvbGVDaG9vc2VyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0R2FtZXMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25TaG93V2hvQ2hvb3NlcihldmVudCkge1xyXG4gICAgICAgIHRoaXMuaXNTaG93V2hvQ2hvb3NlciA9ICF0aGlzLmlzU2hvd1dob0Nob29zZXI7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzU2hvd1dob0Nob29zZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5nZXRHYW1lcygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkNsZWFyRmlsdGVyKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5maWx0ZXIgPSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGU6IFwiXCIsXHJcbiAgICAgICAgICAgIHdobzogXCJcIlxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5nZXRHYW1lcygpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ2hvb3NlQ29uc29sZShpbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5jaG9zZW5Db25zb2xlSW5kZXggPSBpbmRleDtcclxuICAgICAgICBpZiAoTnVtYmVyLmlzTmFOKGluZGV4KSkge1xyXG4gICAgICAgICAgICB0aGlzLmZpbHRlci5jb25zb2xlID0gVklERU9fR0FNRV9DT05TT0xFU1swXTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmZpbHRlci5jb25zb2xlID0gVklERU9fR0FNRV9DT05TT0xFU1tpbmRleF07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uQ2hvb3NlV2hvKGluZGV4KSB7XHJcbiAgICAgICAgdGhpcy5jaG9zZW5XaG9JbmRleCA9IGluZGV4O1xyXG4gICAgICAgIGlmIChOdW1iZXIuaXNOYU4oaW5kZXgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyLndobyA9IFdIT1swXTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmZpbHRlci53aG8gPSBXSE9baW5kZXhdO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25DcmVhdGVOZXdHYW1lKCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEdhbWVzKCkge1xyXG4gICAgICAgIHRoaXMuZ2FtZXNGaWxlU2VydmljZS5nZXRHYW1lcyh0aGlzLmZpbHRlcikuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAoZ2FtZXMpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR2FtZXNMaXN0Q29tcG9uZW50IGdldEdhbWVzIFwiKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKGdhbWVzKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZXMgPSBnYW1lcztcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdhbWVzTGlzdENvbXBvbmVudCBnZXRHYW1lcyBlcnJvciBcIiArIGVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG4iXX0=