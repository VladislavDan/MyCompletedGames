import {Injectable} from "@angular/core";
import {Observable, ReplaySubject} from "rxjs";
import {map, switchMap} from 'rxjs/operators'
import {ajax} from 'rxjs/ajax'
import {isAndroid} from "platform";
import {getString, setString} from "application-settings";

import {AUTH_CONSTANTS} from "~/common/AuthConstants";
import {TOKEN_KEY} from "~/common/Constants";
import {AndroidGoogleSignIn} from "~/common/AndroidGoogleSignIn";

@Injectable()
export class GoogleAuthService {

    private tokenChannel: ReplaySubject<string> = new ReplaySubject();

    private authCodeChannel: ReplaySubject<string> = new ReplaySubject();

    private androidGoogleSignIn: AndroidGoogleSignIn;

    constructor() {
        this.androidGoogleSignIn = new AndroidGoogleSignIn();
        this.authCodeChannel
            .pipe(
                switchMap((authCode) => {
                    return this.getGoogleToken(authCode);
                })
            )
            .subscribe(
                (token) => {
                    this.setTokenToStorage(token);
                    this.tokenChannel.next(token);

                },
                (error) => {
                    throw error;
                }
            );
    }

    public getToken() {
        this.getGoogleAuthCode();
        return this.tokenChannel;
    }

    private getGoogleAuthCode() {
        if (isAndroid) {
            this.androidGoogleSignIn.initEnvironment((authCode) => {
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
        return ajax(
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
        ).pipe(
            map((response) => {
                return response.response.access_token;
            })
        );
    }

    public getTokenFromStorage() {
        return getString(TOKEN_KEY);
    }

    private setTokenToStorage(token) {
        setString(TOKEN_KEY, token);
    }
}
