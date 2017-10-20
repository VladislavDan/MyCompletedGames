import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {AUTH_CONSTANTS} from "../common/AuthConstants";
import appSettings = require("application-settings");
import SocialLogin = require("nativescript-social-login");
import Application = require("application");

@Injectable()
export class GoogleFileSyncService {

    constructor() {
    }

    public requestLoadFile(token: string): Observable<string> {
        return Observable.ajax(
            {
                url: "https://www.googleapis.com/drive/v2/files/" + AUTH_CONSTANTS.fileId,
                headers: {
                    "Authorization": "Bearer " + token
                }
            }
        ).map((response) => {
            return response.response;
        });
    }
}
