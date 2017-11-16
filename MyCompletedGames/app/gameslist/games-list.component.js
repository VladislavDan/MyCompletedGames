"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
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
        this.isShowConsoleChooser = false;
        this.isShowWhoChooser = false;
    }
    GamesListComponent.prototype.ngOnInit = function () {
        var _this = this;
        // this.googleAuthService.getToken()
        Observable_1.Observable.of("").subscribe(function (result) {
            console.log("Result request token: " + result);
            _this.googleFileSyncService.requestLoadFile(result)
                .switchMap(function (result) {
                //TODO please will replace mock data
                console.log("Result request token: " + result);
                return _this.gamesFileService.updateFile(MockGames_1.MOCK_GAMES);
            })
                .subscribe(function (result) {
                console.dir(result);
                _this.getGames();
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
    GamesListComponent.prototype.onChooseWhere = function (index) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZXMtbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnYW1lcy1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFnRDtBQUVoRCw4Q0FBMkM7QUFHM0MsaUVBQThEO0FBQzlELGlEQUErQztBQUMvQyxtRUFBZ0U7QUFDaEUsMkVBQXdFO0FBQ3hFLGlEQUE2RDtBQVM3RDtJQWtCSSw0QkFBb0IsaUJBQW9DLEVBQ3BDLHFCQUE0QyxFQUM1QyxnQkFBa0M7UUFGbEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQywwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO1FBQzVDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFoQi9DLGFBQVEsR0FBa0IsK0JBQW1CLENBQUM7UUFFOUMsUUFBRyxHQUFrQixlQUFHLENBQUM7UUFFekIsVUFBSyxHQUFnQixFQUFFLENBQUM7UUFhM0IsSUFBSSxDQUFDLE1BQU0sR0FBRztZQUNWLE9BQU8sRUFBRSxFQUFFO1lBQ1gsR0FBRyxFQUFFLEVBQUU7U0FDVixDQUFDO1FBQ0YsSUFBSSxDQUFDLG9CQUFvQixHQUFHLEtBQUssQ0FBQztRQUNsQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO0lBQ2xDLENBQUM7SUFFRCxxQ0FBUSxHQUFSO1FBQUEsaUJBdUJDO1FBckJHLG9DQUFvQztRQUNwQyx1QkFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQ3ZCLFVBQUMsTUFBTTtZQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLEdBQUcsTUFBTSxDQUFDLENBQUM7WUFDL0MsS0FBSSxDQUFDLHFCQUFxQixDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUM7aUJBQzdDLFNBQVMsQ0FBQyxVQUFDLE1BQU07Z0JBQ2Qsb0NBQW9DO2dCQUNwQyxPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixHQUFHLE1BQU0sQ0FB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O0lBQ0wsQ0FBQztJQUVPLHFDQUFRLEdBQWhCO1FBQUEsaUJBV0M7UUFWRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQ2pELFVBQUMsS0FBSztZQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsOEJBQThCLENBQUMsQ0FBQztZQUM1QyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25CLEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLENBQUMsRUFDRCxVQUFDLEtBQUs7WUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLG9DQUFvQyxHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQzlELENBQUMsQ0FDSixDQUFBO0lBQ0wsQ0FBQztJQXhIUSxrQkFBa0I7UUFOOUIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsNkJBQTZCO1lBQzFDLFNBQVMsRUFBRSxDQUFDLGtCQUFrQixDQUFDO1NBQ2xDLENBQUM7eUNBbUJ5QyxxQ0FBaUI7WUFDYiw2Q0FBcUI7WUFDMUIsbUNBQWdCO09BcEI3QyxrQkFBa0IsQ0F5SDlCO0lBQUQseUJBQUM7Q0FBQSxBQXpIRCxJQXlIQztBQXpIWSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgT25Jbml0fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtTZWFyY2hCYXJ9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3NlYXJjaC1iYXJcIjtcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSBcInJ4anMvT2JzZXJ2YWJsZVwiO1xuXG5pbXBvcnQge0dhbWV9IGZyb20gXCIuLi9jb21tb24vR2FtZVwiO1xuaW1wb3J0IHtHYW1lc0ZpbGVTZXJ2aWNlfSBmcm9tIFwiLi4vc2VydmljZXMvR2FtZXNGaWxlU2VydmljZVwiO1xuaW1wb3J0IHtNT0NLX0dBTUVTfSBmcm9tIFwiLi4vY29tbW9uL01vY2tHYW1lc1wiO1xuaW1wb3J0IHtHb29nbGVBdXRoU2VydmljZX0gZnJvbSBcIi4uL3NlcnZpY2VzL0dvb2dsZUF1dGhTZXJ2aWNlXCI7XG5pbXBvcnQge0dvb2dsZUZpbGVTeW5jU2VydmljZX0gZnJvbSBcIi4uL3NlcnZpY2VzL0dvb2dsZUZpbGVTeW5jU2VydmljZVwiO1xuaW1wb3J0IHtWSURFT19HQU1FX0NPTlNPTEVTLCBXSE99IGZyb20gXCIuLi9jb21tb24vQ29uc3RhbnRzXCI7XG5pbXBvcnQge0ZpbHRlcn0gZnJvbSBcIi4uL2NvbW1vbi9GaWx0ZXJcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiZ2FtZXMtbGlzdFwiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9nYW1lcy1saXN0LmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbJy4vZ2FtZXMtbGlzdC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBHYW1lc0xpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgcHJpdmF0ZSBmaWx0ZXI6IEZpbHRlcjtcblxuICAgIHB1YmxpYyBjb25zb2xlczogQXJyYXk8U3RyaW5nPiA9IFZJREVPX0dBTUVfQ09OU09MRVM7XG5cbiAgICBwdWJsaWMgd2hvOiBBcnJheTxTdHJpbmc+ID0gV0hPO1xuXG4gICAgcHVibGljIGdhbWVzOiBBcnJheTxHYW1lPiA9IFtdO1xuXG4gICAgcHVibGljIGlzU2hvd0NvbnNvbGVDaG9vc2VyOiBib29sZWFuO1xuXG4gICAgcHVibGljIGlzU2hvd1dob0Nob29zZXI6IGJvb2xlYW47XG5cbiAgICBwdWJsaWMgY2hvc2VuQ29uc29sZUluZGV4OiBudW1iZXI7XG5cbiAgICBwdWJsaWMgY2hvc2VuV2hvSW5kZXg6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZ29vZ2xlQXV0aFNlcnZpY2U6IEdvb2dsZUF1dGhTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgZ29vZ2xlRmlsZVN5bmNTZXJ2aWNlOiBHb29nbGVGaWxlU3luY1NlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBnYW1lc0ZpbGVTZXJ2aWNlOiBHYW1lc0ZpbGVTZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMuZmlsdGVyID0ge1xuICAgICAgICAgICAgY29uc29sZTogXCJcIixcbiAgICAgICAgICAgIHdobzogXCJcIlxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmlzU2hvd0NvbnNvbGVDaG9vc2VyID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNTaG93V2hvQ2hvb3NlciA9IGZhbHNlO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuXG4gICAgICAgIC8vIHRoaXMuZ29vZ2xlQXV0aFNlcnZpY2UuZ2V0VG9rZW4oKVxuICAgICAgICBPYnNlcnZhYmxlLm9mKFwiXCIpLnN1YnNjcmliZShcbiAgICAgICAgICAgIChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJlc3VsdCByZXF1ZXN0IHRva2VuOiBcIiArIHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgdGhpcy5nb29nbGVGaWxlU3luY1NlcnZpY2UucmVxdWVzdExvYWRGaWxlKHJlc3VsdClcbiAgICAgICAgICAgICAgICAgICAgLnN3aXRjaE1hcCgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL1RPRE8gcGxlYXNlIHdpbGwgcmVwbGFjZSBtb2NrIGRhdGFcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUmVzdWx0IHJlcXVlc3QgdG9rZW46IFwiICsgcmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdhbWVzRmlsZVNlcnZpY2UudXBkYXRlRmlsZShNT0NLX0dBTUVTKVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRHYW1lcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR2FtZXNMaXN0Q29tcG9uZW50IHJlcXVlc3RMb2FkRmlsZSBlcnJvciBcIiArIGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIG9uVGV4dENoYW5nZWQoYXJncykge1xuXG4gICAgICAgIGxldCBzZWFyY2hCYXIgPSA8U2VhcmNoQmFyPmFyZ3Mub2JqZWN0O1xuICAgICAgICBsZXQgc2VhcmNoVmFsdWUgPSBzZWFyY2hCYXIudGV4dDtcbiAgICAgICAgdGhpcy5nYW1lc0ZpbGVTZXJ2aWNlLmZpbmRHYW1lc0J5TmFtZShzZWFyY2hWYWx1ZSwgdGhpcy5maWx0ZXIpLnN1YnNjcmliZShcbiAgICAgICAgICAgIChnYW1lcykgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZXMgPSBnYW1lcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdhbWVzTGlzdENvbXBvbmVudCBnZXRHYW1lcyBlcnJvciBcIiArIGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgIH1cblxuICAgIG9uU2hvd0NvbnNvbGVDaG9vc2VyKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuaXNTaG93Q29uc29sZUNob29zZXIgPSAhdGhpcy5pc1Nob3dDb25zb2xlQ2hvb3NlcjtcbiAgICAgICAgaWYgKCF0aGlzLmlzU2hvd0NvbnNvbGVDaG9vc2VyKSB7XG4gICAgICAgICAgICB0aGlzLmdldEdhbWVzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblNob3dXaG9DaG9vc2VyKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuaXNTaG93V2hvQ2hvb3NlciA9ICF0aGlzLmlzU2hvd1dob0Nob29zZXI7XG4gICAgICAgIGlmICghdGhpcy5pc1Nob3dXaG9DaG9vc2VyKSB7XG4gICAgICAgICAgICB0aGlzLmdldEdhbWVzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkNsZWFyRmlsdGVyKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZmlsdGVyID0ge1xuICAgICAgICAgICAgY29uc29sZTogXCJcIixcbiAgICAgICAgICAgIHdobzogXCJcIlxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmdldEdhbWVzKCk7XG4gICAgfVxuXG4gICAgb25DaG9vc2VXaGVyZShpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuY2hvc2VuQ29uc29sZUluZGV4ID0gaW5kZXg7XG4gICAgICAgIGlmIChOdW1iZXIuaXNOYU4oaW5kZXgpKSB7XG4gICAgICAgICAgICB0aGlzLmZpbHRlci5jb25zb2xlID0gVklERU9fR0FNRV9DT05TT0xFU1swXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyLmNvbnNvbGUgPSBWSURFT19HQU1FX0NPTlNPTEVTW2luZGV4XTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQ2hvb3NlV2hvKGluZGV4KSB7XG4gICAgICAgIHRoaXMuY2hvc2VuV2hvSW5kZXggPSBpbmRleDtcbiAgICAgICAgaWYgKE51bWJlci5pc05hTihpbmRleCkpIHtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyLndobyA9IFdIT1swXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyLndobyA9IFdIT1tpbmRleF07XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0R2FtZXMoKSB7XG4gICAgICAgIHRoaXMuZ2FtZXNGaWxlU2VydmljZS5nZXRHYW1lcyh0aGlzLmZpbHRlcikuc3Vic2NyaWJlKFxuICAgICAgICAgICAgKGdhbWVzKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJHYW1lc0xpc3RDb21wb25lbnQgZ2V0R2FtZXMgXCIpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKGdhbWVzKTtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVzID0gZ2FtZXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJHYW1lc0xpc3RDb21wb25lbnQgZ2V0R2FtZXMgZXJyb3IgXCIgKyBlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIClcbiAgICB9XG59XG4iXX0=