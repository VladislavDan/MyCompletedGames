"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Rx_1 = require("rxjs/Rx");
var GamesService = /** @class */ (function () {
    function GamesService() {
    }
    GamesService.getGames = function () {
        return Rx_1.Observable.ajax("http://192.168.0.106:3004/games")
            .map(function (result) {
            return result.response;
        });
    };
    GamesService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], GamesService);
    return GamesService;
}());
exports.GamesService = GamesService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2FtZXNTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR2FtZXNTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlDO0FBQ3pDLDhCQUFpRDtBQUdqRDtJQUVJO0lBQ0EsQ0FBQztJQUVhLHFCQUFRLEdBQXRCO1FBQ0ksTUFBTSxDQUFDLGVBQVUsQ0FBQyxJQUFJLENBQUMsaUNBQWlDLENBQUM7YUFDcEQsR0FBRyxDQUFDLFVBQUMsTUFBb0I7WUFDdEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUE7SUFDVixDQUFDO0lBVlEsWUFBWTtRQUR4QixpQkFBVSxFQUFFOztPQUNBLFlBQVksQ0FXeEI7SUFBRCxtQkFBQztDQUFBLEFBWEQsSUFXQztBQVhZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQge0FqYXhSZXNwb25zZSwgT2JzZXJ2YWJsZX0gZnJvbSBcInJ4anMvUnhcIjtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEdhbWVzU2VydmljZSB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRHYW1lcygpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmFqYXgoYGh0dHA6Ly8xOTIuMTY4LjAuMTA2OjMwMDQvZ2FtZXNgKVxyXG4gICAgICAgICAgICAubWFwKChyZXN1bHQ6IEFqYXhSZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5yZXNwb25zZTtcclxuICAgICAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG4iXX0=