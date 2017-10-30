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
                    _this.gamesFileService.getGames(_this.filter).subscribe(function (games) {
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
        this.gamesFileService.findGamesByName(searchValue, this.filter).subscribe(function (games) {
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
    GamesListComponent.prototype.onClearFilter = function (event) {
        this.filter = {
            console: "",
            who: ""
        };
    };
    GamesListComponent.prototype.onChooseConsole = function (index) {
        if (Number.isNaN(index)) {
            this.filter.console = Constants_1.VIDEO_GAME_CONSOLES[0];
        }
        else {
            this.filter.console = Constants_1.VIDEO_GAME_CONSOLES[index];
        }
    };
    GamesListComponent.prototype.onChooseWho = function (index) {
        if (Number.isNaN(index)) {
            this.filter.who = Constants_1.WHO[0];
        }
        else {
            this.filter.who = Constants_1.WHO[index];
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZXMtbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnYW1lcy1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFnRDtBQUloRCxpRUFBOEQ7QUFDOUQsaURBQStDO0FBQy9DLG1FQUFnRTtBQUNoRSwyRUFBd0U7QUFDeEUsaURBQTZEO0FBUzdEO0lBY0ksNEJBQW9CLGlCQUFvQyxFQUNwQyxxQkFBNEMsRUFDNUMsZ0JBQWtDO1FBRmxDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUF1QjtRQUM1QyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBWi9DLGFBQVEsR0FBa0IsK0JBQW1CLENBQUM7UUFFOUMsUUFBRyxHQUFrQixlQUFHLENBQUM7UUFFekIsVUFBSyxHQUFnQixFQUFFLENBQUM7UUFTM0IsSUFBSSxDQUFDLE1BQU0sR0FBRztZQUNWLE9BQU8sRUFBRSxFQUFFO1lBQ1gsR0FBRyxFQUFFLEVBQUU7U0FDVixDQUFDO1FBQ0YsSUFBSSxDQUFDLEtBQUssR0FBRyxzQkFBVSxDQUFDLEtBQUssQ0FBQztRQUM5QixJQUFJLENBQUMsb0JBQW9CLEdBQUcsS0FBSyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7SUFDbEMsQ0FBQztJQUVELHFDQUFRLEdBQVI7UUFBQSxpQkFnQ0M7UUE5QkcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxDQUFDLFNBQVMsQ0FDdkMsVUFBQyxNQUFNO1lBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsR0FBRyxNQUFNLENBQUMsQ0FBQztZQUMvQyxLQUFJLENBQUMscUJBQXFCLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFNBQVMsQ0FDeEQsVUFBQyxNQUFNO2dCQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3BCLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsU0FBUyxDQUM5QztvQkFDSSxLQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQ2pELFVBQUMsS0FBSzt3QkFDRixPQUFPLENBQUMsR0FBRyxDQUFDLDhCQUE4QixDQUFDLENBQUM7d0JBQzVDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ25CLEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO29CQUN2QixDQUFDLEVBQ0QsVUFBQyxLQUFLO3dCQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0NBQW9DLEdBQUcsS0FBSyxDQUFDLENBQUM7b0JBQzlELENBQUMsQ0FDSixDQUFBO2dCQUNMLENBQUMsRUFDRCxVQUFDLEtBQUs7b0JBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQ0FBc0MsR0FBRyxLQUFLLENBQUMsQ0FBQztnQkFDaEUsQ0FBQyxDQUNKLENBQUM7WUFDTixDQUFDLEVBQ0QsVUFBQyxLQUFLO2dCQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkNBQTJDLEdBQUcsS0FBSyxDQUFDLENBQUM7WUFDckUsQ0FBQyxDQUNKLENBQUE7UUFDTCxDQUFDLENBQ0osQ0FBQztJQUNOLENBQUM7SUFFRCwwQ0FBYSxHQUFiLFVBQWMsSUFBSTtRQUFsQixpQkFZQztRQVZHLElBQUksU0FBUyxHQUFjLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDdkMsSUFBSSxXQUFXLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQztRQUNqQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsU0FBUyxDQUNyRSxVQUFDLEtBQUs7WUFDRixLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUN2QixDQUFDLEVBQ0QsVUFBQyxLQUFLO1lBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQ0FBb0MsR0FBRyxLQUFLLENBQUMsQ0FBQztRQUM5RCxDQUFDLENBQ0osQ0FBQTtJQUNMLENBQUM7SUFFRCxpREFBb0IsR0FBcEIsVUFBcUIsS0FBSztRQUN0QixJQUFJLENBQUMsb0JBQW9CLEdBQUcsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUM7SUFDM0QsQ0FBQztJQUVELDZDQUFnQixHQUFoQixVQUFpQixLQUFLO1FBQ2xCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztJQUNuRCxDQUFDO0lBRUQsMENBQWEsR0FBYixVQUFjLEtBQUs7UUFDZixJQUFJLENBQUMsTUFBTSxHQUFHO1lBQ1YsT0FBTyxFQUFFLEVBQUU7WUFDWCxHQUFHLEVBQUUsRUFBRTtTQUNWLENBQUM7SUFDTixDQUFDO0lBRUQsNENBQWUsR0FBZixVQUFnQixLQUFhO1FBQ3pCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLCtCQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pELENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLCtCQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JELENBQUM7SUFDTCxDQUFDO0lBRUQsd0NBQVcsR0FBWCxVQUFZLEtBQUs7UUFDYixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxlQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0IsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsZUFBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRWpDLENBQUM7SUFDTCxDQUFDO0lBeEdRLGtCQUFrQjtRQU45QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFlBQVk7WUFDdEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSw2QkFBNkI7WUFDMUMsU0FBUyxFQUFFLENBQUMsa0JBQWtCLENBQUM7U0FDbEMsQ0FBQzt5Q0FleUMscUNBQWlCO1lBQ2IsNkNBQXFCO1lBQzFCLG1DQUFnQjtPQWhCN0Msa0JBQWtCLENBeUc5QjtJQUFELHlCQUFDO0NBQUEsQUF6R0QsSUF5R0M7QUF6R1ksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHtTZWFyY2hCYXJ9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3NlYXJjaC1iYXJcIjtcclxuXHJcbmltcG9ydCB7R2FtZX0gZnJvbSBcIi4uL2NvbW1vbi9HYW1lXCI7XHJcbmltcG9ydCB7R2FtZXNGaWxlU2VydmljZX0gZnJvbSBcIi4uL3NlcnZpY2VzL0dhbWVzRmlsZVNlcnZpY2VcIjtcclxuaW1wb3J0IHtNT0NLX0dBTUVTfSBmcm9tIFwiLi4vY29tbW9uL01vY2tHYW1lc1wiO1xyXG5pbXBvcnQge0dvb2dsZUF1dGhTZXJ2aWNlfSBmcm9tIFwiLi4vc2VydmljZXMvR29vZ2xlQXV0aFNlcnZpY2VcIjtcclxuaW1wb3J0IHtHb29nbGVGaWxlU3luY1NlcnZpY2V9IGZyb20gXCIuLi9zZXJ2aWNlcy9Hb29nbGVGaWxlU3luY1NlcnZpY2VcIjtcclxuaW1wb3J0IHtWSURFT19HQU1FX0NPTlNPTEVTLCBXSE99IGZyb20gXCIuLi9jb21tb24vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7RmlsdGVyfSBmcm9tIFwiLi4vY29tbW9uL0ZpbHRlclwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJnYW1lcy1saXN0XCIsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9nYW1lcy1saXN0LmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9nYW1lcy1saXN0LmNzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBHYW1lc0xpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICAgIHByaXZhdGUgZmlsdGVyOiBGaWx0ZXI7XHJcblxyXG4gICAgcHVibGljIGNvbnNvbGVzOiBBcnJheTxTdHJpbmc+ID0gVklERU9fR0FNRV9DT05TT0xFUztcclxuXHJcbiAgICBwdWJsaWMgd2hvOiBBcnJheTxTdHJpbmc+ID0gV0hPO1xyXG5cclxuICAgIHB1YmxpYyBnYW1lczogQXJyYXk8R2FtZT4gPSBbXTtcclxuXHJcbiAgICBwdWJsaWMgaXNTaG93Q29uc29sZUNob29zZXI6IGJvb2xlYW47XHJcblxyXG4gICAgcHVibGljIGlzU2hvd1dob0Nob29zZXI6IGJvb2xlYW47XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBnb29nbGVBdXRoU2VydmljZTogR29vZ2xlQXV0aFNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGdvb2dsZUZpbGVTeW5jU2VydmljZTogR29vZ2xlRmlsZVN5bmNTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBnYW1lc0ZpbGVTZXJ2aWNlOiBHYW1lc0ZpbGVTZXJ2aWNlKSB7XHJcbiAgICAgICAgdGhpcy5maWx0ZXIgPSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGU6IFwiXCIsXHJcbiAgICAgICAgICAgIHdobzogXCJcIlxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5nYW1lcyA9IE1PQ0tfR0FNRVMuZ2FtZXM7XHJcbiAgICAgICAgdGhpcy5pc1Nob3dDb25zb2xlQ2hvb3NlciA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNTaG93V2hvQ2hvb3NlciA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG5cclxuICAgICAgICB0aGlzLmdvb2dsZUF1dGhTZXJ2aWNlLmdldFRva2VuKCkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJlc3VsdCByZXF1ZXN0IHRva2VuOiBcIiArIHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdvb2dsZUZpbGVTeW5jU2VydmljZS5yZXF1ZXN0TG9hZEZpbGUocmVzdWx0KS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgICAgICAgICAgKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRpcihyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVzRmlsZVNlcnZpY2UudXBkYXRlRmlsZShyZXN1bHQpLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVzRmlsZVNlcnZpY2UuZ2V0R2FtZXModGhpcy5maWx0ZXIpLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGdhbWVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdhbWVzTGlzdENvbXBvbmVudCBnZXRHYW1lcyBcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRpcihnYW1lcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVzID0gZ2FtZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJHYW1lc0xpc3RDb21wb25lbnQgZ2V0R2FtZXMgZXJyb3IgXCIgKyBlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJHYW1lc0xpc3RDb21wb25lbnQgdXBkYXRlRmlsZSBlcnJvciBcIiArIGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdhbWVzTGlzdENvbXBvbmVudCByZXF1ZXN0TG9hZEZpbGUgZXJyb3IgXCIgKyBlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBvblRleHRDaGFuZ2VkKGFyZ3MpIHtcclxuXHJcbiAgICAgICAgbGV0IHNlYXJjaEJhciA9IDxTZWFyY2hCYXI+YXJncy5vYmplY3Q7XHJcbiAgICAgICAgbGV0IHNlYXJjaFZhbHVlID0gc2VhcmNoQmFyLnRleHQ7XHJcbiAgICAgICAgdGhpcy5nYW1lc0ZpbGVTZXJ2aWNlLmZpbmRHYW1lc0J5TmFtZShzZWFyY2hWYWx1ZSwgdGhpcy5maWx0ZXIpLnN1YnNjcmliZShcclxuICAgICAgICAgICAgKGdhbWVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVzID0gZ2FtZXM7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJHYW1lc0xpc3RDb21wb25lbnQgZ2V0R2FtZXMgZXJyb3IgXCIgKyBlcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgb25TaG93Q29uc29sZUNob29zZXIoZXZlbnQpIHtcclxuICAgICAgICB0aGlzLmlzU2hvd0NvbnNvbGVDaG9vc2VyID0gIXRoaXMuaXNTaG93Q29uc29sZUNob29zZXI7XHJcbiAgICB9XHJcblxyXG4gICAgb25TaG93V2hvQ2hvb3NlcihldmVudCkge1xyXG4gICAgICAgIHRoaXMuaXNTaG93V2hvQ2hvb3NlciA9ICF0aGlzLmlzU2hvd1dob0Nob29zZXI7XHJcbiAgICB9XHJcblxyXG4gICAgb25DbGVhckZpbHRlcihldmVudCkge1xyXG4gICAgICAgIHRoaXMuZmlsdGVyID0ge1xyXG4gICAgICAgICAgICBjb25zb2xlOiBcIlwiLFxyXG4gICAgICAgICAgICB3aG86IFwiXCJcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ2hvb3NlQ29uc29sZShpbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKE51bWJlci5pc05hTihpbmRleCkpIHtcclxuICAgICAgICAgICAgdGhpcy5maWx0ZXIuY29uc29sZSA9IFZJREVPX0dBTUVfQ09OU09MRVNbMF07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5maWx0ZXIuY29uc29sZSA9IFZJREVPX0dBTUVfQ09OU09MRVNbaW5kZXhdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkNob29zZVdobyhpbmRleCkge1xyXG4gICAgICAgIGlmIChOdW1iZXIuaXNOYU4oaW5kZXgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyLndobyA9IFdIT1swXTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmZpbHRlci53aG8gPSBXSE9baW5kZXhdO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19