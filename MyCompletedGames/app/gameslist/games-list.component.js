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
        var subscriptionToAuth = this.googleAuthService.getToken()
            .switchMap(function (result) {
            return _this.googleFileSyncService.createCompletedGamesFolder(result);
        })
            .switchMap(function (result) {
            console.log(result);
            return _this.googleFileSyncService.createCompletedGamesFile(_this.googleAuthService.getTokenFromStorage(), result);
        })
            .switchMap(function (result) {
            return _this.googleFileSyncService.requestLoadFile(_this.googleAuthService.getTokenFromStorage());
        })
            .switchMap(function (result) {
            return _this.gamesFileService.updateFile(result);
        })
            .subscribe(function () {
            _this.gamesFileService.getGames("", _this.filter);
        }, function (error) {
            _this.hideProgress();
            console.dir(error);
            _this.showAlert({
                title: "Uploading games",
                message: error.message
            });
        });
        var subscriptionToChannel = this.gamesFileService.gamesChannel.subscribe(function (games) {
            _this.hideProgress();
            _this.zone.run(function () {
                _this.games = games;
            });
        });
        this.subscriptions.push(subscriptionToAuth);
        this.subscriptions.push(subscriptionToChannel);
    };
    GamesListComponent.prototype.onTextChanged = function (args) {
        var searchBar = args.object;
        var searchValue = searchBar.text;
        var subscription = this.gamesFileService.getGames(searchValue, this.filter);
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
        var subscription = this.gamesFileService.getGames("", this.filter);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZXMtbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnYW1lcy1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF3RDtBQUl4RCxpRUFBOEQ7QUFDOUQsbUVBQWdFO0FBQ2hFLDJFQUF3RTtBQUN4RSxpREFBNkQ7QUFFN0QseURBQXNEO0FBUXREO0lBQXdDLHNDQUFhO0lBa0JqRCw0QkFBb0IsaUJBQW9DLEVBQ3BDLHFCQUE0QyxFQUM1QyxnQkFBa0MsRUFDbEMsSUFBWTtRQUhoQyxZQUlJLGlCQUFPLFNBT1Y7UUFYbUIsdUJBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQywyQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO1FBQzVDLHNCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsVUFBSSxHQUFKLElBQUksQ0FBUTtRQWpCekIsY0FBUSxHQUFrQiwrQkFBbUIsQ0FBQztRQUU5QyxTQUFHLEdBQWtCLGVBQUcsQ0FBQztRQUV6QixXQUFLLEdBQWdCLEVBQUUsQ0FBQztRQWUzQixLQUFJLENBQUMsTUFBTSxHQUFHO1lBQ1YsT0FBTyxFQUFFLEVBQUU7WUFDWCxHQUFHLEVBQUUsRUFBRTtTQUNWLENBQUM7UUFDRixLQUFJLENBQUMsb0JBQW9CLEdBQUcsS0FBSyxDQUFDO1FBQ2xDLEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7O0lBQ2xDLENBQUM7SUFFRCxxQ0FBUSxHQUFSO1FBQUEsaUJBeUNDO1FBeENHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNwQixJQUFJLGtCQUFrQixHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUU7YUFDckQsU0FBUyxDQUFDLFVBQUMsTUFBTTtZQUNkLE1BQU0sQ0FBQyxLQUFJLENBQUMscUJBQXFCLENBQUMsMEJBQTBCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekUsQ0FBQyxDQUFDO2FBQ0QsU0FBUyxD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TTtPQXJCdkIsa0JBQWtCLENBNkg5QjtJQUFELHlCQUFDO0NBQUEsQUE3SEQsQ0FBd0MsNkJBQWEsR0E2SHBEO0FBN0hZLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBOZ1pvbmUsIE9uSW5pdH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7U2VhcmNoQmFyfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9zZWFyY2gtYmFyXCI7XG5cbmltcG9ydCB7R2FtZX0gZnJvbSBcIi4uL2NvbW1vbi9HYW1lXCI7XG5pbXBvcnQge0dhbWVzRmlsZVNlcnZpY2V9IGZyb20gXCIuLi9zZXJ2aWNlcy9HYW1lc0ZpbGVTZXJ2aWNlXCI7XG5pbXBvcnQge0dvb2dsZUF1dGhTZXJ2aWNlfSBmcm9tIFwiLi4vc2VydmljZXMvR29vZ2xlQXV0aFNlcnZpY2VcIjtcbmltcG9ydCB7R29vZ2xlRmlsZVN5bmNTZXJ2aWNlfSBmcm9tIFwiLi4vc2VydmljZXMvR29vZ2xlRmlsZVN5bmNTZXJ2aWNlXCI7XG5pbXBvcnQge1ZJREVPX0dBTUVfQ09OU09MRVMsIFdIT30gZnJvbSBcIi4uL2NvbW1vbi9Db25zdGFudHNcIjtcbmltcG9ydCB7RmlsdGVyfSBmcm9tIFwiLi4vY29tbW9uL0ZpbHRlclwiO1xuaW1wb3J0IHtCYXNlQ29tcG9uZW50fSBmcm9tIFwiLi4vY29tbW9uL0Jhc2VDb21wb25lbnRcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiZ2FtZXMtbGlzdFwiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9nYW1lcy1saXN0LmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbJy4vZ2FtZXMtbGlzdC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBHYW1lc0xpc3RDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIHByaXZhdGUgZmlsdGVyOiBGaWx0ZXI7XG5cbiAgICBwdWJsaWMgY29uc29sZXM6IEFycmF5PFN0cmluZz4gPSBWSURFT19HQU1FX0NPTlNPTEVTO1xuXG4gICAgcHVibGljIHdobzogQXJyYXk8U3RyaW5nPiA9IFdITztcblxuICAgIHB1YmxpYyBnYW1lczogQXJyYXk8R2FtZT4gPSBbXTtcblxuICAgIHB1YmxpYyBpc1Nob3dDb25zb2xlQ2hvb3NlcjogYm9vbGVhbjtcblxuICAgIHB1YmxpYyBpc1Nob3dXaG9DaG9vc2VyOiBib29sZWFuO1xuXG4gICAgcHVibGljIGNob3NlbkNvbnNvbGVJbmRleDogbnVtYmVyO1xuXG4gICAgcHVibGljIGNob3Nlbldob0luZGV4OiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGdvb2dsZUF1dGhTZXJ2aWNlOiBHb29nbGVBdXRoU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIGdvb2dsZUZpbGVTeW5jU2VydmljZTogR29vZ2xlRmlsZVN5bmNTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgZ2FtZXNGaWxlU2VydmljZTogR2FtZXNGaWxlU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIHpvbmU6IE5nWm9uZSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmZpbHRlciA9IHtcbiAgICAgICAgICAgIGNvbnNvbGU6IFwiXCIsXG4gICAgICAgICAgICB3aG86IFwiXCJcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5pc1Nob3dDb25zb2xlQ2hvb3NlciA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzU2hvd1dob0Nob29zZXIgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zaG93UHJvZ3Jlc3MoKTtcbiAgICAgICAgbGV0IHN1YnNjcmlwdGlvblRvQXV0aCA9IHRoaXMuZ29vZ2xlQXV0aFNlcnZpY2UuZ2V0VG9rZW4oKVxuICAgICAgICAgICAgLnN3aXRjaE1hcCgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ29vZ2xlRmlsZVN5bmNTZXJ2aWNlLmNyZWF0ZUNvbXBsZXRlZEdhbWVzRm9sZGVyKHJlc3VsdCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN3aXRjaE1hcCgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nb29nbGVGaWxlU3luY1NlcnZpY2UuY3JlYXRlQ29tcGxldGVkR2FtZXNGaWxlKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdvb2dsZUF1dGhTZXJ2aWNlLmdldFRva2VuRnJvbVN0b3JhZ2UoKSxcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3dpdGNoTWFwKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nb29nbGVGaWxlU3luY1NlcnZpY2UucmVxdWVzdExvYWRGaWxlKHRoaXMuZ29vZ2xlQXV0aFNlcnZpY2UuZ2V0VG9rZW5Gcm9tU3RvcmFnZSgpKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3dpdGNoTWFwKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nYW1lc0ZpbGVTZXJ2aWNlLnVwZGF0ZUZpbGUocmVzdWx0KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVzRmlsZVNlcnZpY2UuZ2V0R2FtZXMoXCJcIiwgdGhpcy5maWx0ZXIpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZVByb2dyZXNzKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93QWxlcnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiVXBsb2FkaW5nIGdhbWVzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBlcnJvci5tZXNzYWdlXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIGxldCBzdWJzY3JpcHRpb25Ub0NoYW5uZWwgPSB0aGlzLmdhbWVzRmlsZVNlcnZpY2UuZ2FtZXNDaGFubmVsLnN1YnNjcmliZSgoZ2FtZXMpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaGlkZVByb2dyZXNzKCk7XG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVzID0gZ2FtZXNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChzdWJzY3JpcHRpb25Ub0F1dGgpO1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChzdWJzY3JpcHRpb25Ub0NoYW5uZWwpO1xuICAgIH1cblxuICAgIG9uVGV4dENoYW5nZWQoYXJncykge1xuXG4gICAgICAgIGxldCBzZWFyY2hCYXIgPSA8U2VhcmNoQmFyPmFyZ3Mub2JqZWN0O1xuICAgICAgICBsZXQgc2VhcmNoVmFsdWUgPSBzZWFyY2hCYXIudGV4dDtcbiAgICAgICAgbGV0IHN1YnNjcmlwdGlvbiA9IHRoaXMuZ2FtZXNGaWxlU2VydmljZS5nZXRHYW1lcyhzZWFyY2hWYWx1ZSwgdGhpcy5maWx0ZXIpO1xuICAgIH1cblxuICAgIG9uU2hvd0NvbnNvbGVDaG9vc2VyKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuaXNTaG93Q29uc29sZUNob29zZXIgPSAhdGhpcy5pc1Nob3dDb25zb2xlQ2hvb3NlcjtcbiAgICAgICAgaWYgKCF0aGlzLmlzU2hvd0NvbnNvbGVDaG9vc2VyKSB7XG4gICAgICAgICAgICB0aGlzLmdldEdhbWVzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblNob3dXaG9DaG9vc2VyKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuaXNTaG93V2hvQ2hvb3NlciA9ICF0aGlzLmlzU2hvd1dob0Nob29zZXI7XG4gICAgICAgIGlmICghdGhpcy5pc1Nob3dXaG9DaG9vc2VyKSB7XG4gICAgICAgICAgICB0aGlzLmdldEdhbWVzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkNsZWFyRmlsdGVyKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZmlsdGVyID0ge1xuICAgICAgICAgICAgY29uc29sZTogXCJcIixcbiAgICAgICAgICAgIHdobzogXCJcIlxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmdldEdhbWVzKCk7XG4gICAgfVxuXG4gICAgb25DaG9vc2VXaGVyZShpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuY2hvc2VuQ29uc29sZUluZGV4ID0gaW5kZXg7XG4gICAgICAgIGlmIChOdW1iZXIuaXNOYU4oaW5kZXgpKSB7XG4gICAgICAgICAgICB0aGlzLmZpbHRlci5jb25zb2xlID0gVklERU9fR0FNRV9DT05TT0xFU1swXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyLmNvbnNvbGUgPSBWSURFT19HQU1FX0NPTlNPTEVTW2luZGV4XTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQ2hvb3NlV2hvKGluZGV4KSB7XG4gICAgICAgIHRoaXMuY2hvc2VuV2hvSW5kZXggPSBpbmRleDtcbiAgICAgICAgaWYgKE51bWJlci5pc05hTihpbmRleCkpIHtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyLndobyA9IFdIT1swXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyLndobyA9IFdIT1tpbmRleF07XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0R2FtZXMoKSB7XG4gICAgICAgIGxldCBzdWJzY3JpcHRpb24gPSB0aGlzLmdhbWVzRmlsZVNlcnZpY2UuZ2V0R2FtZXMoXCJcIiwgdGhpcy5maWx0ZXIpO1xuICAgIH1cbn1cbiJdfQ==