import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {AUTH_CONSTANTS} from "../common/AuthConstants";

@Injectable()
export class GoogleFileSyncService {

    constructor() {
    }

    public requestLoadFile(token: string): Observable<any> {
        return Observable.ajax(
            {
                url: "https://www.googleapis.com/drive/v3/files/" + AUTH_CONSTANTS.fileId + "?alt=media",
                headers: {
                    "Authorization": "Bearer " + token
                }
            }
        ).map((response) => {
            return response.response;
        });
    }

    public requestUploadFile(): Observable<any> {
        return Observable.of("");
    }
}
