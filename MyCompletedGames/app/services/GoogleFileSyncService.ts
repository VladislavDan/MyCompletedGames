import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/dom/ajax'

import {FILE_ID_KEY, FILE_NAME, FOLDER_NAME} from "../common/Constants";
import appSettings = require("application-settings");

@Injectable()
export class GoogleFileSyncService {

    constructor() {
    }

    public getExistFiles(token: string): Observable<any> {
        return Observable.ajax(
            {
                url: "https://www.googleapis.com/drive/v3/files?q=name%20contains%20'" + FILE_NAME + "'",
                headers: {
                    "Authorization": "Bearer " + token
                },
                method: "GET"
            }
        ).map((result) => {
            return result.response.files;
        });
    }

    public createCompletedGamesFile(token: string, id: string): Observable<any> {
        return Observable.ajax(
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
        ).map((result) => {
            return result.response.id;
        });
    }

    public createCompletedGamesFolder(token: string): Observable<any> {
        return Observable.ajax(
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
        ).map((result) => {
            return result.response.id;
        });
    }

    public requestLoadFile(token: string, fileId: string): Observable<any> {
        return Observable.ajax(
            {
                url: "https://www.googleapis.com/drive/v3/files/" + fileId + "?alt=media",
                headers: {
                    "Authorization": "Bearer " + token
                },
                method: "GET"
            }
        ).map((result) => {
            return result.response;
        });
    }

    public requestUploadFile(token: string, fileContent: string, fileId: string): Observable<any> {
        return Observable.ajax(
            {
                url: "https://www.googleapis.com/upload/drive/v3/files/" + fileId,
                headers: {
                    "Authorization": "Bearer " + token
                },
                body: fileContent,
                responseType: 'text',
                method: "PATCH"
            }
        ).map((result) => {
            return fileId;
        });
    }

    public getFileIdFromStorage() {
        return appSettings.getString(FILE_ID_KEY);
    }

    public setFileIdToStorage(fileId) {
        appSettings.setString(FILE_ID_KEY, fileId);
    }
}
