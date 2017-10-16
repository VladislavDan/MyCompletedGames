"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('nativescript-nodeify');
var core_1 = require("@angular/core");
var Application = require("application");
var SocialLogin = require("nativescript-social-login");
var AppComponent = /** @class */ (function () {
    function AppComponent() {
    }
    AppComponent.prototype.ngOnInit = function () {
        SocialLogin.addLogger(function (msg, tag) {
            console.log('[nativescript-social-login]: (' + tag + '): ' + msg);
        });
        if (Application.android) {
            var result = SocialLogin.init({
                google: {
                    serverClientId: "144292527666-9h1ugthmsl2qjdlpmv5cl3o8gps44f55.apps.googleusercontent.com",
                    isRequestAuthCode: true
                }
            });
            console.dir(result);
            SocialLogin.loginWithGoogle(function (result) {
                console.dir(result);
            });
        }
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: "ns-app",
            templateUrl: "app.component.html"
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQztBQUNoQyxzQ0FBd0M7QUFDeEMseUNBQTRDO0FBQzVDLHVEQUEwRDtBQU0xRDtJQUFBO0lBcUJBLENBQUM7SUFuQkcsK0JBQVEsR0FBUjtRQUNJLFdBQVcsQ0FBQyxTQUFTLENBQUMsVUFBVSxHQUFRLEVBQUUsR0FBVztZQUNqRCxPQUFPLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxHQUFHLEdBQUcsR0FBRyxLQUFLLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDdEUsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUN0QixJQUFJLE1BQU0sR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDO2dCQUMxQixNQUFNLEVBQUU7b0JBQ0osY0FBYyxFQUFFLDBFQUEwRTtvQkFDMUYsaUJBQWlCLEVBQUUsSUFBSTtpQkFDMUI7YUFDSixDQUFDLENBQUM7WUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3BCLFdBQVcsQ0FBQyxlQUFlLENBQ3ZCLFVBQUMsTUFBTTtnQkFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3hCLENBQUMsQ0FDSixDQUFDO1FBQ04sQ0FBQztJQUNMLENBQUM7SUFwQlEsWUFBWTtRQUp4QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFFBQVE7WUFDbEIsV0FBVyxFQUFFLG9CQUFvQjtTQUNwQyxDQUFDO09BQ1csWUFBWSxDQXFCeEI7SUFBRCxtQkFBQztDQUFBLEFBckJELElBcUJDO0FBckJZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsicmVxdWlyZSgnbmF0aXZlc2NyaXB0LW5vZGVpZnknKTtcclxuaW1wb3J0IHtDb21wb25lbnR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCBBcHBsaWNhdGlvbiA9IHJlcXVpcmUoXCJhcHBsaWNhdGlvblwiKTtcclxuaW1wb3J0IFNvY2lhbExvZ2luID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1zb2NpYWwtbG9naW5cIik7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcIm5zLWFwcFwiLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiYXBwLmNvbXBvbmVudC5odG1sXCJcclxufSlcclxuZXhwb3J0IGNsYXNzIEFwcENvbXBvbmVudCB7XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgU29jaWFsTG9naW4uYWRkTG9nZ2VyKGZ1bmN0aW9uIChtc2c6IGFueSwgdGFnOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ1tuYXRpdmVzY3JpcHQtc29jaWFsLWxvZ2luXTogKCcgKyB0YWcgKyAnKTogJyArIG1zZyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKEFwcGxpY2F0aW9uLmFuZHJvaWQpIHtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IFNvY2lhbExvZ2luLmluaXQoe1xyXG4gICAgICAgICAgICAgICAgZ29vZ2xlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyQ2xpZW50SWQ6IFwiMTQ0MjkyNTI3NjY2LTloMXVndGhtc2wycWpkbHBtdjVjbDNvOGdwczQ0ZjU1LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaXNSZXF1ZXN0QXV0aENvZGU6IHRydWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZGlyKHJlc3VsdCk7XHJcbiAgICAgICAgICAgIFNvY2lhbExvZ2luLmxvZ2luV2l0aEdvb2dsZShcclxuICAgICAgICAgICAgICAgIChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRpcihyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=