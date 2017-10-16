"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var GamesFileService_1 = require("../services/GamesFileService");
var MockGames_1 = require("../common/MockGames");
var GamesListComponent = /** @class */ (function () {
    function GamesListComponent(gamesFileService) {
        this.gamesFileService = gamesFileService;
    }
    GamesListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.gamesFileService.updateFile(MockGames_1.MOCK_GAMES).subscribe(function () {
            _this.gamesFileService.getGames().subscribe(function (games) {
                _this.games = games;
            }, function (error) {
                console.dir(error);
            });
        }, function (error) {
            console.dir(error);
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], GamesListComponent.prototype, "games", void 0);
    GamesListComponent = __decorate([
        core_1.Component({
            selector: "games-list",
            moduleId: module.id,
            templateUrl: "./games-list.component.html",
            styleUrls: ['./games-list.css']
        }),
        __metadata("design:paramtypes", [GamesFileService_1.GamesFileService])
    ], GamesListComponent);
    return GamesListComponent;
}());
exports.GamesListComponent = GamesListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZXMtbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnYW1lcy1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF1RDtBQUV2RCxpRUFBOEQ7QUFDOUQsaURBQStDO0FBVy9DO0lBS0ksNEJBQW9CLGdCQUFrQztRQUFsQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO0lBQ3RELENBQUM7SUFFRCxxQ0FBUSxHQUFSO1FBQUEsaUJBaUJDO1FBZkcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxzQkFBVSxDQUFDLENBQUMsU0FBUyxDQUNsRDtZQUNJLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxTQUFTLENBQ3RDLFVBQUMsS0FBSztnQkFDRixLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUN2QixDQUFDLEVBQ0QsVUFBQyxLQUFLO2dCQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7WUFDdEIsQ0FBQyxDQUNKLENBQUE7UUFDTCxDQUFDLEVBQ0QsVUFBQyxLQUFLO1lBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QixDQUFDLENBQ0osQ0FBQztJQUNOLENBQUM7SUF0QkQ7UUFEQyxZQUFLLEVBQUU7O3FEQUNhO0lBSFosa0JBQWtCO1FBTjlCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsWUFBWTtZQUN0QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLDZCQUE2QjtZQUMxQyxTQUFTLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztTQUNsQyxDQUFDO3lDQU13QyxtQ0FBZ0I7T0FMN0Msa0JBQWtCLENBMEI5QjtJQUFELHlCQUFDO0NBQUEsQUExQkQsSUEwQkM7QUExQlksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPbkluaXR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0dhbWV9IGZyb20gXCIuLi9jb21tb24vR2FtZVwiO1xuaW1wb3J0IHtHYW1lc0ZpbGVTZXJ2aWNlfSBmcm9tIFwiLi4vc2VydmljZXMvR2FtZXNGaWxlU2VydmljZVwiO1xuaW1wb3J0IHtNT0NLX0dBTUVTfSBmcm9tIFwiLi4vY29tbW9uL01vY2tHYW1lc1wiO1xuXG5pbXBvcnQgQXBwbGljYXRpb24gPSByZXF1aXJlKFwiYXBwbGljYXRpb25cIik7XG5pbXBvcnQgU29jaWFsTG9naW4gPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXNvY2lhbC1sb2dpblwiKTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiZ2FtZXMtbGlzdFwiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9nYW1lcy1saXN0LmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbJy4vZ2FtZXMtbGlzdC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBHYW1lc0xpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZ2FtZXM6IEdhbWVbXTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZ2FtZXNGaWxlU2VydmljZTogR2FtZXNGaWxlU2VydmljZSkge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuXG4gICAgICAgIHRoaXMuZ2FtZXNGaWxlU2VydmljZS51cGRhdGVGaWxlKE1PQ0tfR0FNRVMpLnN1YnNjcmliZShcbiAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVzRmlsZVNlcnZpY2UuZ2V0R2FtZXMoKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgIChnYW1lcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lcyA9IGdhbWVzO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG59XG4iXX0=