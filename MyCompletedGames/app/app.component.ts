require('nativescript-nodeify');
import {Component} from "@angular/core";
import Application = require("application");
import SocialLogin = require("nativescript-social-login");

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent {

    ngOnInit() {
        SocialLogin.addLogger(function (msg: any, tag: string) {
            console.log('[nativescript-social-login]: (' + tag + '): ' + msg);
        });
        if (Application.android) {
            let result = SocialLogin.init({
                google: {
                    serverClientId: "144292527666-9h1ugthmsl2qjdlpmv5cl3o8gps44f55.apps.googleusercontent.com",
                    isRequestAuthCode: true
                }
            });
            console.dir(result);
            SocialLogin.loginWithGoogle(
                (result) => {
                    console.dir(result);
                }
            );
        }
    }
}
