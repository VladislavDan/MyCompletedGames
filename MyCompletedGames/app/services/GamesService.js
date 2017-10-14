"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Rx_1 = require("rxjs/Rx");
var GamesService = /** @class */ (function () {
    function GamesService() {
    }
    GamesService_1 = GamesService;
    GamesService.prototype.getGames = function () {
        return Rx_1.Observable.ajax("http://192.168.0.106:3004/games")
            .map(function (result) {
            return result.response;
        })
            .concatMap(function (data) { return data; })
            .map(function (item) {
            return GamesService_1.mapGame(item);
        })
            .toArray();
    };
    GamesService.mapGame = function (item) {
        return {
            id: item.id,
            name: item.name,
            console: item.console,
            isTogether: item.isTogether,
            image: item.image
        };
    };
    GamesService = GamesService_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], GamesService);
    return GamesService;
    var GamesService_1;
}());
exports.GamesService = GamesService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2FtZXNTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR2FtZXNTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlDO0FBQ3pDLDhCQUFpRDtBQUlqRDtJQUVJO0lBQ0EsQ0FBQztxQkFIUSxZQUFZO0lBS2QsK0JBQVEsR0FBZjtRQUNJLE1BQU0sQ0FBQyxlQUFVLENBQUMsSUFBSSxDQUFDLGlDQUFpQyxDQUFDO2FBQ3BELEdBQUcsQ0FBQyxVQUFDLE1BQW9CO1lBQ3RCLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQzNCLENBQUMsQ0FBQzthQUNELFNBQVMsQ0FBQyxVQUFDLElBQWdCLElBQUssT0FBQSxJQUFJLEVBQUosQ0FBSSxDQUFDO2FBQ3JDLEdBQUcsQ0FBQyxVQUFDLElBQUk7WUFDTixNQUFNLENBQUMsY0FBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QyxDQUFDLENBQUM7YUFDRCxPQUFPLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRWMsb0JBQU8sR0FBdEIsVUFBdUIsSUFBUztRQUM1QixNQUFNLENBQUM7WUFDSCxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDWCxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVO1lBQzNCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztTQUNwQixDQUFBO0lBQ0wsQ0FBQztJQXpCUSxZQUFZO1FBRHhCLGlCQUFVLEVBQUU7O09BQ0EsWUFBWSxDQTBCeEI7SUFBRCxtQkFBQzs7Q0FBQSxBQTFCRCxJQTBCQztBQTFCWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHtBamF4UmVzcG9uc2UsIE9ic2VydmFibGV9IGZyb20gXCJyeGpzL1J4XCI7XHJcbmltcG9ydCB7R2FtZX0gZnJvbSBcIi4uL2NvbW1vbi9HYW1lXCI7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBHYW1lc1NlcnZpY2Uge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRHYW1lcygpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmFqYXgoYGh0dHA6Ly8xOTIuMTY4LjAuMTA2OjMwMDQvZ2FtZXNgKVxyXG4gICAgICAgICAgICAubWFwKChyZXN1bHQ6IEFqYXhSZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5yZXNwb25zZTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNvbmNhdE1hcCgoZGF0YTogQXJyYXk8YW55PikgPT4gZGF0YSlcclxuICAgICAgICAgICAgLm1hcCgoaXRlbSk6IEdhbWUgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEdhbWVzU2VydmljZS5tYXBHYW1lKGl0ZW0pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAudG9BcnJheSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIG1hcEdhbWUoaXRlbTogYW55KTogR2FtZSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaWQ6IGl0ZW0uaWQsXHJcbiAgICAgICAgICAgIG5hbWU6IGl0ZW0ubmFtZSxcclxuICAgICAgICAgICAgY29uc29sZTogaXRlbS5jb25zb2xlLFxyXG4gICAgICAgICAgICBpc1RvZ2V0aGVyOiBpdGVtLmlzVG9nZXRoZXIsXHJcbiAgICAgICAgICAgIGltYWdlOiBpdGVtLmltYWdlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==