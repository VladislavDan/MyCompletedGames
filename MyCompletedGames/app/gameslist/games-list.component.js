"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var GamesFileService_1 = require("../services/GamesFileService");
var GoogleAuthService_1 = require("../services/GoogleAuthService");
var GoogleFileSyncService_1 = require("../services/GoogleFileSyncService");
var Constants_1 = require("../common/Constants");
var BaseComponent_1 = require("../common/BaseComponent");
var GamesListComponent = /** @class */ (function (_super) {
    __extends(GamesListComponent, _super);
    function GamesListComponent(googleAuthService, googleFileSyncService, gamesFileService, zone) {
        var _this = _super.call(this) || this;
        _this.googleAuthService = googleAuthService;
        _this.googleFileSyncService = googleFileSyncService;
        _this.gamesFileService = gamesFileService;
        _this.zone = zone;
        _this.consoles = Constants_1.VIDEO_GAME_CONSOLES;
        _this.who = Constants_1.WHO;
        _this.games = [];
        _this.filter = {
            console: "",
            who: ""
        };
        _this.isShowConsoleChooser = false;
        _this.isShowWhoChooser = false;
        return _this;
    }
    GamesListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.showProgress();
        this.googleAuthService.getToken()
            .switchMap(function (result) {
            return _this.googleFileSyncService.requestLoadFile(result);
        })
            .switchMap(function (result) {
            return _this.gamesFileService.updateFile(result);
        })
            .switchMap(function () {
            return _this.gamesFileService.getGames(_this.filter);
        })
            .subscribe(function (games) {
            _this.hideProgress();
            _this.zone.run(function () {
                _this.games = games;
            });
        }, function (error) {
            _this.hideProgress();
            _this.showAlert({
                title: "First getting games",
                message: error.message
            });
        });
    };
    GamesListComponent.prototype.onTextChanged = function (args) {
        var _this = this;
        var searchBar = args.object;
        var searchValue = searchBar.text;
        var subscription = this.gamesFileService.findGamesByName(searchValue, this.filter).subscribe(function (games) {
            _this.games = games;
        }, function (error) {
            _this.showAlert({
                title: "Finding game",
                message: error.message
            });
        });
        this.subscriptions.push(subscription);
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
        var subscription = this.gamesFileService.getGames(this.filter).subscribe(function (games) {
            _this.hideProgress();
            _this.games = games;
        }, function (error) {
            _this.hideProgress();
            _this.showAlert({
                title: "Getting games",
                message: error.message
            });
        });
        this.subscriptions.push(subscription);
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
            GamesFileService_1.GamesFileService,
            core_1.NgZone])
    ], GamesListComponent);
    return GamesListComponent;
}(BaseComponent_1.BaseComponent));
exports.GamesListComponent = GamesListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZXMtbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnYW1lcy1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF3RDtBQUl4RCxpRUFBOEQ7QUFDOUQsbUVBQWdFO0FBQ2hFLDJFQUF3RTtBQUN4RSxpREFBNkQ7QUFFN0QseURBQXNEO0FBUXREO0lBQXdDLHNDQUFhO0lBa0JqRCw0QkFBb0IsaUJBQW9DLEVBQ3BDLHFCQUE0QyxFQUM1QyxnQkFBa0MsRUFDbEMsSUFBWTtRQUhoQyxZQUlJLGlCQUFPLFNBT1Y7UUFYbUIsdUJBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQywyQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO1FBQzVDLHNCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsVUFBSSxHQUFKLElBQUksQ0FBUTtRQWpCekIsY0FBUSxHQUFrQiwrQkFBbUIsQ0FBQztRQUU5QyxTQUFHLEdBQWtCLGVBQUcsQ0FBQztRQUV6QixXQUFLLEdBQWdCLEVBQUUsQ0FBQztRQWUzQixLQUFJLENBQUMsTUFBTSxHQUFHO1lBQ1YsT0FBTyxFQUFFLEVBQUU7WUFDWCxHQUFHLEVBQUUsRUFBRTtTQUNWLENBQUM7UUFDRixLQUFJLENBQUMsb0JBQW9CLEdBQUcsS0FBSyxDQUFDO1FBQ2xDLEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7O0lBQ2xDLENBQUM7SUFFRCxxQ0FBUSxHQUFSO1FBQUEsaUJBMkJDO1FBMUJHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFO2FBQzVCLFNBQVMsQ0FBQyxVQUFDLE1BQU07WUFDZCxNQUFNLENBQUMsS0FBSSxDQUFDLHFCQUFxQixDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM5RCxDQUFDLENBQUM7YUFDRCxTQUFTLENBQUMsVUFBQyxNQUFNO1lBQ2Qs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NkNBQXFCO1lBQzFCLG1DQUFnQjtZQUM1QixhQUFNO09BckJ2QixrQkFBa0IsQ0F1STlCO0lBQUQseUJBQUM7Q0FBQSxBQXZJRCxDQUF3Qyw2QkFBYSxHQXVJcEQ7QUF2SVksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE5nWm9uZSwgT25Jbml0fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtTZWFyY2hCYXJ9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3NlYXJjaC1iYXJcIjtcblxuaW1wb3J0IHtHYW1lfSBmcm9tIFwiLi4vY29tbW9uL0dhbWVcIjtcbmltcG9ydCB7R2FtZXNGaWxlU2VydmljZX0gZnJvbSBcIi4uL3NlcnZpY2VzL0dhbWVzRmlsZVNlcnZpY2VcIjtcbmltcG9ydCB7R29vZ2xlQXV0aFNlcnZpY2V9IGZyb20gXCIuLi9zZXJ2aWNlcy9Hb29nbGVBdXRoU2VydmljZVwiO1xuaW1wb3J0IHtHb29nbGVGaWxlU3luY1NlcnZpY2V9IGZyb20gXCIuLi9zZXJ2aWNlcy9Hb29nbGVGaWxlU3luY1NlcnZpY2VcIjtcbmltcG9ydCB7VklERU9fR0FNRV9DT05TT0xFUywgV0hPfSBmcm9tIFwiLi4vY29tbW9uL0NvbnN0YW50c1wiO1xuaW1wb3J0IHtGaWx0ZXJ9IGZyb20gXCIuLi9jb21tb24vRmlsdGVyXCI7XG5pbXBvcnQge0Jhc2VDb21wb25lbnR9IGZyb20gXCIuLi9jb21tb24vQmFzZUNvbXBvbmVudFwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJnYW1lcy1saXN0XCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2dhbWVzLWxpc3QuY29tcG9uZW50Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFsnLi9nYW1lcy1saXN0LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIEdhbWVzTGlzdENvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgcHJpdmF0ZSBmaWx0ZXI6IEZpbHRlcjtcblxuICAgIHB1YmxpYyBjb25zb2xlczogQXJyYXk8U3RyaW5nPiA9IFZJREVPX0dBTUVfQ09OU09MRVM7XG5cbiAgICBwdWJsaWMgd2hvOiBBcnJheTxTdHJpbmc+ID0gV0hPO1xuXG4gICAgcHVibGljIGdhbWVzOiBBcnJheTxHYW1lPiA9IFtdO1xuXG4gICAgcHVibGljIGlzU2hvd0NvbnNvbGVDaG9vc2VyOiBib29sZWFuO1xuXG4gICAgcHVibGljIGlzU2hvd1dob0Nob29zZXI6IGJvb2xlYW47XG5cbiAgICBwdWJsaWMgY2hvc2VuQ29uc29sZUluZGV4OiBudW1iZXI7XG5cbiAgICBwdWJsaWMgY2hvc2VuV2hvSW5kZXg6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZ29vZ2xlQXV0aFNlcnZpY2U6IEdvb2dsZUF1dGhTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgZ29vZ2xlRmlsZVN5bmNTZXJ2aWNlOiBHb29nbGVGaWxlU3luY1NlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBnYW1lc0ZpbGVTZXJ2aWNlOiBHYW1lc0ZpbGVTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgem9uZTogTmdab25lKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuZmlsdGVyID0ge1xuICAgICAgICAgICAgY29uc29sZTogXCJcIixcbiAgICAgICAgICAgIHdobzogXCJcIlxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmlzU2hvd0NvbnNvbGVDaG9vc2VyID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNTaG93V2hvQ2hvb3NlciA9IGZhbHNlO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNob3dQcm9ncmVzcygpO1xuICAgICAgICB0aGlzLmdvb2dsZUF1dGhTZXJ2aWNlLmdldFRva2VuKClcbiAgICAgICAgICAgIC5zd2l0Y2hNYXAoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdvb2dsZUZpbGVTeW5jU2VydmljZS5yZXF1ZXN0TG9hZEZpbGUocmVzdWx0KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3dpdGNoTWFwKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nYW1lc0ZpbGVTZXJ2aWNlLnVwZGF0ZUZpbGUocmVzdWx0KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zd2l0Y2hNYXAoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdhbWVzRmlsZVNlcnZpY2UuZ2V0R2FtZXModGhpcy5maWx0ZXIpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgKGdhbWVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZVByb2dyZXNzKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lcyA9IGdhbWVzXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZVByb2dyZXNzKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0FsZXJ0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkZpcnN0IGdldHRpbmcgZ2FtZXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2VcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICB9XG5cbiAgICBvblRleHRDaGFuZ2VkKGFyZ3MpIHtcblxuICAgICAgICBsZXQgc2VhcmNoQmFyID0gPFNlYXJjaEJhcj5hcmdzLm9iamVjdDtcbiAgICAgICAgbGV0IHNlYXJjaFZhbHVlID0gc2VhcmNoQmFyLnRleHQ7XG4gICAgICAgIGxldCBzdWJzY3JpcHRpb24gPSB0aGlzLmdhbWVzRmlsZVNlcnZpY2UuZmluZEdhbWVzQnlOYW1lKHNlYXJjaFZhbHVlLCB0aGlzLmZpbHRlcikuc3Vic2NyaWJlKFxuICAgICAgICAgICAgKGdhbWVzKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lcyA9IGdhbWVzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0FsZXJ0KHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiRmluZGluZyBnYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2VcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goc3Vic2NyaXB0aW9uKTtcbiAgICB9XG5cbiAgICBvblNob3dDb25zb2xlQ2hvb3NlcihldmVudCkge1xuICAgICAgICB0aGlzLmlzU2hvd0NvbnNvbGVDaG9vc2VyID0gIXRoaXMuaXNTaG93Q29uc29sZUNob29zZXI7XG4gICAgICAgIGlmICghdGhpcy5pc1Nob3dDb25zb2xlQ2hvb3Nlcikge1xuICAgICAgICAgICAgdGhpcy5nZXRHYW1lcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25TaG93V2hvQ2hvb3NlcihldmVudCkge1xuICAgICAgICB0aGlzLmlzU2hvd1dob0Nob29zZXIgPSAhdGhpcy5pc1Nob3dXaG9DaG9vc2VyO1xuICAgICAgICBpZiAoIXRoaXMuaXNTaG93V2hvQ2hvb3Nlcikge1xuICAgICAgICAgICAgdGhpcy5nZXRHYW1lcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25DbGVhckZpbHRlcihldmVudCkge1xuICAgICAgICB0aGlzLmZpbHRlciA9IHtcbiAgICAgICAgICAgIGNvbnNvbGU6IFwiXCIsXG4gICAgICAgICAgICB3aG86IFwiXCJcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5nZXRHYW1lcygpO1xuICAgIH1cblxuICAgIG9uQ2hvb3NlV2hlcmUoaW5kZXg6IG51bWJlcikge1xuICAgICAgICB0aGlzLmNob3NlbkNvbnNvbGVJbmRleCA9IGluZGV4O1xuICAgICAgICBpZiAoTnVtYmVyLmlzTmFOKGluZGV4KSkge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXIuY29uc29sZSA9IFZJREVPX0dBTUVfQ09OU09MRVNbMF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmZpbHRlci5jb25zb2xlID0gVklERU9fR0FNRV9DT05TT0xFU1tpbmRleF07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkNob29zZVdobyhpbmRleCkge1xuICAgICAgICB0aGlzLmNob3Nlbldob0luZGV4ID0gaW5kZXg7XG4gICAgICAgIGlmIChOdW1iZXIuaXNOYU4oaW5kZXgpKSB7XG4gICAgICAgICAgICB0aGlzLmZpbHRlci53aG8gPSBXSE9bMF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmZpbHRlci53aG8gPSBXSE9baW5kZXhdO1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEdhbWVzKCkge1xuICAgICAgICBsZXQgc3Vic2NyaXB0aW9uID0gdGhpcy5nYW1lc0ZpbGVTZXJ2aWNlLmdldEdhbWVzKHRoaXMuZmlsdGVyKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAoZ2FtZXMpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGVQcm9ncmVzcygpO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZXMgPSBnYW1lcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGVQcm9ncmVzcygpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0FsZXJ0KHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiR2V0dGluZyBnYW1lc1wiLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBlcnJvci5tZXNzYWdlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKHN1YnNjcmlwdGlvbik7XG4gICAgfVxufVxuIl19