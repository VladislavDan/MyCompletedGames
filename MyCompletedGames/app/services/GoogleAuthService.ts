import {Injectable} from "@angular/core";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {Observable} from "rxjs/Observable";

import {AUTH_CONSTANTS} from "../common/AuthConstants";
import {TOKEN_KEY} from "../common/Constants";
import appSettings = require("application-settings");
import SocialLogin = require("nativescript-social-login");
import Application = require("application");

@Injectable()
export class GoogleAuthService {

    private tokenChannel: ReplaySubject<string> = new ReplaySubject();

    private authCodeChannel: ReplaySubject<string> = new ReplaySubject();

    constructor() {

        this.authCodeChannel.subscribe(
            (authCode) => {
                this.getGoogleToken(authCode).subscribe(
                    (token) => {
                        this.setTokenToStorage(token);
                        this.tokenChannel.next(token);
                    },
                    (error) => {
                        console.log(error.message);
                    }
                );
            }
        );
    }

    public getToken() {
        if (appSettings.hasKey(TOKEN_KEY)) {
            this.getTokenFromStorage()
        } else {
            this.getGoogleAuthCode();
        }
        return this.tokenChannel;
    }

    private getGoogleAuthCode() {
        if (Application.android) {
            let result = SocialLogin.init({
                google: {
                    serverClientId: AUTH_CONSTANTS.client_id,
                    isRequestAuthCode: true
                }
            });
            if (result.google.isInitialized) {
                SocialLogin.loginWithGoogle(
                    (result) => {
                        this.authCodeChannel.next(result.authCode);
                    }
                );
            } else {
                console.log(result.google.error);
            }
        }
    }

    private getGoogleToken(authCode: string): Observable<string> {
        return Observable.ajax(
            {
                url: "https://www.googleapis.com/oauth2/v4/token",
                body: {
                    code: authCode,
                    redirect_uri: AUTH_CONSTANTS.redirect_uri,
                    client_id: AUTH_CONSTANTS.client_id,
                    client_secret: AUTH_CONSTANTS.client_secret,
                    scope: AUTH_CONSTANTS.scope,
                    grant_type: AUTH_CONSTANTS.grant_type
                },
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }
        ).map((response) => {
            return response.response.access_token;
        });
    }

    private getTokenFromStorage() {
        this.tokenChannel.next(appSettings.getString(TOKEN_KEY));
    }

    private setTokenToStorage(token) {
        appSettings.setString(TOKEN_KEY, token);
    }
}
