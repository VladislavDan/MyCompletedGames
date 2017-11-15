import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";

@Injectable()
export class GoogleFileSyncService {

    constructor() {
    }

    public requestLoadFile(token: string): Observable<any> {
        // return Observable.ajax(
        //     {
        //         url: "https://www.googleapis.com/drive/v3/files/" + AUTH_CONSTANTS.fileId + "?alt=media",
        //         headers: {
        //             "Authorization": "Bearer " + token
        //         }
        //     }
        // ).map((response) => {
        //     return response.response;
        // });

        //TODO please will replace mock data
        return Observable.of('');
    }

    public requestUploadFile(): Observable<any> {
        return Observable.of("");
    }
}
