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
        var subscriptionToAuth = this.googleAuthService.getToken()
            .switchMap(function (result) {
            return _this.googleFileSyncService.getExistFiles(result);
        })
            .subscribe(function (result) {
            _this.hideProgress();
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
                    _this.showProgress();
                    console.log(result);
                    subscription = _this.googleFileSyncService.createCompletedGamesFolder(_this.googleAuthService.getTokenFromStorage())
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
                        _this.gamesFileService.getGames("", _this.filter);
                    }, function (error) {
                        _this.hideProgress();
                        _this.showAlert({
                            title: "Uploading games",
                            message: error.message
                        });
                    });
                }
                else if (result.length > 0) {
                    _this.googleFileSyncService.setFileIdToStorage(result);
                    _this.showProgress();
                    console.dir(result);
                    subscription = _this.googleFileSyncService.requestLoadFile(_this.googleAuthService.getTokenFromStorage(), result)
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
                }
                _this.subscriptions.push(subscription);
            });
        }, function (error) {
            _this.hideProgress();
            _this.showAlert({
                title: "Showing exist files",
                message: error.message
            });
        });
        // let subscriptionToAuth = this.googleAuthService.getToken()
        //     .switchMap((result) => {
        //         return this.googleFileSyncService.createCompletedGamesFolder(result);
        //     })
        //     .switchMap((result) => {
        //         return this.googleFileSyncService.createCompletedGamesFile(
        //             this.googleAuthService.getTokenFromStorage(),
        //             result
        //         );
        //     })
        //     .switchMap((result) => {
        //         return this.googleFileSyncService.requestUploadFile(this.googleAuthService.getTokenFromStorage(), JSON.stringify(FIRST_UPLOAD_MODEL));
        //     })
        //     .switchMap((result) => {
        //         return this.googleFileSyncService.requestLoadFile(this.googleAuthService.getTokenFromStorage());
        //     })
        //     .switchMap((result) => {
        //         return this.gamesFileService.updateFile(result)
        //     })
        //     .subscribe(
        //         () => {
        //             this.gamesFileService.getGames("", this.filter);
        //         },
        //         (error) => {
        //             this.hideProgress();
        //             console.dir(error);
        //             this.showAlert({
        //                 title: "Uploading games",
        //                 message: error.message
        //             });
        //         }
        //     );
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
            core_1.NgZone])
    ], GamesListComponent);
    return GamesListComponent;
}(BaseComponent_1.BaseComponent));
exports.GamesListComponent = GamesListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZXMtbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnYW1lcy1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF3RDtBQUV4RCxvQ0FBc0M7QUFDdEMsMEJBQTRCO0FBRzVCLGlFQUE4RDtBQUM5RCxtRUFBZ0U7QUFDaEUsMkVBQXdFO0FBQ3hFLGlEQUEyRTtBQUUzRSx5REFBc0Q7QUFDdEQsNkRBQXNEO0FBQ3RELCtEQUE4RDtBQVE5RDtJQUF3QyxzQ0FBYTtJQWtCakQsNEJBQW9CLGlCQUFvQyxFQUNwQyxxQkFBNEMsRUFDNUMsZ0JBQWtDLEVBQ2xDLGdCQUFrQyxFQUNsQyxJQUFZO1FBSmhDLFlBS0ksaUJBQU8sU0FPVjtRQVptQix1QkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLDJCQUFxQixHQUFyQixxQkFBcUIsQ0FBdUI7UUFDNUMsc0JBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxzQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLFVBQUksR0FBSixJQUFJLENBQVE7UUFsQnpCLGNBQVEsR0FBa0IsK0JBQW1CLENBQUM7UUFFOUMsU0FBRyxHQUFrQixlQUFHLENBQUM7UUFFekIsV0FBSyxHQUFnQixFQUFFLENBQUM7UUFnQjNCLEtBQUksQ0FBQyxNQUFNLEdBQUc7WUFDVixPQUFPLEVBQUUsRUFBRTtZQUNYLEdBQUcsRUFBRSxFQUFFO1NBQ1YsQ0FBQztRQUNGLEtBQUksQ0FBQyxvQkFBb0IsR0FBRyxLQUFLLENBQUM7UUFDbEMsS0FBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQzs7SUFDbEMsQ0FBQztJQUVELHFDQUFRLEdBQVI7UUFBQSxpQkEySEM7UUExSEcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BCLElBQUksa0JBQWtCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRTthQUNyRCxTQUFTLENBQUMsVUFB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QUFHLEdBQUcsZUFBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pDLENBQUM7SUFDTCxDQUFDO0lBRUQsc0NBQVMsR0FBVCxVQUFVLEtBQUs7UUFDWCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUUsQ0FBQztJQUVPLHFDQUFRLEdBQWhCO1FBQ0ksSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFsTlEsa0JBQWtCO1FBTjlCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsWUFBWTtZQUN0QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLDZCQUE2QjtZQUMxQyxTQUFTLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztTQUNsQyxDQUFDO3lDQW1CeUMscUNBQWlCO1lBQ2IsNkNBQXFCO1lBQzFCLG1DQUFnQjtZQUNoQix1Q0FBZ0I7WUFDNUIsYUFBTTtPQXRCdkIsa0JBQWtCLENBbU45QjtJQUFELHlCQUFDO0NBQUEsQUFuTkQsQ0FBd0MsNkJBQWEsR0FtTnBEO0FBbk5ZLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBOZ1pvbmUsIE9uSW5pdH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7U2VhcmNoQmFyfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9zZWFyY2gtYmFyXCI7XG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XG5pbXBvcnQgKiBhcyBfIGZyb20gXCJsb2Rhc2hcIjtcblxuaW1wb3J0IHtHYW1lfSBmcm9tIFwiLi4vY29tbW9uL0dhbWVcIjtcbmltcG9ydCB7R2FtZXNGaWxlU2VydmljZX0gZnJvbSBcIi4uL3NlcnZpY2VzL0dhbWVzRmlsZVNlcnZpY2VcIjtcbmltcG9ydCB7R29vZ2xlQXV0aFNlcnZpY2V9IGZyb20gXCIuLi9zZXJ2aWNlcy9Hb29nbGVBdXRoU2VydmljZVwiO1xuaW1wb3J0IHtHb29nbGVGaWxlU3luY1NlcnZpY2V9IGZyb20gXCIuLi9zZXJ2aWNlcy9Hb29nbGVGaWxlU3luY1NlcnZpY2VcIjtcbmltcG9ydCB7QUREX05FV19GSUxFLCBWSURFT19HQU1FX0NPTlNPTEVTLCBXSE99IGZyb20gXCIuLi9jb21tb24vQ29uc3RhbnRzXCI7XG5pbXBvcnQge0ZpbHRlcn0gZnJvbSBcIi4uL2NvbW1vbi9GaWx0ZXJcIjtcbmltcG9ydCB7QmFzZUNvbXBvbmVudH0gZnJvbSBcIi4uL2NvbW1vbi9CYXNlQ29tcG9uZW50XCI7XG5pbXBvcnQge1JvdXRlckV4dGVuc2lvbnN9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhclwiO1xuaW1wb3J0IHtGSVJTVF9VUExPQURfTU9ERUx9IGZyb20gXCIuLi9jb21tb24vRmlyc3RVcGxvYWRNb2RlbFwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJnYW1lcy1saXN0XCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2dhbWVzLWxpc3QuY29tcG9uZW50Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFsnLi9nYW1lcy1saXN0LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIEdhbWVzTGlzdENvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgcHJpdmF0ZSBmaWx0ZXI6IEZpbHRlcjtcblxuICAgIHB1YmxpYyBjb25zb2xlczogQXJyYXk8U3RyaW5nPiA9IFZJREVPX0dBTUVfQ09OU09MRVM7XG5cbiAgICBwdWJsaWMgd2hvOiBBcnJheTxTdHJpbmc+ID0gV0hPO1xuXG4gICAgcHVibGljIGdhbWVzOiBBcnJheTxHYW1lPiA9IFtdO1xuXG4gICAgcHVibGljIGlzU2hvd0NvbnNvbGVDaG9vc2VyOiBib29sZWFuO1xuXG4gICAgcHVibGljIGlzU2hvd1dob0Nob29zZXI6IGJvb2xlYW47XG5cbiAgICBwdWJsaWMgY2hvc2VuQ29uc29sZUluZGV4OiBudW1iZXI7XG5cbiAgICBwdWJsaWMgY2hvc2VuV2hvSW5kZXg6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZ29vZ2xlQXV0aFNlcnZpY2U6IEdvb2dsZUF1dGhTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgZ29vZ2xlRmlsZVN5bmNTZXJ2aWNlOiBHb29nbGVGaWxlU3luY1NlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBnYW1lc0ZpbGVTZXJ2aWNlOiBHYW1lc0ZpbGVTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcbiAgICAgICAgICAgICAgICBwcml2YXRlIHpvbmU6IE5nWm9uZSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmZpbHRlciA9IHtcbiAgICAgICAgICAgIGNvbnNvbGU6IFwiXCIsXG4gICAgICAgICAgICB3aG86IFwiXCJcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5pc1Nob3dDb25zb2xlQ2hvb3NlciA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzU2hvd1dob0Nob29zZXIgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zaG93UHJvZ3Jlc3MoKTtcbiAgICAgICAgbGV0IHN1YnNjcmlwdGlvblRvQXV0aCA9IHRoaXMuZ29vZ2xlQXV0aFNlcnZpY2UuZ2V0VG9rZW4oKVxuICAgICAgICAgICAgLnN3aXRjaE1hcCgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ29vZ2xlRmlsZVN5bmNTZXJ2aWNlLmdldEV4aXN0RmlsZXMocmVzdWx0KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlUHJvZ3Jlc3MoKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG9wdGlvbnMgPSBfLm1hcChyZXN1bHQsIChpdGVtOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLmlkO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5wdXNoKEFERF9ORVdfRklMRSk7XG4gICAgICAgICAgICAgICAgICAgIGRpYWxvZ3MuYWN0aW9uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiQ2hvb3NlIGZpbGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbnM6IG9wdGlvbnNcbiAgICAgICAgICAgICAgICAgICAgfSkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN1YnNjcmlwdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IEFERF9ORVdfRklMRSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1Byb2dyZXNzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJzY3JpcHRpb24gPSB0aGlzLmdvb2dsZUZpbGVTeW5jU2VydmljZS5jcmVhdGVDb21wbGV0ZWRHYW1lc0ZvbGRlcih0aGlzLmdvb2dsZUF1dGhTZXJ2aWNlLmdldFRva2VuRnJvbVN0b3JhZ2UoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN3aXRjaE1hcCgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nb29nbGVGaWxlU3luY1NlcnZpY2UuY3JlYXRlQ29tcGxldGVkR2FtZXNGaWxlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ29vZ2xlQXV0aFNlcnZpY2UuZ2V0VG9rZW5Gcm9tU3RvcmFnZSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN3aXRjaE1hcCgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdvb2dsZUZpbGVTeW5jU2VydmljZS5zZXRGaWxlSWRUb1N0b3JhZ2UocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdvb2dsZUZpbGVTeW5jU2VydmljZS5yZXF1ZXN0VXBsb2FkRmlsZSh0aGlzLmdvb2dsZUF1dGhTZXJ2aWNlLmdldFRva2VuRnJvbVN0b3JhZ2UoKSwgSlNPTi5zdHJpbmdpZnkoRklSU1RfVVBMT0FEX01PREVMKSwgcmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN3aXRjaE1hcCgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nb29nbGVGaWxlU3luY1NlcnZpY2UucmVxdWVzdExvYWRGaWxlKHRoaXMuZ29vZ2xlQXV0aFNlcnZpY2UuZ2V0VG9rZW5Gcm9tU3RvcmFnZSgpLCByZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3dpdGNoTWFwKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdhbWVzRmlsZVNlcnZpY2UudXBkYXRlRmlsZShyZXN1bHQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lc0ZpbGVTZXJ2aWNlLmdldEdhbWVzKFwiXCIsIHRoaXMuZmlsdGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGVQcm9ncmVzcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0FsZXJ0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiVXBsb2FkaW5nIGdhbWVzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzdWx0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdvb2dsZUZpbGVTeW5jU2VydmljZS5zZXRGaWxlSWRUb1N0b3JhZ2UocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dQcm9ncmVzcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Vic2NyaXB0aW9uID0gdGhpcy5nb29nbGVGaWxlU3luY1NlcnZpY2UucmVxdWVzdExvYWRGaWxlKHRoaXMuZ29vZ2xlQXV0aFNlcnZpY2UuZ2V0VG9rZW5Gcm9tU3RvcmFnZSgpLCByZXN1bHQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zd2l0Y2hNYXAoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2FtZXNGaWxlU2VydmljZS51cGRhdGVGaWxlKHJlc3VsdClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVzRmlsZVNlcnZpY2UuZ2V0R2FtZXMoXCJcIiwgdGhpcy5maWx0ZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZVByb2dyZXNzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93QWxlcnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJVcGxvYWRpbmcgZ2FtZXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogZXJyb3IubWVzc2FnZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goc3Vic2NyaXB0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlUHJvZ3Jlc3MoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93QWxlcnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiU2hvd2luZyBleGlzdCBmaWxlc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogZXJyb3IubWVzc2FnZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICAvLyBsZXQgc3Vic2NyaXB0aW9uVG9BdXRoID0gdGhpcy5nb29nbGVBdXRoU2VydmljZS5nZXRUb2tlbigpXG4gICAgICAgIC8vICAgICAuc3dpdGNoTWFwKChyZXN1bHQpID0+IHtcbiAgICAgICAgLy8gICAgICAgICByZXR1cm4gdGhpcy5nb29nbGVGaWxlU3luY1NlcnZpY2UuY3JlYXRlQ29tcGxldGVkR2FtZXNGb2xkZXIocmVzdWx0KTtcbiAgICAgICAgLy8gICAgIH0pXG4gICAgICAgIC8vICAgICAuc3dpdGNoTWFwKChyZXN1bHQpID0+IHtcbiAgICAgICAgLy8gICAgICAgICByZXR1cm4gdGhpcy5nb29nbGVGaWxlU3luY1NlcnZpY2UuY3JlYXRlQ29tcGxldGVkR2FtZXNGaWxlKFxuICAgICAgICAvLyAgICAgICAgICAgICB0aGlzLmdvb2dsZUF1dGhTZXJ2aWNlLmdldFRva2VuRnJvbVN0b3JhZ2UoKSxcbiAgICAgICAgLy8gICAgICAgICAgICAgcmVzdWx0XG4gICAgICAgIC8vICAgICAgICAgKTtcbiAgICAgICAgLy8gICAgIH0pXG4gICAgICAgIC8vICAgICAuc3dpdGNoTWFwKChyZXN1bHQpID0+IHtcbiAgICAgICAgLy8gICAgICAgICByZXR1cm4gdGhpcy5nb29nbGVGaWxlU3luY1NlcnZpY2UucmVxdWVzdFVwbG9hZEZpbGUodGhpcy5nb29nbGVBdXRoU2VydmljZS5nZXRUb2tlbkZyb21TdG9yYWdlKCksIEpTT04uc3RyaW5naWZ5KEZJUlNUX1VQTE9BRF9NT0RFTCkpO1xuICAgICAgICAvLyAgICAgfSlcbiAgICAgICAgLy8gICAgIC5zd2l0Y2hNYXAoKHJlc3VsdCkgPT4ge1xuICAgICAgICAvLyAgICAgICAgIHJldHVybiB0aGlzLmdvb2dsZUZpbGVTeW5jU2VydmljZS5yZXF1ZXN0TG9hZEZpbGUodGhpcy5nb29nbGVBdXRoU2VydmljZS5nZXRUb2tlbkZyb21TdG9yYWdlKCkpO1xuICAgICAgICAvLyAgICAgfSlcbiAgICAgICAgLy8gICAgIC5zd2l0Y2hNYXAoKHJlc3VsdCkgPT4ge1xuICAgICAgICAvLyAgICAgICAgIHJldHVybiB0aGlzLmdhbWVzRmlsZVNlcnZpY2UudXBkYXRlRmlsZShyZXN1bHQpXG4gICAgICAgIC8vICAgICB9KVxuICAgICAgICAvLyAgICAgLnN1YnNjcmliZShcbiAgICAgICAgLy8gICAgICAgICAoKSA9PiB7XG4gICAgICAgIC8vICAgICAgICAgICAgIHRoaXMuZ2FtZXNGaWxlU2VydmljZS5nZXRHYW1lcyhcIlwiLCB0aGlzLmZpbHRlcik7XG4gICAgICAgIC8vICAgICAgICAgfSxcbiAgICAgICAgLy8gICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgLy8gICAgICAgICAgICAgdGhpcy5oaWRlUHJvZ3Jlc3MoKTtcbiAgICAgICAgLy8gICAgICAgICAgICAgY29uc29sZS5kaXIoZXJyb3IpO1xuICAgICAgICAvLyAgICAgICAgICAgICB0aGlzLnNob3dBbGVydCh7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB0aXRsZTogXCJVcGxvYWRpbmcgZ2FtZXNcIixcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2VcbiAgICAgICAgLy8gICAgICAgICAgICAgfSk7XG4gICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAvLyAgICAgKTtcbiAgICAgICAgbGV0IHN1YnNjcmlwdGlvblRvQ2hhbm5lbCA9IHRoaXMuZ2FtZXNGaWxlU2VydmljZS5nYW1lc0NoYW5uZWwuc3Vic2NyaWJlKChnYW1lcykgPT4ge1xuICAgICAgICAgICAgdGhpcy5oaWRlUHJvZ3Jlc3MoKTtcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZXMgPSBnYW1lc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKHN1YnNjcmlwdGlvblRvQXV0aCk7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKHN1YnNjcmlwdGlvblRvQ2hhbm5lbCk7XG4gICAgfVxuXG4gICAgb25UZXh0Q2hhbmdlZChhcmdzKSB7XG5cbiAgICAgICAgbGV0IHNlYXJjaEJhciA9IDxTZWFyY2hCYXI+YXJncy5vYmplY3Q7XG4gICAgICAgIGxldCBzZWFyY2hWYWx1ZSA9IHNlYXJjaEJhci50ZXh0O1xuICAgICAgICBsZXQgc3Vic2NyaXB0aW9uID0gdGhpcy5nYW1lc0ZpbGVTZXJ2aWNlLmdldEdhbWVzKHNlYXJjaFZhbHVlLCB0aGlzLmZpbHRlcik7XG4gICAgfVxuXG4gICAgb25TaG93Q29uc29sZUNob29zZXIoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5pc1Nob3dDb25zb2xlQ2hvb3NlciA9ICF0aGlzLmlzU2hvd0NvbnNvbGVDaG9vc2VyO1xuICAgICAgICBpZiAoIXRoaXMuaXNTaG93Q29uc29sZUNob29zZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0R2FtZXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uU2hvd1dob0Nob29zZXIoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5pc1Nob3dXaG9DaG9vc2VyID0gIXRoaXMuaXNTaG93V2hvQ2hvb3NlcjtcbiAgICAgICAgaWYgKCF0aGlzLmlzU2hvd1dob0Nob29zZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0R2FtZXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQ2xlYXJGaWx0ZXIoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5maWx0ZXIgPSB7XG4gICAgICAgICAgICBjb25zb2xlOiBcIlwiLFxuICAgICAgICAgICAgd2hvOiBcIlwiXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZ2V0R2FtZXMoKTtcbiAgICB9XG5cbiAgICBvbkNob29zZVdoZXJlKGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5jaG9zZW5Db25zb2xlSW5kZXggPSBpbmRleDtcbiAgICAgICAgaWYgKE51bWJlci5pc05hTihpbmRleCkpIHtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyLmNvbnNvbGUgPSBWSURFT19HQU1FX0NPTlNPTEVTWzBdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXIuY29uc29sZSA9IFZJREVPX0dBTUVfQ09OU09MRVNbaW5kZXhdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25DaG9vc2VXaG8oaW5kZXgpIHtcbiAgICAgICAgdGhpcy5jaG9zZW5XaG9JbmRleCA9IGluZGV4O1xuICAgICAgICBpZiAoTnVtYmVyLmlzTmFOKGluZGV4KSkge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXIud2hvID0gV0hPWzBdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXIud2hvID0gV0hPW2luZGV4XTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uSXRlbVRhcChldmVudCkge1xuICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiZGV0YWlsc1wiLCB0aGlzLmdhbWVzW2V2ZW50LmluZGV4XS5pZF0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0R2FtZXMoKSB7XG4gICAgICAgIGxldCBzdWJzY3JpcHRpb24gPSB0aGlzLmdhbWVzRmlsZVNlcnZpY2UuZ2V0R2FtZXMoXCJcIiwgdGhpcy5maWx0ZXIpO1xuICAgIH1cbn1cbiJdfQ==