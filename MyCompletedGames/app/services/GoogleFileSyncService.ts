import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";

import {AUTH_CONSTANTS} from "../common/AuthConstants";
import {FILE_NAME, FOLDER_NAME} from "../common/Constants";

@Injectable()
export class GoogleFileSyncService {

    constructor() {
    }

    public isFileExist(token: string): Observable<any> {
        return Observable.ajax(
            {
                url: "https://www.googleapis.com/drive/v3/files?q=name contains '" + FILE_NAME + "'",
                headers: {
                    "Authorization": "Bearer " + token
                },
                method: "GET"
            }
        ).map((result) => {
            return result.response.files.length > 0;
        });
    }

    public createCompletedGamesFile(token: string, id: string): Observable<any> {
        return this.createFile(token, FILE_NAME, "application/vnd.google-apps.file", id);
    }

    public createCompletedGamesFolder(token: string): Observable<any> {
        return this.createFile(token, FOLDER_NAME, "application/vnd.google-apps.folder", "");
    }

    public requestLoadFile(token: string): Observable<any> {
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

    private createFile(token: string, name: string, type, id): Observable<any> {
        return Observable.ajax(
            {
                url: "https://www.googleapis.com/drive/v3/files",
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                },
                body: {
                    parents: [
                        id
                    ],
                    name: name,
                    mimeType: type
                },
                method: "POST"
            }
        ).map((result) => {
            return result.response.id;
        });
    }
}
