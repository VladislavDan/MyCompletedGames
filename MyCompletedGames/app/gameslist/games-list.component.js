"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var GamesService_1 = require("../services/GamesService");
var GamesListComponent = /** @class */ (function () {
    function GamesListComponent(gamesService) {
        this.gamesService = gamesService;
    }
    GamesListComponent.prototype.ngOnInit = function () {
        GamesService_1.GamesService.getGames().subscribe(function (data) {
            console.log(data);
        }, function (error) {
            console.log(error);
        });
    };
    GamesListComponent = __decorate([
        core_1.Component({
            selector: "GamesList",
            moduleId: module.id,
            providers: [GamesService_1.GamesService],
            templateUrl: "./games-list.component.html",
            styleUrls: ['./games-list.css']
        }),
        __metadata("design:paramtypes", [GamesService_1.GamesService])
    ], GamesListComponent);
    return GamesListComponent;
}());
exports.GamesListComponent = GamesListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZXMtbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnYW1lcy1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFnRDtBQUNoRCx5REFBc0Q7QUFTdEQ7SUFFSSw0QkFBb0IsWUFBMEI7UUFBMUIsaUJBQVksR0FBWixZQUFZLENBQWM7SUFDOUMsQ0FBQztJQUVELHFDQUFRLEdBQVI7UUFFSSwyQkFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDLFNBQVMsQ0FDN0IsVUFBQyxJQUFJO1lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QixDQUFDLEVBQ0QsVUFBQyxLQUFLO1lBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QixDQUFDLENBQ0osQ0FBQztJQUNOLENBQUM7SUFmUSxrQkFBa0I7UUFQOUIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixTQUFTLEVBQUUsQ0FBQywyQkFBWSxDQUFDO1lBQ3pCLFdBQVcsRUFBRSw2QkFBNkI7WUFDMUMsU0FBUyxFQUFFLENBQUMsa0JBQWtCLENBQUM7U0FDbEMsQ0FBQzt5Q0FHb0MsMkJBQVk7T0FGckMsa0JBQWtCLENBZ0I5QjtJQUFELHlCQUFDO0NBQUEsQUFoQkQsSUFnQkM7QUFoQlksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7R2FtZXNTZXJ2aWNlfSBmcm9tIFwiLi4vc2VydmljZXMvR2FtZXNTZXJ2aWNlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIkdhbWVzTGlzdFwiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgcHJvdmlkZXJzOiBbR2FtZXNTZXJ2aWNlXSxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2dhbWVzLWxpc3QuY29tcG9uZW50Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFsnLi9nYW1lcy1saXN0LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIEdhbWVzTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGdhbWVzU2VydmljZTogR2FtZXNTZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG5cbiAgICAgICAgR2FtZXNTZXJ2aWNlLmdldEdhbWVzKCkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxufVxuIl19