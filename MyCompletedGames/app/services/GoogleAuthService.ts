import {Injectable} from "@angular/core";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {Observable} from "rxjs/Observable";

import {AUTH_CONSTANTS} from "../common/AuthConstants";
import {TOKEN_KEY} from "../common/Constants";
import {AndroidGoogleSignIn} from "../common/AndroidGoogleSignIn";
import appSettings = require("application-settings");
import Application = require("application");

@Injectable()
export class GoogleAuthService {

    private tokenChannel: ReplaySubject<string> = new ReplaySubject();

    private authCodeChannel: ReplaySubject<string> = new ReplaySubject();

    private androidGoogleSignIn: AndroidGoogleSignIn;

    constructor() {
        this.androidGoogleSignIn = new AndroidGoogleSignIn();
        this.authCodeChannel.subscribe(
            (authCode) => {
                this.getGoogleToken(authCode).subscribe(
                    (token) => {
                        this.setTokenToStorage(token);
                        this.tokenChannel.next(token);
                    },
                    (error) => {
                        console.log(error);
                    }
                );
            }
        );
    }

    public getToken() {
        this.getGoogleAuthCode();
        return this.tokenChannel;
    }

    private getGoogleAuthCode() {
        if (Application.android) {
            this.androidGoogleSignIn.initEnvironment((authCode) => {
                console.log("getGoogleAuthCode authCode " + authCode);
                this.authCodeChannel.next(authCode);
            });
            this.androidGoogleSignIn.loginWithGoogle(
                {
                    googleServerClientId: AUTH_CONSTANTS.client_id,
                    scope: AUTH_CONSTANTS.scope
                }
            );
        }
    }

    private getGoogleToken(authCode: string): Observable<string> {
        console.log("getGoogleToken authCode " + authCode);
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
