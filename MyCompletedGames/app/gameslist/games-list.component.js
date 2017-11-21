"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var GamesFileService_1 = require("../services/GamesFileService");
var GoogleAuthService_1 = require("../services/GoogleAuthService");
var GoogleFileSyncService_1 = require("../services/GoogleFileSyncService");
var Constants_1 = require("../common/Constants");
var BaseComponent_1 = require("../common/BaseComponent");
var nativescript_angular_1 = require("nativescript-angular");
var GamesListComponent = /** @class */ (function (_super) {
    __extends(GamesListComponent, _super);
    function GamesListComponent(googleAuthService, googleFileSyncService, gamesFileService, routerExtensions, pageRoute, zone) {
        var _this = _super.call(this) || this;
        _this.googleAuthService = googleAuthService;
        _this.googleFileSyncService = googleFileSyncService;
        _this.gamesFileService = gamesFileService;
        _this.routerExtensions = routerExtensions;
        _this.pageRoute = pageRoute;
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
    GamesListComponent.prototype.onItemTap = function (event) {
        // let route = new ActivatedRoute();
        // route.params = Observable.of(this.games[event.index]);
        // this.pageRoute.activatedRoute.next(new ActivatedRoute());
        this.routerExtensions.navigate(["details", this.games[event.index].id]);
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
            nativescript_angular_1.RouterExtensions,
            nativescript_angular_1.PageRoute,
            core_1.NgZone])
    ], GamesListComponent);
    return GamesListComponent;
}(BaseComponent_1.BaseComponent));
exports.GamesListComponent = GamesListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZXMtbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnYW1lcy1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF3RDtBQUl4RCxpRUFBOEQ7QUFDOUQsbUVBQWdFO0FBQ2hFLDJFQUF3RTtBQUN4RSxpREFBNkQ7QUFFN0QseURBQXNEO0FBQ3RELDZEQUFpRTtBQVFqRTtJQUF3QyxzQ0FBYTtJQWtCakQsNEJBQW9CLGlCQUFvQyxFQUNwQyxxQkFBNEMsRUFDNUMsZ0JBQWtDLEVBQ2xDLGdCQUFrQyxFQUNsQyxTQUFvQixFQUNwQixJQUFZO1FBTGhDLFlBTUksaUJBQU8sU0FPVjtRQWJtQix1QkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLDJCQUFxQixHQUFyQixxQkFBcUIsQ0FBdUI7UUFDNUMsc0JBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxzQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLGVBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsVUFBSSxHQUFKLElBQUksQ0FBUTtRQW5CekIsY0FBUSxHQUFrQiwrQkFBbUIsQ0FBQztRQUU5QyxTQUFHLEdBQWtCLGVBQUcsQ0FBQztRQUV6QixXQUFLLEdBQWdCLEVBQUUsQ0FBQztRQWlCM0IsS0FBSSxDQUFDLE1BQU0sR0FBRztZQUNWLE9BQU8sRUFBRSxFQUFFO1lBQ1gsR0FBRyxFQUFFLEVBQUU7U0FDVixDQUFDO1FBQ0YsS0FBSSxDQUFDLG9CQUFvQixHQUFHLEtBQUssQ0FBQztRQUNsQyxLQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDOztJQUNsQyxDQUFDO0lBRUQscUNBQVEsR0FBUjtRQUFBLGlCQXdDQztRQXZDRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEIsSUFBSSxrQkFBa0IsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFO2FBVXJELFNBQVMsQ0FBQyxVQUFDLE1BQU07WUFDZCxNQUFNLENBQUMsS0FBSSxDQUFDLHFCQUFxQixDQUFDLGVBQWUsQ0FBQyxLQUFJLENBQUMsaUJBQWlCLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDO1FBQ3BHLENBQUMsQ0FBQzthQUNELFNBQVMsQ0FBQyxVQUFDLE1BQU07WUFDZCxNQUFNLENBQUMsS0FBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUNuRCxDQUFDLENBQUM7YUFDRCxTQUFTLENBQ047WUFDSSxLQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxLQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEQsQ0FBQyxFQUNELFVBQUMsS0FBSztZQUNGLEtBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25CLEtBQUksQ0FBQyxTQUFTLENBQUM7Z0JBQ1gsS0FBSyxFQUFFLGlCQUFpQjtnQkFDeEIsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPO2FBQ3pCLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FDSixDQUFDO1FBQ04sSUFBSSxxQkFBcUIsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxVQUFDLEtBQUs7WUFDM0UsS0FBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3BCLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO2dCQUNWLEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBO1lBQ3RCLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVELDBDQUFhLEdBQWIsVUFBYyxJQUFJO1FBRWQsSUFBSSxTQUFTLEdBQWMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN2QyxJQUFJLFdBQVcsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDO1FBQ2pDLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNoRixDQUFDO0lBRUQsaURBQW9CLEdBQXBCLFVBQXFCLEtBQUs7UUFDdEIsSUFBSSxDQUFDLG9CQUFvQixHQUFHLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDO1FBQ3ZELEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQztZQUM3QixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDcEIsQ0FBQztJQUNMLENBQUM7SUFFRCw2Q0FBZ0IsR0FBaEIsVUFBaUIsS0FBSztRQUNsQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7UUFDL0MsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNwQixDQUFDO0lBQ0wsQ0FBQztJQUVELDBDQUFhLEdBQWIsVUFBYyxLQUFLO1FBQ2YsSUFBSSxDQUFDLE1BQU0sR0FBRztZQUNWLE9BQU8sRUFBRSxFQUFFO1lBQ1gsR0FBRyxFQUFFLEVBQUU7U0FDVixDQUFDO1FBQ0YsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFRCwwQ0FBYSxHQUFiLFVBQWMsS0FBYTtRQUN2QixJQUFJLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDO1FBQ2hDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLCtCQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pELENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLCtCQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JELENBQUM7SUFDTCxDQUFDO0lBRUQsd0NBQVcsR0FBWCxVQUFZLEtBQUs7UUFDYixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztRQUM1QixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxlQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0IsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsZUFBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRWpDLENBQUM7SUFDTCxDQUFDO0lBRUQsc0NBQVMsR0FBVCxVQUFVLEtBQUs7UUFDWCxvQ0FBb0M7UUFDcEMseURBQXlEO1FBQ3pELDREQUE0RDtRQUM1RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUUsQ0FBQztJQUVPLHFDQUFRLEdBQWhCO1FBQ0ksSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFwSVEsa0JBQWtCO1FBTjlCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsWUFBWTtZQUN0QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLDZCQUE2QjtZQUMxQyxTQUFTLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztTQUNsQyxDQUFDO3lDQW1CeUMscUNBQWlCO1lBQ2IsNkNBQXFCO1lBQzFCLG1DQUFnQjtZQUNoQix1Q0FBZ0I7WUFDdkIsZ0NBQVM7WUFDZCxhQUFNO09BdkJ2QixrQkFBa0IsQ0FxSTlCO0lBQUQseUJBQUM7Q0FBQSxBQXJJRCxDQUF3Qyw2QkFBYSxHQXFJcEQ7QUFySVksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE5nWm9uZSwgT25Jbml0fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtTZWFyY2hCYXJ9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3NlYXJjaC1iYXJcIjtcblxuaW1wb3J0IHtHYW1lfSBmcm9tIFwiLi4vY29tbW9uL0dhbWVcIjtcbmltcG9ydCB7R2FtZXNGaWxlU2VydmljZX0gZnJvbSBcIi4uL3NlcnZpY2VzL0dhbWVzRmlsZVNlcnZpY2VcIjtcbmltcG9ydCB7R29vZ2xlQXV0aFNlcnZpY2V9IGZyb20gXCIuLi9zZXJ2aWNlcy9Hb29nbGVBdXRoU2VydmljZVwiO1xuaW1wb3J0IHtHb29nbGVGaWxlU3luY1NlcnZpY2V9IGZyb20gXCIuLi9zZXJ2aWNlcy9Hb29nbGVGaWxlU3luY1NlcnZpY2VcIjtcbmltcG9ydCB7VklERU9fR0FNRV9DT05TT0xFUywgV0hPfSBmcm9tIFwiLi4vY29tbW9uL0NvbnN0YW50c1wiO1xuaW1wb3J0IHtGaWx0ZXJ9IGZyb20gXCIuLi9jb21tb24vRmlsdGVyXCI7XG5pbXBvcnQge0Jhc2VDb21wb25lbnR9IGZyb20gXCIuLi9jb21tb24vQmFzZUNvbXBvbmVudFwiO1xuaW1wb3J0IHtQYWdlUm91dGUsIFJvdXRlckV4dGVuc2lvbnN9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhclwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJnYW1lcy1saXN0XCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2dhbWVzLWxpc3QuY29tcG9uZW50Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFsnLi9nYW1lcy1saXN0LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIEdhbWVzTGlzdENvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgcHJpdmF0ZSBmaWx0ZXI6IEZpbHRlcjtcblxuICAgIHB1YmxpYyBjb25zb2xlczogQXJyYXk8U3RyaW5nPiA9IFZJREVPX0dBTUVfQ09OU09MRVM7XG5cbiAgICBwdWJsaWMgd2hvOiBBcnJheTxTdHJpbmc+ID0gV0hPO1xuXG4gICAgcHVibGljIGdhbWVzOiBBcnJheTxHYW1lPiA9IFtdO1xuXG4gICAgcHVibGljIGlzU2hvd0NvbnNvbGVDaG9vc2VyOiBib29sZWFuO1xuXG4gICAgcHVibGljIGlzU2hvd1dob0Nob29zZXI6IGJvb2xlYW47XG5cbiAgICBwdWJsaWMgY2hvc2VuQ29uc29sZUluZGV4OiBudW1iZXI7XG5cbiAgICBwdWJsaWMgY2hvc2VuV2hvSW5kZXg6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZ29vZ2xlQXV0aFNlcnZpY2U6IEdvb2dsZUF1dGhTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgZ29vZ2xlRmlsZVN5bmNTZXJ2aWNlOiBHb29nbGVGaWxlU3luY1NlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBnYW1lc0ZpbGVTZXJ2aWNlOiBHYW1lc0ZpbGVTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcbiAgICAgICAgICAgICAgICBwcml2YXRlIHBhZ2VSb3V0ZTogUGFnZVJvdXRlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgem9uZTogTmdab25lKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuZmlsdGVyID0ge1xuICAgICAgICAgICAgY29uc29sZTogXCJcIixcbiAgICAgICAgICAgIHdobzogXCJcIlxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmlzU2hvd0NvbnNvbGVDaG9vc2VyID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNTaG93V2hvQ2hvb3NlciA9IGZhbHNlO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNob3dQcm9ncmVzcygpO1xuICAgICAgICBsZXQgc3Vic2NyaXB0aW9uVG9BdXRoID0gdGhpcy5nb29nbGVBdXRoU2VydmljZS5nZXRUb2tlbigpXG4gICAgICAgIC8vIC5zd2l0Y2hNYXAoKHJlc3VsdCkgPT4ge1xuICAgICAgICAvLyAgICAgcmV0dXJuIHRoaXMuZ29vZ2xlRmlsZVN5bmNTZXJ2aWNlLmNyZWF0ZUNvbXBsZXRlZEdhbWVzRm9sZGVyKHJlc3VsdCk7XG4gICAgICAgIC8vIH0pXG4gICAgICAgIC8vIC5zd2l0Y2hNYXAoKHJlc3VsdCkgPT4ge1xuICAgICAgICAvLyAgICAgcmV0dXJuIHRoaXMuZ29vZ2xlRmlsZVN5bmNTZXJ2aWNlLmNyZWF0ZUNvbXBsZXRlZEdhbWVzRmlsZShcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmdvb2dsZUF1dGhTZXJ2aWNlLmdldFRva2VuRnJvbVN0b3JhZ2UoKSxcbiAgICAgICAgLy8gICAgICAgICByZXN1bHRcbiAgICAgICAgLy8gICAgICk7XG4gICAgICAgIC8vIH0pXG4gICAgICAgICAgICAuc3dpdGNoTWFwKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nb29nbGVGaWxlU3luY1NlcnZpY2UucmVxdWVzdExvYWRGaWxlKHRoaXMuZ29vZ2xlQXV0aFNlcnZpY2UuZ2V0VG9rZW5Gcm9tU3RvcmFnZSgpKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3dpdGNoTWFwKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nYW1lc0ZpbGVTZXJ2aWNlLnVwZGF0ZUZpbGUocmVzdWx0KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVzRmlsZVNlcnZpY2UuZ2V0R2FtZXMoXCJcIiwgdGhpcy5maWx0ZXIpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZVByb2dyZXNzKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93QWxlcnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiVXBsb2FkaW5nIGdhbWVzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBlcnJvci5tZXNzYWdlXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIGxldCBzdWJzY3JpcHRpb25Ub0NoYW5uZWwgPSB0aGlzLmdhbWVzRmlsZVNlcnZpY2UuZ2FtZXNDaGFubmVsLnN1YnNjcmliZSgoZ2FtZXMpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaGlkZVByb2dyZXNzKCk7XG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVzID0gZ2FtZXNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChzdWJzY3JpcHRpb25Ub0F1dGgpO1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChzdWJzY3JpcHRpb25Ub0NoYW5uZWwpO1xuICAgIH1cblxuICAgIG9uVGV4dENoYW5nZWQoYXJncykge1xuXG4gICAgICAgIGxldCBzZWFyY2hCYXIgPSA8U2VhcmNoQmFyPmFyZ3Mub2JqZWN0O1xuICAgICAgICBsZXQgc2VhcmNoVmFsdWUgPSBzZWFyY2hCYXIudGV4dDtcbiAgICAgICAgbGV0IHN1YnNjcmlwdGlvbiA9IHRoaXMuZ2FtZXNGaWxlU2VydmljZS5nZXRHYW1lcyhzZWFyY2hWYWx1ZSwgdGhpcy5maWx0ZXIpO1xuICAgIH1cblxuICAgIG9uU2hvd0NvbnNvbGVDaG9vc2VyKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuaXNTaG93Q29uc29sZUNob29zZXIgPSAhdGhpcy5pc1Nob3dDb25zb2xlQ2hvb3NlcjtcbiAgICAgICAgaWYgKCF0aGlzLmlzU2hvd0NvbnNvbGVDaG9vc2VyKSB7XG4gICAgICAgICAgICB0aGlzLmdldEdhbWVzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblNob3dXaG9DaG9vc2VyKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuaXNTaG93V2hvQ2hvb3NlciA9ICF0aGlzLmlzU2hvd1dob0Nob29zZXI7XG4gICAgICAgIGlmICghdGhpcy5pc1Nob3dXaG9DaG9vc2VyKSB7XG4gICAgICAgICAgICB0aGlzLmdldEdhbWVzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkNsZWFyRmlsdGVyKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZmlsdGVyID0ge1xuICAgICAgICAgICAgY29uc29sZTogXCJcIixcbiAgICAgICAgICAgIHdobzogXCJcIlxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmdldEdhbWVzKCk7XG4gICAgfVxuXG4gICAgb25DaG9vc2VXaGVyZShpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuY2hvc2VuQ29uc29sZUluZGV4ID0gaW5kZXg7XG4gICAgICAgIGlmIChOdW1iZXIuaXNOYU4oaW5kZXgpKSB7XG4gICAgICAgICAgICB0aGlzLmZpbHRlci5jb25zb2xlID0gVklERU9fR0FNRV9DT05TT0xFU1swXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyLmNvbnNvbGUgPSBWSURFT19HQU1FX0NPTlNPTEVTW2luZGV4XTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQ2hvb3NlV2hvKGluZGV4KSB7XG4gICAgICAgIHRoaXMuY2hvc2VuV2hvSW5kZXggPSBpbmRleDtcbiAgICAgICAgaWYgKE51bWJlci5pc05hTihpbmRleCkpIHtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyLndobyA9IFdIT1swXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyLndobyA9IFdIT1tpbmRleF07XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uSXRlbVRhcChldmVudCkge1xuICAgICAgICAvLyBsZXQgcm91dGUgPSBuZXcgQWN0aXZhdGVkUm91dGUoKTtcbiAgICAgICAgLy8gcm91dGUucGFyYW1zID0gT2JzZXJ2YWJsZS5vZih0aGlzLmdhbWVzW2V2ZW50LmluZGV4XSk7XG4gICAgICAgIC8vIHRoaXMucGFnZVJvdXRlLmFjdGl2YXRlZFJvdXRlLm5leHQobmV3IEFjdGl2YXRlZFJvdXRlKCkpO1xuICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiZGV0YWlsc1wiLCB0aGlzLmdhbWVzW2V2ZW50LmluZGV4XS5pZF0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0R2FtZXMoKSB7XG4gICAgICAgIGxldCBzdWJzY3JpcHRpb24gPSB0aGlzLmdhbWVzRmlsZVNlcnZpY2UuZ2V0R2FtZXMoXCJcIiwgdGhpcy5maWx0ZXIpO1xuICAgIH1cbn1cbiJdfQ==