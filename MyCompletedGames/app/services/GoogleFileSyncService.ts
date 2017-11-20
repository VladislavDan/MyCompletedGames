import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {AUTH_CONSTANTS} from "../common/AuthConstants";
import {Headers, Http, RequestOptions} from '@angular/http';

@Injectable()
export class GoogleFileSyncService {

    constructor(private http: Http) {
    }

    public requestLoadFile(token: string): Observable<any> {
        let headers: Headers = new Headers();
        headers.append("Authorization", "Bearer " + token);
        let options: RequestOptions = new RequestOptions({headers: headers});
        return Observable.ajax(
            {
                url: "https://www.googleapis.com/drive/v3/files/" + AUTH_CONSTANTS.fileId + "?alt=media",
                headers: {
                    "Authorization": "Bearer " + token
                },
                method: "GET"
            }
        ).map((result) => {
            return result.response;
        });
    }

    public requestUploadFile(token: string, fileContent: string): Observable<any> {
        console.log(token);
        return Observable.ajax(
            {
                url: "https://www.googleapis.com/upload/drive/v3/files/" + AUTH_CONSTANTS.fileId,
                headers: {
                    "Authorization": "Bearer " + token
                },
                body: fileContent,
                responseType: 'text',
                method: "PATCH"
            }
        ).map((result) => {
            return result.response;
        });
    }
}
