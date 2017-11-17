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
            return _this.googleFileSyncService.requestLoadFile(result);
        })
            .switchMap(function (result) {
            return _this.gamesFileService.updateFile(result);
        })
            .subscribe(function () {
            _this.gamesFileService.getGames("", _this.filter);
        }, function (error) {
            _this.hideProgress();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZXMtbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnYW1lcy1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF3RDtBQUl4RCxpRUFBOEQ7QUFDOUQsbUVBQWdFO0FBQ2hFLDJFQUF3RTtBQUN4RSxpREFBNkQ7QUFFN0QseURBQXNEO0FBUXREO0lBQXdDLHNDQUFhO0lBa0JqRCw0QkFBb0IsaUJBQW9DLEVBQ3BDLHFCQUE0QyxFQUM1QyxnQkFBa0MsRUFDbEMsSUFBWTtRQUhoQyxZQUlJLGlCQUFPLFNBT1Y7UUFYbUIsdUJBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQywyQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO1FBQzVDLHNCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsVUFBSSxHQUFKLElBQUksQ0FBUTtRQWpCekIsY0FBUSxHQUFrQiwrQkFBbUIsQ0FBQztRQUU5QyxTQUFHLEdBQWtCLGVBQUcsQ0FBQztRQUV6QixXQUFLLEdBQWdCLEVBQUUsQ0FBQztRQWUzQixLQUFJLENBQUMsTUFBTSxHQUFHO1lBQ1YsT0FBTyxFQUFFLEVBQUU7WUFDWCxHQUFHLEVBQUUsRUFBRTtTQUNWLENBQUM7UUFDRixLQUFJLENBQUMsb0JBQW9CLEdBQUcsS0FBSyxDQUFDO1FBQ2xDLEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7O0lBQ2xDLENBQUM7SUFFRCxxQ0FBUSxHQUFSO1FBQUEsaUJBOEJDO1FBN0JHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNwQixJQUFJLGtCQUFrQixHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUU7YUFDckQsU0FBUyxDQUFDLFVBQUMsTUFBTTtZQUNkLE1BQU0sQ0FBQyxLQUFJLENBQUMscUJBQXFCLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzlELENBQUMsQ0FBQzthQUNELFNBQVMsQ0FB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QUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsZUFBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLGVBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVqQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLHFDQUFRLEdBQWhCO1FBQ0ksSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFqSFEsa0JBQWtCO1FBTjlCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsWUFBWTtZQUN0QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLDZCQUE2QjtZQUMxQyxTQUFTLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztTQUNsQyxDQUFDO3lDQW1CeUMscUNBQWlCO1lBQ2IsNkNBQXFCO1lBQzFCLG1DQUFnQjtZQUM1QixhQUFNO09BckJ2QixrQkFBa0IsQ0FrSDlCO0lBQUQseUJBQUM7Q0FBQSxBQWxIRCxDQUF3Qyw2QkFBYSxHQWtIcEQ7QUFsSFksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE5nWm9uZSwgT25Jbml0fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtTZWFyY2hCYXJ9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3NlYXJjaC1iYXJcIjtcblxuaW1wb3J0IHtHYW1lfSBmcm9tIFwiLi4vY29tbW9uL0dhbWVcIjtcbmltcG9ydCB7R2FtZXNGaWxlU2VydmljZX0gZnJvbSBcIi4uL3NlcnZpY2VzL0dhbWVzRmlsZVNlcnZpY2VcIjtcbmltcG9ydCB7R29vZ2xlQXV0aFNlcnZpY2V9IGZyb20gXCIuLi9zZXJ2aWNlcy9Hb29nbGVBdXRoU2VydmljZVwiO1xuaW1wb3J0IHtHb29nbGVGaWxlU3luY1NlcnZpY2V9IGZyb20gXCIuLi9zZXJ2aWNlcy9Hb29nbGVGaWxlU3luY1NlcnZpY2VcIjtcbmltcG9ydCB7VklERU9fR0FNRV9DT05TT0xFUywgV0hPfSBmcm9tIFwiLi4vY29tbW9uL0NvbnN0YW50c1wiO1xuaW1wb3J0IHtGaWx0ZXJ9IGZyb20gXCIuLi9jb21tb24vRmlsdGVyXCI7XG5pbXBvcnQge0Jhc2VDb21wb25lbnR9IGZyb20gXCIuLi9jb21tb24vQmFzZUNvbXBvbmVudFwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJnYW1lcy1saXN0XCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2dhbWVzLWxpc3QuY29tcG9uZW50Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFsnLi9nYW1lcy1saXN0LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIEdhbWVzTGlzdENvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgcHJpdmF0ZSBmaWx0ZXI6IEZpbHRlcjtcblxuICAgIHB1YmxpYyBjb25zb2xlczogQXJyYXk8U3RyaW5nPiA9IFZJREVPX0dBTUVfQ09OU09MRVM7XG5cbiAgICBwdWJsaWMgd2hvOiBBcnJheTxTdHJpbmc+ID0gV0hPO1xuXG4gICAgcHVibGljIGdhbWVzOiBBcnJheTxHYW1lPiA9IFtdO1xuXG4gICAgcHVibGljIGlzU2hvd0NvbnNvbGVDaG9vc2VyOiBib29sZWFuO1xuXG4gICAgcHVibGljIGlzU2hvd1dob0Nob29zZXI6IGJvb2xlYW47XG5cbiAgICBwdWJsaWMgY2hvc2VuQ29uc29sZUluZGV4OiBudW1iZXI7XG5cbiAgICBwdWJsaWMgY2hvc2VuV2hvSW5kZXg6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZ29vZ2xlQXV0aFNlcnZpY2U6IEdvb2dsZUF1dGhTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgZ29vZ2xlRmlsZVN5bmNTZXJ2aWNlOiBHb29nbGVGaWxlU3luY1NlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBnYW1lc0ZpbGVTZXJ2aWNlOiBHYW1lc0ZpbGVTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgem9uZTogTmdab25lKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuZmlsdGVyID0ge1xuICAgICAgICAgICAgY29uc29sZTogXCJcIixcbiAgICAgICAgICAgIHdobzogXCJcIlxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmlzU2hvd0NvbnNvbGVDaG9vc2VyID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNTaG93V2hvQ2hvb3NlciA9IGZhbHNlO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNob3dQcm9ncmVzcygpO1xuICAgICAgICBsZXQgc3Vic2NyaXB0aW9uVG9BdXRoID0gdGhpcy5nb29nbGVBdXRoU2VydmljZS5nZXRUb2tlbigpXG4gICAgICAgICAgICAuc3dpdGNoTWFwKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nb29nbGVGaWxlU3luY1NlcnZpY2UucmVxdWVzdExvYWRGaWxlKHJlc3VsdCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN3aXRjaE1hcCgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2FtZXNGaWxlU2VydmljZS51cGRhdGVGaWxlKHJlc3VsdClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lc0ZpbGVTZXJ2aWNlLmdldEdhbWVzKFwiXCIsIHRoaXMuZmlsdGVyKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGVQcm9ncmVzcygpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dBbGVydCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJVcGxvYWRpbmcgZ2FtZXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2VcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgbGV0IHN1YnNjcmlwdGlvblRvQ2hhbm5lbCA9IHRoaXMuZ2FtZXNGaWxlU2VydmljZS5nYW1lc0NoYW5uZWwuc3Vic2NyaWJlKChnYW1lcykgPT4ge1xuICAgICAgICAgICAgdGhpcy5oaWRlUHJvZ3Jlc3MoKTtcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZXMgPSBnYW1lc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKHN1YnNjcmlwdGlvblRvQXV0aCk7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKHN1YnNjcmlwdGlvblRvQ2hhbm5lbCk7XG4gICAgfVxuXG4gICAgb25UZXh0Q2hhbmdlZChhcmdzKSB7XG5cbiAgICAgICAgbGV0IHNlYXJjaEJhciA9IDxTZWFyY2hCYXI+YXJncy5vYmplY3Q7XG4gICAgICAgIGxldCBzZWFyY2hWYWx1ZSA9IHNlYXJjaEJhci50ZXh0O1xuICAgICAgICBsZXQgc3Vic2NyaXB0aW9uID0gdGhpcy5nYW1lc0ZpbGVTZXJ2aWNlLmdldEdhbWVzKHNlYXJjaFZhbHVlLCB0aGlzLmZpbHRlcik7XG4gICAgfVxuXG4gICAgb25TaG93Q29uc29sZUNob29zZXIoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5pc1Nob3dDb25zb2xlQ2hvb3NlciA9ICF0aGlzLmlzU2hvd0NvbnNvbGVDaG9vc2VyO1xuICAgICAgICBpZiAoIXRoaXMuaXNTaG93Q29uc29sZUNob29zZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0R2FtZXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uU2hvd1dob0Nob29zZXIoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5pc1Nob3dXaG9DaG9vc2VyID0gIXRoaXMuaXNTaG93V2hvQ2hvb3NlcjtcbiAgICAgICAgaWYgKCF0aGlzLmlzU2hvd1dob0Nob29zZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0R2FtZXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQ2xlYXJGaWx0ZXIoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5maWx0ZXIgPSB7XG4gICAgICAgICAgICBjb25zb2xlOiBcIlwiLFxuICAgICAgICAgICAgd2hvOiBcIlwiXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZ2V0R2FtZXMoKTtcbiAgICB9XG5cbiAgICBvbkNob29zZVdoZXJlKGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5jaG9zZW5Db25zb2xlSW5kZXggPSBpbmRleDtcbiAgICAgICAgaWYgKE51bWJlci5pc05hTihpbmRleCkpIHtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyLmNvbnNvbGUgPSBWSURFT19HQU1FX0NPTlNPTEVTWzBdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXIuY29uc29sZSA9IFZJREVPX0dBTUVfQ09OU09MRVNbaW5kZXhdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25DaG9vc2VXaG8oaW5kZXgpIHtcbiAgICAgICAgdGhpcy5jaG9zZW5XaG9JbmRleCA9IGluZGV4O1xuICAgICAgICBpZiAoTnVtYmVyLmlzTmFOKGluZGV4KSkge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXIud2hvID0gV0hPWzBdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXIud2hvID0gV0hPW2luZGV4XTtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRHYW1lcygpIHtcbiAgICAgICAgbGV0IHN1YnNjcmlwdGlvbiA9IHRoaXMuZ2FtZXNGaWxlU2VydmljZS5nZXRHYW1lcyhcIlwiLCB0aGlzLmZpbHRlcik7XG4gICAgfVxufVxuIl19