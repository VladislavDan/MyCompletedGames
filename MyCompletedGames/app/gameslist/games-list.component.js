"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dialogs = require("ui/dialogs");
var _ = require("lodash");
var fs = require("tns-core-modules/file-system");
var GamesFileService_1 = require("../services/GamesFileService");
var GoogleAuthService_1 = require("../services/GoogleAuthService");
var GoogleFileSyncService_1 = require("../services/GoogleFileSyncService");
var Constants_1 = require("../common/Constants");
var BaseComponent_1 = require("../common/BaseComponent");
var nativescript_angular_1 = require("nativescript-angular");
var FirstUploadModel_1 = require("../common/FirstUploadModel");
var Subscriber_1 = require("rxjs/Subscriber");
var image_source_1 = require("tns-core-modules/image-source");
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
        var subscriptionGamesChannel = this.gamesFileService.gamesChannel
            .concatMap(function (games) {
            console.dir(games);
            _this.zone.run(function () {
                _this.games = games;
            });
            return games;
        })
            .map(function (game) {
            var documents = fs.knownFolders.documents();
            var imageFile = documents.getFile(game.id.toString());
            var source = image_source_1.fromBase64(game.images[0].replace("data:image/jpeg;base64,", "").toString());
            source.saveToFile(imageFile.path, "jpeg");
            return game;
        })
            .subscribe(function (game) {
            _this.hideProgress();
        }, function (error) {
            _this.hideProgress();
            _this.showAlert({
                title: "Showing games",
                message: error.message
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
            .subscribe(function () {
            _this.hideProgress();
        }, function (error) {
            _this.createGamesLoadingSubscriber();
        });
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
            _this.hideProgress();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZXMtbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnYW1lcy1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF3RDtBQUV4RCxvQ0FBc0M7QUFDdEMsMEJBQTRCO0FBQzVCLGlEQUFtRDtBQUduRCxpRUFBOEQ7QUFDOUQsbUVBQWdFO0FBQ2hFLDJFQUF3RTtBQUN4RSxpREFBMkU7QUFFM0UseURBQXNEO0FBQ3RELDZEQUFzRDtBQUN0RCwrREFBOEQ7QUFDOUQsOENBQTJDO0FBQzNDLDhEQUF5RDtBQVF6RDtJQUF3QyxzQ0FBYTtJQWtCakQsNEJBQW9CLGlCQUFvQyxFQUNwQyxxQkFBNEMsRUFDNUMsZ0JBQWtDLEVBQ2xDLGdCQUFrQyxFQUNsQyxJQUFZO1FBSmhDLFlBS0ksaUJBQU8sU0FPVjtRQVptQix1QkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLDJCQUFxQixHQUFyQixxQkFBcUIsQ0FBdUI7UUFDNUMsc0JBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxzQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLFVBQUksR0FBSixJQUFJLENBQVE7UUFsQnpCLGNBQVEsR0FBa0IsK0JBQW1CLENBQUM7UUFFOUMsU0FBRyxHQUFrQixlQUFHLENBQUM7UUFFekIsV0FBSyxHQUFnQixFQUFFLENBQUM7UUFnQjNCLEtBQUksQ0FBQyxNQUFNLEdBQUc7WUFDVixPQUFPLEVBQUUsRUFBRTtZQUNYLEdBQUcsRUFBRSxFQUFFO1NBQ1YsQ0FBQztRQUNGLEtBQUksQ0FBQyxvQkFBb0IsR0FBRyxLQUFLLENBQUM7UUFDbEMsS0FBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQzs7SUFDbEMsQ0FBQztJQUVELHFDQUFRLEdBQVI7UUFBQSxpQkE0Q0M7UUEzQ0csSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BCLElBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGlC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S0FBSztZQUNGLEtBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUNwQixLQUFJLENBQUMsU0FBUyxDQUFDO2dCQUNYLEtBQUssRUFBRSxlQUFlO2dCQUN0QixPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU87YUFDekIsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUNKLENBQUE7SUFDTCxDQUFDO0lBRU8scUNBQVEsR0FBaEI7UUFDSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQXRPUSxrQkFBa0I7UUFOOUIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsNkJBQTZCO1lBQzFDLFNBQVMsRUFBRSxDQUFDLGtCQUFrQixDQUFDO1NBQ2xDLENBQUM7eUNBbUJ5QyxxQ0FBaUI7WUFDYiw2Q0FBcUI7WUFDMUIsbUNBQWdCO1lBQ2hCLHVDQUFnQjtZQUM1QixhQUFNO09BdEJ2QixrQkFBa0IsQ0F1TzlCO0lBQUQseUJBQUM7Q0FBQSxBQXZPRCxDQUF3Qyw2QkFBYSxHQXVPcEQ7QUF2T1ksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE5nWm9uZSwgT25Jbml0fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQge1NlYXJjaEJhcn0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvc2VhcmNoLWJhclwiO1xyXG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQgKiBhcyBmcyBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9maWxlLXN5c3RlbVwiO1xyXG5cclxuaW1wb3J0IHtHYW1lfSBmcm9tIFwiLi4vY29tbW9uL0dhbWVcIjtcclxuaW1wb3J0IHtHYW1lc0ZpbGVTZXJ2aWNlfSBmcm9tIFwiLi4vc2VydmljZXMvR2FtZXNGaWxlU2VydmljZVwiO1xyXG5pbXBvcnQge0dvb2dsZUF1dGhTZXJ2aWNlfSBmcm9tIFwiLi4vc2VydmljZXMvR29vZ2xlQXV0aFNlcnZpY2VcIjtcclxuaW1wb3J0IHtHb29nbGVGaWxlU3luY1NlcnZpY2V9IGZyb20gXCIuLi9zZXJ2aWNlcy9Hb29nbGVGaWxlU3luY1NlcnZpY2VcIjtcclxuaW1wb3J0IHtBRERfTkVXX0ZJTEUsIFZJREVPX0dBTUVfQ09OU09MRVMsIFdIT30gZnJvbSBcIi4uL2NvbW1vbi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHtGaWx0ZXJ9IGZyb20gXCIuLi9jb21tb24vRmlsdGVyXCI7XHJcbmltcG9ydCB7QmFzZUNvbXBvbmVudH0gZnJvbSBcIi4uL2NvbW1vbi9CYXNlQ29tcG9uZW50XCI7XHJcbmltcG9ydCB7Um91dGVyRXh0ZW5zaW9uc30gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyXCI7XHJcbmltcG9ydCB7RklSU1RfVVBMT0FEX01PREVMfSBmcm9tIFwiLi4vY29tbW9uL0ZpcnN0VXBsb2FkTW9kZWxcIjtcclxuaW1wb3J0IHtTdWJzY3JpYmVyfSBmcm9tIFwicnhqcy9TdWJzY3JpYmVyXCI7XHJcbmltcG9ydCB7ZnJvbUJhc2U2NH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvaW1hZ2Utc291cmNlXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcImdhbWVzLWxpc3RcIixcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2dhbWVzLWxpc3QuY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogWycuL2dhbWVzLWxpc3QuY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIEdhbWVzTGlzdENvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICAgIHByaXZhdGUgZmlsdGVyOiBGaWx0ZXI7XHJcblxyXG4gICAgcHVibGljIGNvbnNvbGVzOiBBcnJheTxTdHJpbmc+ID0gVklERU9fR0FNRV9DT05TT0xFUztcclxuXHJcbiAgICBwdWJsaWMgd2hvOiBBcnJheTxTdHJpbmc+ID0gV0hPO1xyXG5cclxuICAgIHB1YmxpYyBnYW1lczogQXJyYXk8R2FtZT4gPSBbXTtcclxuXHJcbiAgICBwdWJsaWMgaXNTaG93Q29uc29sZUNob29zZXI6IGJvb2xlYW47XHJcblxyXG4gICAgcHVibGljIGlzU2hvd1dob0Nob29zZXI6IGJvb2xlYW47XHJcblxyXG4gICAgcHVibGljIGNob3NlbkNvbnNvbGVJbmRleDogbnVtYmVyO1xyXG5cclxuICAgIHB1YmxpYyBjaG9zZW5XaG9JbmRleDogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZ29vZ2xlQXV0aFNlcnZpY2U6IEdvb2dsZUF1dGhTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBnb29nbGVGaWxlU3luY1NlcnZpY2U6IEdvb2dsZUZpbGVTeW5jU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgZ2FtZXNGaWxlU2VydmljZTogR2FtZXNGaWxlU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgem9uZTogTmdab25lKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLmZpbHRlciA9IHtcclxuICAgICAgICAgICAgY29uc29sZTogXCJcIixcclxuICAgICAgICAgICAgd2hvOiBcIlwiXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmlzU2hvd0NvbnNvbGVDaG9vc2VyID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc1Nob3dXaG9DaG9vc2VyID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zaG93UHJvZ3Jlc3MoKTtcclxuICAgICAgICBsZXQgc3Vic2NyaXB0aW9uQXV0aCA9IHRoaXMuZ29vZ2xlQXV0aFNlcnZpY2UuZ2V0VG9rZW4oKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25SZWxvYWQobnVsbCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlUHJvZ3Jlc3MoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0FsZXJ0KHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJBdXRob3JpemF0aW9uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogZXJyb3IubWVzc2FnZVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgICAgIGxldCBzdWJzY3JpcHRpb25HYW1lc0NoYW5uZWwgPSB0aGlzLmdhbWVzRmlsZVNlcnZpY2UuZ2FtZXNDaGFubmVsXHJcbiAgICAgICAgICAgIC5jb25jYXRNYXAoKGdhbWVzOiBBcnJheTxHYW1lPikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5kaXIoZ2FtZXMpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lcyA9IGdhbWVzO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2FtZXM7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5tYXAoKGdhbWUpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBkb2N1bWVudHMgPSBmcy5rbm93bkZvbGRlcnMuZG9jdW1lbnRzKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW1hZ2VGaWxlID0gZG9jdW1lbnRzLmdldEZpbGUoZ2FtZS5pZC50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgIGxldCBzb3VyY2UgPSBmcm9tQmFzZTY0KGdhbWUuaW1hZ2VzWzBdLnJlcGxhY2UoXCJkYXRhOmltYWdlL2pwZWc7YmFzZTY0LFwiLCBcIlwiKS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgIHNvdXJjZS5zYXZlVG9GaWxlKGltYWdlRmlsZS5wYXRoLCBcImpwZWdcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2FtZTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAgIChnYW1lKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlUHJvZ3Jlc3MoKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGVQcm9ncmVzcygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0FsZXJ0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiU2hvd2luZyBnYW1lc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBlcnJvci5tZXNzYWdlXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKHN1YnNjcmlwdGlvbkF1dGgpO1xyXG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKHN1YnNjcmlwdGlvbkdhbWVzQ2hhbm5lbCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25UZXh0Q2hhbmdlZChhcmdzKSB7XHJcblxyXG4gICAgICAgIGxldCBzZWFyY2hCYXIgPSA8U2VhcmNoQmFyPmFyZ3Mub2JqZWN0O1xyXG4gICAgICAgIGxldCBzZWFyY2hWYWx1ZSA9IHNlYXJjaEJhci50ZXh0O1xyXG4gICAgICAgIHRoaXMuZ2FtZXNGaWxlU2VydmljZS5nZXRHYW1lcyhzZWFyY2hWYWx1ZSwgdGhpcy5maWx0ZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uU2hvd0NvbnNvbGVDaG9vc2VyKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5pc1Nob3dDb25zb2xlQ2hvb3NlciA9ICF0aGlzLmlzU2hvd0NvbnNvbGVDaG9vc2VyO1xyXG4gICAgICAgIGlmICghdGhpcy5pc1Nob3dDb25zb2xlQ2hvb3Nlcikge1xyXG4gICAgICAgICAgICB0aGlzLmdldEdhbWVzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uU2hvd1dob0Nob29zZXIoZXZlbnQpIHtcclxuICAgICAgICB0aGlzLmlzU2hvd1dob0Nob29zZXIgPSAhdGhpcy5pc1Nob3dXaG9DaG9vc2VyO1xyXG4gICAgICAgIGlmICghdGhpcy5pc1Nob3dXaG9DaG9vc2VyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0R2FtZXMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25DbGVhckZpbHRlcihldmVudCkge1xyXG4gICAgICAgIHRoaXMuZmlsdGVyID0ge1xyXG4gICAgICAgICAgICBjb25zb2xlOiBcIlwiLFxyXG4gICAgICAgICAgICB3aG86IFwiXCJcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuZ2V0R2FtZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkNob29zZVdoZXJlKGluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmNob3NlbkNvbnNvbGVJbmRleCA9IGluZGV4O1xyXG4gICAgICAgIGlmIChOdW1iZXIuaXNOYU4oaW5kZXgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyLmNvbnNvbGUgPSBWSURFT19HQU1FX0NPTlNPTEVTWzBdO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyLmNvbnNvbGUgPSBWSURFT19HQU1FX0NPTlNPTEVTW2luZGV4XTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25DaG9vc2VXaG8oaW5kZXgpIHtcclxuICAgICAgICB0aGlzLmNob3Nlbldob0luZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgaWYgKE51bWJlci5pc05hTihpbmRleCkpIHtcclxuICAgICAgICAgICAgdGhpcy5maWx0ZXIud2hvID0gV0hPWzBdO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyLndobyA9IFdIT1tpbmRleF07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uSXRlbVRhcChldmVudCkge1xyXG4gICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCJkZXRhaWxzXCIsIHRoaXMuZ2FtZXNbZXZlbnQuaW5kZXhdLmlkXSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25SZWxvYWQoZXZlbnQpIHtcclxuICAgICAgICB0aGlzLnNob3dQcm9ncmVzcygpO1xyXG4gICAgICAgIHRoaXMucmVsb2FkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWxvYWQoKSB7XHJcbiAgICAgICAgbGV0IHN1YnNjcmlwdGlvbiA9IHRoaXMuZ29vZ2xlRmlsZVN5bmNTZXJ2aWNlLmdldEV4aXN0RmlsZXModGhpcy5nb29nbGVBdXRoU2VydmljZS5nZXRUb2tlbkZyb21TdG9yYWdlKCkpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgICAgICAocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlUHJvZ3Jlc3MoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dDaG9vc2VyRGlhbG9nKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlUHJvZ3Jlc3MoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dBbGVydCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlNob3dpbmcgZXhpc3QgZmlsZXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogZXJyb3IubWVzc2FnZVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKHN1YnNjcmlwdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzaG93Q2hvb3NlckRpYWxvZyhyZXN1bHQpIHtcclxuICAgICAgICBsZXQgb3B0aW9ucyA9IF8ubWFwKHJlc3VsdCwgKGl0ZW06IGFueSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gaXRlbS5pZDtcclxuICAgICAgICB9KTtcclxuICAgICAgICBvcHRpb25zLnB1c2goQUREX05FV19GSUxFKTtcclxuICAgICAgICBkaWFsb2dzLmFjdGlvbih7XHJcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiQ2hvb3NlIGZpbGVcIixcclxuICAgICAgICAgICAgYWN0aW9uczogb3B0aW9uc1xyXG4gICAgICAgIH0pLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgbGV0IHN1YnNjcmlwdGlvbjtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gQUREX05FV19GSUxFKSB7XHJcbiAgICAgICAgICAgICAgICBzdWJzY3JpcHRpb24gPSB0aGlzLmNyZWF0ZUFuZExvYWRGaWxlKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzdWx0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbiA9IHRoaXMubG9hZEZpbGUocmVzdWx0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChzdWJzY3JpcHRpb24pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY3JlYXRlQW5kTG9hZEZpbGUoKSB7XHJcbiAgICAgICAgdGhpcy5zaG93UHJvZ3Jlc3MoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5nb29nbGVGaWxlU3luY1NlcnZpY2UuY3JlYXRlQ29tcGxldGVkR2FtZXNGb2xkZXIodGhpcy5nb29nbGVBdXRoU2VydmljZS5nZXRUb2tlbkZyb21TdG9yYWdlKCkpXHJcbiAgICAgICAgICAgIC5zd2l0Y2hNYXAoKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ29vZ2xlRmlsZVN5bmNTZXJ2aWNlLmNyZWF0ZUNvbXBsZXRlZEdhbWVzRmlsZShcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdvb2dsZUF1dGhTZXJ2aWNlLmdldFRva2VuRnJvbVN0b3JhZ2UoKSxcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5zd2l0Y2hNYXAoKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nb29nbGVGaWxlU3luY1NlcnZpY2Uuc2V0RmlsZUlkVG9TdG9yYWdlKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nb29nbGVGaWxlU3luY1NlcnZpY2UucmVxdWVzdFVwbG9hZEZpbGUodGhpcy5nb29nbGVBdXRoU2VydmljZS5nZXRUb2tlbkZyb21TdG9yYWdlKCksIEpTT04uc3RyaW5naWZ5KEZJUlNUX1VQTE9BRF9NT0RFTCksIHJlc3VsdCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5zd2l0Y2hNYXAoKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ29vZ2xlRmlsZVN5bmNTZXJ2aWNlLnJlcXVlc3RMb2FkRmlsZSh0aGlzLmdvb2dsZUF1dGhTZXJ2aWNlLmdldFRva2VuRnJvbVN0b3JhZ2UoKSwgcmVzdWx0KTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnN3aXRjaE1hcCgocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nYW1lc0ZpbGVTZXJ2aWNlLnVwZGF0ZUZpbGUocmVzdWx0KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZVByb2dyZXNzKCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVHYW1lc0xvYWRpbmdTdWJzY3JpYmVyKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBsb2FkRmlsZShyZXN1bHQpIHtcclxuICAgICAgICB0aGlzLmdvb2dsZUZpbGVTeW5jU2VydmljZS5zZXRGaWxlSWRUb1N0b3JhZ2UocmVzdWx0KTtcclxuICAgICAgICB0aGlzLnNob3dQcm9ncmVzcygpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdvb2dsZUZpbGVTeW5jU2VydmljZS5yZXF1ZXN0TG9hZEZpbGUodGhpcy5nb29nbGVBdXRoU2VydmljZS5nZXRUb2tlbkZyb21TdG9yYWdlKCksIHJlc3VsdClcclxuICAgICAgICAgICAgLnN3aXRjaE1hcCgocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nYW1lc0ZpbGVTZXJ2aWNlLnVwZGF0ZUZpbGUocmVzdWx0KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVHYW1lc0xvYWRpbmdTdWJzY3JpYmVyKClcclxuICAgICAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNyZWF0ZUdhbWVzTG9hZGluZ1N1YnNjcmliZXIoKTogU3Vic2NyaWJlcjxhbnk+IHtcclxuICAgICAgICByZXR1cm4gU3Vic2NyaWJlci5jcmVhdGUoXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGlkZVByb2dyZXNzKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVzRmlsZVNlcnZpY2UuZ2V0R2FtZXMoXCJcIiwgdGhpcy5maWx0ZXIpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGlkZVByb2dyZXNzKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dBbGVydCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiTG9hZGluZyBnYW1lc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2VcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0R2FtZXMoKSB7XHJcbiAgICAgICAgdGhpcy5nYW1lc0ZpbGVTZXJ2aWNlLmdldEdhbWVzKFwiXCIsIHRoaXMuZmlsdGVyKTtcclxuICAgIH1cclxufVxyXG4iXX0=