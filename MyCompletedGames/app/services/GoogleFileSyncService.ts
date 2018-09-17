import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {ajax} from 'rxjs/ajax'
import {map} from 'rxjs/operators'
import {getString, setString} from "application-settings";

import {FILE_ID_KEY, FILE_NAME, FOLDER_NAME} from "~/common/Constants";
import {GamesFileModel} from "~/typings/GamesFileModel";

@Injectable()
export class GoogleFileSyncService {

    constructor() {
    }

    public getExistFiles(token: string): Observable<any> {
        return ajax(
            {
                url: "https://www.googleapis.com/drive/v3/files?q=name%20contains%20'" + FILE_NAME + "'",
                headers: {
                    "Authorization": "Bearer " + token
                },
                method: "GET"
            }
        ).pipe(
            map((result) => {
                return result.response.files;
            })
        );
    }

    public getExistFolder(token: string): Observable<any> {
        return ajax(
            {
                url: "https://www.googleapis.com/drive/v3/files?q=name%20contains%20'" + FOLDER_NAME + "'",
                headers: {
                    "Authorization": "Bearer " + token
                },
                method: "GET"
            }
        ).pipe(
            map((result) => {
                return result.response.files;
            })
        );
    }

    public deleteGamesFile(token: string, fileId: string): Observable<any> {
        return ajax(
            {
                url: "https://www.googleapis.com/drive/v3/files/" + fileId,
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                },
                method: "DELETE"
            }
        );
    }

    public createCompletedGamesFile(token: string, id: string): Observable<any> {
        return ajax(
            {
                url: "https://www.googleapis.com/drive/v3/files",
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                },
                body: {
                    parents: [id],
                    name: FILE_NAME
                },
                method: "POST"
            }
        ).pipe(
            map((result) => {
                return result.response.id;
            })
        );
    }

    public createCompletedGamesFolder(token: string): Observable<any> {
        return ajax(
            {
                url: "https://www.googleapis.com/drive/v3/files",
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                },
                body: {
                    name: FOLDER_NAME,
                    mimeType: "application/vnd.google-apps.folder"
                },
                method: "POST"
            }
        ).pipe(
            map((result) => {
                return result.response.id;
            })
        );
    }

    public requestLoadFile(token: string, fileId: string): Observable<any> {
        return ajax(
            {
                url: "https://www.googleapis.com/drive/v3/files/" + fileId + "?alt=media",
                headers: {
                    "Authorization": "Bearer " + token
                },
                method: "GET"
            }
        ).pipe(
            map((result) => {
                return result.response;
            })
        );
    }

    public requestUploadFile(token: string, fileContent: GamesFileModel, fileId: string): Observable<any> {
        return ajax(
            {
                url: "https://www.googleapis.com/upload/drive/v3/files/" + fileId,
                headers: {
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify(fileContent, null, 4),
                responseType: 'text',
                method: "PATCH"
            }
        ).pipe(
            map((result) => {
                return fileId;
            })
        );
    }

    public getFileIdFromStorage() {
        return getString(FILE_ID_KEY);
    }

    public setFileIdToStorage(fileId) {
        setString(FILE_ID_KEY, fileId);
    }
}
