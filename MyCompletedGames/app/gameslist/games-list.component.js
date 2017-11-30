"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dialogs = require("ui/dialogs");
var _ = require("lodash");
var GamesFileService_1 = require("../services/GamesFileService");
var GoogleAuthService_1 = require("../services/GoogleAuthService");
var GoogleFileSyncService_1 = require("../services/GoogleFileSyncService");
var Constants_1 = require("../common/Constants");
var BaseComponent_1 = require("../common/BaseComponent");
var nativescript_angular_1 = require("nativescript-angular");
var FirstUploadModel_1 = require("../common/FirstUploadModel");
var Subscriber_1 = require("rxjs/Subscriber");
var GamesListComponent = /** @class */ (function (_super) {
    __extends(GamesListComponent, _super);
    function GamesListComponent(googleAuthService, googleFileSyncService, gamesFileService, routerExtensions, zone) {
        var _this = _super.call(this) || this;
        _this.googleAuthService = googleAuthService;
        _this.googleFileSyncService = googleFileSyncService;
        _this.gamesFileService = gamesFileService;
        _this.routerExtensions = routerExtensions;
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
        var subscriptionAuth = this.googleAuthService.getToken().subscribe(function (result) {
            _this.onReload(null);
        }, function (error) {
            _this.hideProgress();
            _this.showAlert({
                title: "Authorization",
                message: error.message
            });
        });
        var subscriptionGamesChannel = this.gamesFileService.gamesChannel.subscribe(function (games) {
            _this.hideProgress();
            _this.zone.run(function () {
                _this.games = games;
            });
        });
        this.subscriptions.push(subscriptionAuth);
        this.subscriptions.push(subscriptionGamesChannel);
    };
    GamesListComponent.prototype.onTextChanged = function (args) {
        var searchBar = args.object;
        var searchValue = searchBar.text;
        this.gamesFileService.getGames(searchValue, this.filter);
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
        this.routerExtensions.navigate(["details", this.games[event.index].id]);
    };
    GamesListComponent.prototype.onReload = function (event) {
        this.showProgress();
        this.reload();
    };
    GamesListComponent.prototype.reload = function () {
        var _this = this;
        var subscription = this.googleFileSyncService.getExistFiles(this.googleAuthService.getTokenFromStorage())
            .subscribe(function (result) {
            _this.hideProgress();
            _this.showChooserDialog(result);
        }, function (error) {
            _this.hideProgress();
            console.dir(error);
            _this.showAlert({
                title: "Showing exist files",
                message: error.message
            });
        });
        this.subscriptions.push(subscription);
    };
    GamesListComponent.prototype.showChooserDialog = function (result) {
        var _this = this;
        var options = _.map(result, function (item) {
            return item.id;
        });
        options.push(Constants_1.ADD_NEW_FILE);
        dialogs.action({
            message: "Choose file",
            actions: options
        }).then(function (result) {
            var subscription;
            if (result === Constants_1.ADD_NEW_FILE) {
                subscription = _this.createAndLoadFile();
            }
            else if (result.length > 0) {
                subscription = _this.loadFile(result);
            }
            _this.subscriptions.push(subscription);
        });
    };
    GamesListComponent.prototype.createAndLoadFile = function () {
        var _this = this;
        this.showProgress();
        return this.googleFileSyncService.createCompletedGamesFolder(this.googleAuthService.getTokenFromStorage())
            .switchMap(function (result) {
            return _this.googleFileSyncService.createCompletedGamesFile(_this.googleAuthService.getTokenFromStorage(), result);
        })
            .switchMap(function (result) {
            _this.googleFileSyncService.setFileIdToStorage(result);
            return _this.googleFileSyncService.requestUploadFile(_this.googleAuthService.getTokenFromStorage(), JSON.stringify(FirstUploadModel_1.FIRST_UPLOAD_MODEL), result);
        })
            .switchMap(function (result) {
            return _this.googleFileSyncService.requestLoadFile(_this.googleAuthService.getTokenFromStorage(), result);
        })
            .switchMap(function (result) {
            return _this.gamesFileService.updateFile(result);
        })
            .subscribe(this.createGamesLoadingSubscriber());
    };
    GamesListComponent.prototype.loadFile = function (result) {
        var _this = this;
        this.googleFileSyncService.setFileIdToStorage(result);
        this.showProgress();
        return this.googleFileSyncService.requestLoadFile(this.googleAuthService.getTokenFromStorage(), result)
            .switchMap(function (result) {
            return _this.gamesFileService.updateFile(result);
        })
            .subscribe(this.createGamesLoadingSubscriber());
    };
    GamesListComponent.prototype.createGamesLoadingSubscriber = function () {
        var _this = this;
        return Subscriber_1.Subscriber.create(function () {
            _this.gamesFileService.getGames("", _this.filter);
        }, function (error) {
            _this.hideProgress();
            _this.showAlert({
                title: "Loading games",
                message: error.message
            });
        });
    };
    GamesListComponent.prototype.getGames = function () {
        this.gamesFileService.getGames("", this.filter);
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
            core_1.NgZone])
    ], GamesListComponent);
    return GamesListComponent;
}(BaseComponent_1.BaseComponent));
exports.GamesListComponent = GamesListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZXMtbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnYW1lcy1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF3RDtBQUV4RCxvQ0FBc0M7QUFDdEMsMEJBQTRCO0FBRzVCLGlFQUE4RDtBQUM5RCxtRUFBZ0U7QUFDaEUsMkVBQXdFO0FBQ3hFLGlEQUEyRTtBQUUzRSx5REFBc0Q7QUFDdEQsNkRBQXNEO0FBQ3RELCtEQUE4RDtBQUM5RCw4Q0FBMkM7QUFRM0M7SUFBd0Msc0NBQWE7SUFrQmpELDRCQUFvQixpQkFBb0MsRUFDcEMscUJBQTRDLEVBQzVDLGdCQUFrQyxFQUNsQyxnQkFBa0MsRUFDbEMsSUFBWTtRQUpoQyxZQUtJLGlCQUFPLFNBT1Y7UUFabUIsdUJBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQywyQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO1FBQzVDLHNCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsc0JBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxVQUFJLEdBQUosSUFBSSxDQUFRO1FBbEJ6QixjQUFRLEdBQWtCLCtCQUFtQixDQUFDO1FBRTlDLFNBQUcsR0FBa0IsZUFBRyxDQUFDO1FBRXpCLFdBQUssR0FBZ0IsRUFBRSxDQUFDO1FBZ0IzQixLQUFJLENBQUMsTUFBTSxHQUFHO1lBQ1YsT0FBTyxFQUFFLEVBQUU7WUFDWCxHQUFHLEVBQUUsRUFBRTtTQUNWLENBQUM7UUFDRixLQUFJLENBQUMsb0JBQW9CLEdBQUcsS0FBSyxDQUFDO1FBQ2xDLEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7O0lBQ2xDLENBQUM7SUFFRCxxQ0FBUSxHQUFSO1FBQUEsaUJBdUJDO1FBdEJHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNwQixJQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxTQUFTLENBQzlELFVBQUMsTUFBTTtZQUNILEtBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEIsQ0FBQyxFQUNELFVBQUMsS0FBSztZQUNGLEtBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUNwQixLQUFJLENBQUMsU0FBUyxDQUFDO2dCQUNYLEtBQUssRUFBRSxlQUFlO2dCQUN0QixPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU87YUFDekIsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUNKLENBQUM7UUFDRixJQUFJLHdCQUF3QixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLFVBQUMsS0FBSztZQUM5RSxLQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDcEIsS0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7Z0JBQ1YsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUE7WUFDdEIsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRUQsMENBQWEsR0FBYixVQUFjLElBQUk7UUFFZCxJQUFJLFNBQVMsR0FBYyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3ZDLElBQUksV0FBVyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUM7UUFDakMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRCxpREFBb0IsR0FBcEIsVUFBcUIsS0FBSztRQUN0QixJQUFJLENBQUMsb0JBQW9CLEdBQUcsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUM7UUFDdkQsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNwQixDQUFDO0lBQ0wsQ0FBQztJQUVELDZDQUFnQixHQUFoQixVQUFpQixLQUFLO1FBQ2xCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUMvQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7WUFDekIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3BCLENBQUM7SUFDTCxDQUFDO0lBRUQsMENBQWEsR0FBYixVQUFjLEtBQUs7UUFDZixJQUFJLENBQUMsTUFBTSxHQUFHO1lBQ1YsT0FBTyxFQUFFLEVBQUU7WUFDWCxHQUFHLEVBQUUsRUFBRTtTQUNWLENBQUM7UUFDRixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVELDBDQUFhLEdBQWIsVUFBYyxLQUFhO1FBQ3ZCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7UUFDaEMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsK0JBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakQsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsK0JBQW1CLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckQsQ0FBQztJQUNMLENBQUM7SUFFRCx3Q0FBVyxHQUFYLFVBQVksS0FBSztRQUNiLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1FBQzVCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLGVBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3QixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxlQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakMsQ0FBQztJQUNMLENBQUM7SUFFRCxzQ0FBUyxHQUFULFVBQVUsS0FBSztRQUNYLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM1RSxDQUFDO0lBRUQscUNBQVEsR0FBUixVQUFTLEtBQUs7UUFDVixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFFTyxtQ0FBTSxHQUFkO1FBQUEsaUJBaUJDO1FBaEJHLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLG1CQUFtQixFQUFFLENBQUM7YUFDcEcsU0FBUyxDQUNOLFVBQUMsTUFBTTtZQUNILEtBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUNwQixLQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbkMsQ0FBQyxFQUNELFVBQUMsS0FBSztZQUNGLEtBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25CLEtBQUksQ0FBQyxTQUFTLENBQUM7Z0JBQ1gsS0FBSyxFQUFFLHFCQUFxQjtnQkFDNUIsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPO2FBQ3pCLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FDSixDQUFDO1FBQ04sSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVPLDhDQUFpQixHQUF6QixVQUEwQixNQUFNO1FBQWhDLGlCQWlCQztRQWhCRyxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxVQUFDLElBQVM7WUFDbEMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLENBQUMsSUFBSSxDQUFDLHdCQUFZLENBQUMsQ0FBQztRQUMzQixPQUFPLENBQUMsTUFBTSxDQUFDO1lBQ1gsT0FBTyxFQUFFLGFBQWE7WUFDdEIsT0FBTyxFQUFFLE9BQU87U0FDbkIsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU07WUFDVixJQUFJLFlBQVksQ0FBQztZQUNqQixFQUFFLENBQUMsQ0FBQyxNQUFNLEtBQUssd0JBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLFlBQVksR0FBRyxLQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUM1QyxDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0IsWUFBWSxHQUFHLEtBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDekMsQ0FBQztZQUNELEtBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzFDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVPLDhDQUFpQixHQUF6QjtRQUFBLGlCQXNCQztRQXJCRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEIsTUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsbUJBQW1CLEVBQUUsQ0FBQzthQUNyRyxTQUFTLENBQUMsVUFBQyxNQUFNO1lBQ2QsTUFBTSxDQUFDLEtBQUksQ0FBQyxxQkFBcUIsQ0FBQyx3QkFBd0IsQ0FDdEQsS0FBSSxDQUFDLGlCQUFpQixDQUFDLG1CQUFtQixFQUFFLEVBQzVDLE1BQU0sQ0FDVCxDQUFDO1FBQ04sQ0FBQyxDQUFDO2FBQ0QsU0FBUyxDQUFDLFVBQUMsTUFBTTtZQUNkLEtBQUksQ0FBQyxxQkFBcUIsQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN0RCxNQUFNLENBQUMsS0FBSSxDQUFDLHFCQUFxQixDQUFDLGlCQUFpQixDQUFDLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxtQkFBbUIsRUFBRSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMscUNBQWtCLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNsSixDQUFDLENBQUM7YUFDRCxTQUFTLENBQUMsVUFBQyxNQUFNO1lBQ2QsTUFBTSxDQUFDLEtBQUksQ0FBQyxxQkFBcUIsQ0FBQyxlQUFlLENBQUMsS0FBSSxDQUFDLGlCQUFpQixDQUFDLG1CQUFtQixFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDNUcsQ0FBQyxDQUFDO2FBQ0QsU0FBUyxDQUFDLFVBQUMsTUFBTTtZQUNkLE1BQU0sQ0FBQyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQ25ELENBQUMsQ0FBQzthQUNELFNBQVMsQ0FDTixJQUFJLENBQUMsNEJBQTRCLEVBQUUsQ0FDdEMsQ0FBQztJQUNWLENBQUM7SUFFTyxxQ0FBUSxHQUFoQixVQUFpQixNQUFNO1FBQXZCLGlCQVVDO1FBVEcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNwQixNQUFNLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsbUJBQW1CLEVBQUUsRUFBRSxNQUFNLENBQUM7YUFDbEcsU0FBUyxDQUFDLFVBQUMsTUFBTTtZQUNkLE1BQU0sQ0FBQyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQ25ELENBQUMsQ0FBQzthQUNELFNBQVMsQ0FDTixJQUFJLENBQUMsNEJBQTRCLEVBQUUsQ0FDdEMsQ0FBQztJQUNWLENBQUM7SUFFTyx5REFBNEIsR0FBcEM7UUFBQSxpQkFhQztRQVpHLE1BQU0sQ0FBQyx1QkFBVSxDQUFDLE1BQU0sQ0FDcEI7WUFDSSxLQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxLQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEQsQ0FBQyxFQUNELFVBQUMsS0FBSztZQUNGLEtBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUNwQixLQUFJLENBQUMsU0FBUyxDQUFDO2dCQUNYLEtBQUssRUFBRSxlQUFlO2dCQUN0QixPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU87YUFDekIsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUNKLENBQUE7SUFDTCxDQUFDO0lBRU8scUNBQVEsR0FBaEI7UUFDSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQTVNUSxrQkFBa0I7UUFOOUIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsNkJBQTZCO1lBQzFDLFNBQVMsRUFBRSxDQUFDLGtCQUFrQixDQUFDO1NBQ2xDLENBQUM7eUNBbUJ5QyxxQ0FBaUI7WUFDYiw2Q0FBcUI7WUFDMUIsbUNBQWdCO1lBQ2hCLHVDQUFnQjtZQUM1QixhQUFNO09BdEJ2QixrQkFBa0IsQ0E2TTlCO0lBQUQseUJBQUM7Q0FBQSxBQTdNRCxDQUF3Qyw2QkFBYSxHQTZNcEQ7QUE3TVksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE5nWm9uZSwgT25Jbml0fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtTZWFyY2hCYXJ9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3NlYXJjaC1iYXJcIjtcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInVpL2RpYWxvZ3NcIjtcbmltcG9ydCAqIGFzIF8gZnJvbSBcImxvZGFzaFwiO1xuXG5pbXBvcnQge0dhbWV9IGZyb20gXCIuLi9jb21tb24vR2FtZVwiO1xuaW1wb3J0IHtHYW1lc0ZpbGVTZXJ2aWNlfSBmcm9tIFwiLi4vc2VydmljZXMvR2FtZXNGaWxlU2VydmljZVwiO1xuaW1wb3J0IHtHb29nbGVBdXRoU2VydmljZX0gZnJvbSBcIi4uL3NlcnZpY2VzL0dvb2dsZUF1dGhTZXJ2aWNlXCI7XG5pbXBvcnQge0dvb2dsZUZpbGVTeW5jU2VydmljZX0gZnJvbSBcIi4uL3NlcnZpY2VzL0dvb2dsZUZpbGVTeW5jU2VydmljZVwiO1xuaW1wb3J0IHtBRERfTkVXX0ZJTEUsIFZJREVPX0dBTUVfQ09OU09MRVMsIFdIT30gZnJvbSBcIi4uL2NvbW1vbi9Db25zdGFudHNcIjtcbmltcG9ydCB7RmlsdGVyfSBmcm9tIFwiLi4vY29tbW9uL0ZpbHRlclwiO1xuaW1wb3J0IHtCYXNlQ29tcG9uZW50fSBmcm9tIFwiLi4vY29tbW9uL0Jhc2VDb21wb25lbnRcIjtcbmltcG9ydCB7Um91dGVyRXh0ZW5zaW9uc30gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyXCI7XG5pbXBvcnQge0ZJUlNUX1VQTE9BRF9NT0RFTH0gZnJvbSBcIi4uL2NvbW1vbi9GaXJzdFVwbG9hZE1vZGVsXCI7XG5pbXBvcnQge1N1YnNjcmliZXJ9IGZyb20gXCJyeGpzL1N1YnNjcmliZXJcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiZ2FtZXMtbGlzdFwiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9nYW1lcy1saXN0LmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbJy4vZ2FtZXMtbGlzdC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBHYW1lc0xpc3RDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIHByaXZhdGUgZmlsdGVyOiBGaWx0ZXI7XG5cbiAgICBwdWJsaWMgY29uc29sZXM6IEFycmF5PFN0cmluZz4gPSBWSURFT19HQU1FX0NPTlNPTEVTO1xuXG4gICAgcHVibGljIHdobzogQXJyYXk8U3RyaW5nPiA9IFdITztcblxuICAgIHB1YmxpYyBnYW1lczogQXJyYXk8R2FtZT4gPSBbXTtcblxuICAgIHB1YmxpYyBpc1Nob3dDb25zb2xlQ2hvb3NlcjogYm9vbGVhbjtcblxuICAgIHB1YmxpYyBpc1Nob3dXaG9DaG9vc2VyOiBib29sZWFuO1xuXG4gICAgcHVibGljIGNob3NlbkNvbnNvbGVJbmRleDogbnVtYmVyO1xuXG4gICAgcHVibGljIGNob3Nlbldob0luZGV4OiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGdvb2dsZUF1dGhTZXJ2aWNlOiBHb29nbGVBdXRoU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIGdvb2dsZUZpbGVTeW5jU2VydmljZTogR29vZ2xlRmlsZVN5bmNTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgZ2FtZXNGaWxlU2VydmljZTogR2FtZXNGaWxlU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSB6b25lOiBOZ1pvbmUpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5maWx0ZXIgPSB7XG4gICAgICAgICAgICBjb25zb2xlOiBcIlwiLFxuICAgICAgICAgICAgd2hvOiBcIlwiXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuaXNTaG93Q29uc29sZUNob29zZXIgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc1Nob3dXaG9DaG9vc2VyID0gZmFsc2U7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2hvd1Byb2dyZXNzKCk7XG4gICAgICAgIGxldCBzdWJzY3JpcHRpb25BdXRoID0gdGhpcy5nb29nbGVBdXRoU2VydmljZS5nZXRUb2tlbigpLnN1YnNjcmliZShcbiAgICAgICAgICAgIChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uUmVsb2FkKG51bGwpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZVByb2dyZXNzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93QWxlcnQoe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJBdXRob3JpemF0aW9uXCIsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2VcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgICAgbGV0IHN1YnNjcmlwdGlvbkdhbWVzQ2hhbm5lbCA9IHRoaXMuZ2FtZXNGaWxlU2VydmljZS5nYW1lc0NoYW5uZWwuc3Vic2NyaWJlKChnYW1lcykgPT4ge1xuICAgICAgICAgICAgdGhpcy5oaWRlUHJvZ3Jlc3MoKTtcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZXMgPSBnYW1lc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKHN1YnNjcmlwdGlvbkF1dGgpO1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChzdWJzY3JpcHRpb25HYW1lc0NoYW5uZWwpO1xuICAgIH1cblxuICAgIG9uVGV4dENoYW5nZWQoYXJncykge1xuXG4gICAgICAgIGxldCBzZWFyY2hCYXIgPSA8U2VhcmNoQmFyPmFyZ3Mub2JqZWN0O1xuICAgICAgICBsZXQgc2VhcmNoVmFsdWUgPSBzZWFyY2hCYXIudGV4dDtcbiAgICAgICAgdGhpcy5nYW1lc0ZpbGVTZXJ2aWNlLmdldEdhbWVzKHNlYXJjaFZhbHVlLCB0aGlzLmZpbHRlcik7XG4gICAgfVxuXG4gICAgb25TaG93Q29uc29sZUNob29zZXIoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5pc1Nob3dDb25zb2xlQ2hvb3NlciA9ICF0aGlzLmlzU2hvd0NvbnNvbGVDaG9vc2VyO1xuICAgICAgICBpZiAoIXRoaXMuaXNTaG93Q29uc29sZUNob29zZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0R2FtZXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uU2hvd1dob0Nob29zZXIoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5pc1Nob3dXaG9DaG9vc2VyID0gIXRoaXMuaXNTaG93V2hvQ2hvb3NlcjtcbiAgICAgICAgaWYgKCF0aGlzLmlzU2hvd1dob0Nob29zZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0R2FtZXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQ2xlYXJGaWx0ZXIoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5maWx0ZXIgPSB7XG4gICAgICAgICAgICBjb25zb2xlOiBcIlwiLFxuICAgICAgICAgICAgd2hvOiBcIlwiXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZ2V0R2FtZXMoKTtcbiAgICB9XG5cbiAgICBvbkNob29zZVdoZXJlKGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5jaG9zZW5Db25zb2xlSW5kZXggPSBpbmRleDtcbiAgICAgICAgaWYgKE51bWJlci5pc05hTihpbmRleCkpIHtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyLmNvbnNvbGUgPSBWSURFT19HQU1FX0NPTlNPTEVTWzBdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXIuY29uc29sZSA9IFZJREVPX0dBTUVfQ09OU09MRVNbaW5kZXhdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25DaG9vc2VXaG8oaW5kZXgpIHtcbiAgICAgICAgdGhpcy5jaG9zZW5XaG9JbmRleCA9IGluZGV4O1xuICAgICAgICBpZiAoTnVtYmVyLmlzTmFOKGluZGV4KSkge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXIud2hvID0gV0hPWzBdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXIud2hvID0gV0hPW2luZGV4XTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uSXRlbVRhcChldmVudCkge1xuICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiZGV0YWlsc1wiLCB0aGlzLmdhbWVzW2V2ZW50LmluZGV4XS5pZF0pO1xuICAgIH1cblxuICAgIG9uUmVsb2FkKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuc2hvd1Byb2dyZXNzKCk7XG4gICAgICAgIHRoaXMucmVsb2FkKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZWxvYWQoKSB7XG4gICAgICAgIGxldCBzdWJzY3JpcHRpb24gPSB0aGlzLmdvb2dsZUZpbGVTeW5jU2VydmljZS5nZXRFeGlzdEZpbGVzKHRoaXMuZ29vZ2xlQXV0aFNlcnZpY2UuZ2V0VG9rZW5Gcm9tU3RvcmFnZSgpKVxuICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZVByb2dyZXNzKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0Nob29zZXJEaWFsb2cocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGVQcm9ncmVzcygpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRpcihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0FsZXJ0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlNob3dpbmcgZXhpc3QgZmlsZXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2VcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goc3Vic2NyaXB0aW9uKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNob3dDaG9vc2VyRGlhbG9nKHJlc3VsdCkge1xuICAgICAgICBsZXQgb3B0aW9ucyA9IF8ubWFwKHJlc3VsdCwgKGl0ZW06IGFueSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0uaWQ7XG4gICAgICAgIH0pO1xuICAgICAgICBvcHRpb25zLnB1c2goQUREX05FV19GSUxFKTtcbiAgICAgICAgZGlhbG9ncy5hY3Rpb24oe1xuICAgICAgICAgICAgbWVzc2FnZTogXCJDaG9vc2UgZmlsZVwiLFxuICAgICAgICAgICAgYWN0aW9uczogb3B0aW9uc1xuICAgICAgICB9KS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICBsZXQgc3Vic2NyaXB0aW9uO1xuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gQUREX05FV19GSUxFKSB7XG4gICAgICAgICAgICAgICAgc3Vic2NyaXB0aW9uID0gdGhpcy5jcmVhdGVBbmRMb2FkRmlsZSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChyZXN1bHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbiA9IHRoaXMubG9hZEZpbGUocmVzdWx0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKHN1YnNjcmlwdGlvbik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlQW5kTG9hZEZpbGUoKSB7XG4gICAgICAgIHRoaXMuc2hvd1Byb2dyZXNzKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmdvb2dsZUZpbGVTeW5jU2VydmljZS5jcmVhdGVDb21wbGV0ZWRHYW1lc0ZvbGRlcih0aGlzLmdvb2dsZUF1dGhTZXJ2aWNlLmdldFRva2VuRnJvbVN0b3JhZ2UoKSlcbiAgICAgICAgICAgIC5zd2l0Y2hNYXAoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdvb2dsZUZpbGVTeW5jU2VydmljZS5jcmVhdGVDb21wbGV0ZWRHYW1lc0ZpbGUoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ29vZ2xlQXV0aFNlcnZpY2UuZ2V0VG9rZW5Gcm9tU3RvcmFnZSgpLFxuICAgICAgICAgICAgICAgICAgICByZXN1bHRcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zd2l0Y2hNYXAoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZ29vZ2xlRmlsZVN5bmNTZXJ2aWNlLnNldEZpbGVJZFRvU3RvcmFnZShyZXN1bHQpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdvb2dsZUZpbGVTeW5jU2VydmljZS5yZXF1ZXN0VXBsb2FkRmlsZSh0aGlzLmdvb2dsZUF1dGhTZXJ2aWNlLmdldFRva2VuRnJvbVN0b3JhZ2UoKSwgSlNPTi5zdHJpbmdpZnkoRklSU1RfVVBMT0FEX01PREVMKSwgcmVzdWx0KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3dpdGNoTWFwKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nb29nbGVGaWxlU3luY1NlcnZpY2UucmVxdWVzdExvYWRGaWxlKHRoaXMuZ29vZ2xlQXV0aFNlcnZpY2UuZ2V0VG9rZW5Gcm9tU3RvcmFnZSgpLCByZXN1bHQpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zd2l0Y2hNYXAoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdhbWVzRmlsZVNlcnZpY2UudXBkYXRlRmlsZShyZXN1bHQpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZUdhbWVzTG9hZGluZ1N1YnNjcmliZXIoKVxuICAgICAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGxvYWRGaWxlKHJlc3VsdCkge1xuICAgICAgICB0aGlzLmdvb2dsZUZpbGVTeW5jU2VydmljZS5zZXRGaWxlSWRUb1N0b3JhZ2UocmVzdWx0KTtcbiAgICAgICAgdGhpcy5zaG93UHJvZ3Jlc3MoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ29vZ2xlRmlsZVN5bmNTZXJ2aWNlLnJlcXVlc3RMb2FkRmlsZSh0aGlzLmdvb2dsZUF1dGhTZXJ2aWNlLmdldFRva2VuRnJvbVN0b3JhZ2UoKSwgcmVzdWx0KVxuICAgICAgICAgICAgLnN3aXRjaE1hcCgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2FtZXNGaWxlU2VydmljZS51cGRhdGVGaWxlKHJlc3VsdClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlR2FtZXNMb2FkaW5nU3Vic2NyaWJlcigpXG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlR2FtZXNMb2FkaW5nU3Vic2NyaWJlcigpOiBTdWJzY3JpYmVyPGFueT4ge1xuICAgICAgICByZXR1cm4gU3Vic2NyaWJlci5jcmVhdGUoXG4gICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lc0ZpbGVTZXJ2aWNlLmdldEdhbWVzKFwiXCIsIHRoaXMuZmlsdGVyKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGVQcm9ncmVzcygpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0FsZXJ0KHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiTG9hZGluZyBnYW1lc1wiLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBlcnJvci5tZXNzYWdlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIClcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEdhbWVzKCkge1xuICAgICAgICB0aGlzLmdhbWVzRmlsZVNlcnZpY2UuZ2V0R2FtZXMoXCJcIiwgdGhpcy5maWx0ZXIpO1xuICAgIH1cbn1cbiJdfQ==