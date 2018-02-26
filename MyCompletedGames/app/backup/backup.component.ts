import {Component, NgZone} from "@angular/core";
import * as _ from "lodash";
import * as dialogs from "ui/dialogs";
import {GoogleAuthService} from "../services/GoogleAuthService";
import {GoogleFileSyncService} from "../services/GoogleFileSyncService";
import {BaseComponent} from "../common/BaseComponent";
import {FIRST_UPLOAD_MODEL} from "../common/FirstUploadModel";

import 'rxjs/add/operator/mergeMap'
import {BackupFile} from "../common/BackupFile";

@Component({
    selector: "backup",
    moduleId: module.id,
    templateUrl: "./backup.component.html",
    styleUrls: ['./backup.css']
})
export class BackupComponent extends BaseComponent {

    public backupFiles: Array<String> = [];

    constructor(private googleAuthService: GoogleAuthService,
                private googleFileSyncService: GoogleFileSyncService,
                private zone: NgZone) {
        super();
    }

    connectGoogleDrive = () => {
        // this.showProgress();
        // let subscriptionAuth = this.googleAuthService.getToken().subscribe(
        //     (result) => {
        //         this.showProgress();
        //         this.reload();
        //     },
        //     (error) => {
        //         this.hideProgress();
        //         this.showAlert({
        //             title: "Authorization",
        //             message: error.message
        //         });
        //     }
        // );
        //
        // this.subscriptions.push(subscriptionAuth);
        this.reload();
    };

    private reload() {
        let subscription = this.googleFileSyncService.getExistFiles(this.googleAuthService.getTokenFromStorage())
            .subscribe(
                (result) => {
                    this.hideProgress();
                    this.backupFiles = [];
                    _.forEach(result, (item) => {
                        this.backupFiles.push(item.id);
                    });
                },
                (error) => {
                    this.hideProgress();
                    this.showAlert({
                        title: "Showing exist files",
                        message: error.message
                    });
                }
            );
        this.subscriptions.push(subscription);
    }

    private createAndLoadFile() {
        this.showProgress();
        return this.googleFileSyncService.createCompletedGamesFolder(this.googleAuthService.getTokenFromStorage())
            .switchMap((result) => {
                return this.googleFileSyncService.createCompletedGamesFile(
                    this.googleAuthService.getTokenFromStorage(),
                    result
                );
            })
            .switchMap((result) => {
                this.googleFileSyncService.setFileIdToStorage(result);
                return this.googleFileSyncService.requestUploadFile(this.googleAuthService.getTokenFromStorage(), JSON.stringify(FIRST_UPLOAD_MODEL, [], 4), result);
            })
            .switchMap((result) => {
                return this.googleFileSyncService.requestLoadFile(this.googleAuthService.getTokenFromStorage(), result);
            })
            .subscribe(
                () => {
                    this.hideProgress();
                },
                (error) => {

                }
            );
    }

    public onActionBackup(event) {
        dialogs.action({
            message: "Actions with backup",
            cancelButtonText: "Cancel",
            actions: ["Delete", "Load", "Upload"]
        }).then(function (result) {
            if (result == "Delete") {
                dialogs.confirm({
                    title: "Delete backup",
                    message: "Are you sure that you want to delete backup?",
                    okButtonText: "Yes",
                    cancelButtonText: "No"
                }).then(function (result) {
                    if (result) {
                        console.log("deleted")
                    } else {
                        console.log("no deleted")
                    }
                });
            } else if (result == "Load") {
                dialogs.confirm({
                    title: "Load backup",
                    message: "Are you sure that you want to load backup? " +
                    "Your local saved games will be replaced on remote games or removed.",
                    okButtonText: "Yes",
                    cancelButtonText: "No"
                }).then(function (result) {
                    if (result) {
                        console.log("loaded")
                    } else {
                        console.log("no loaded")
                    }
                });
            } else if (result == "Upload") {
                dialogs.confirm({
                    title: "Upload backup",
                    message: "Are you sure that you want to upload backup? " +
                    "Your remote saved games will be replaced on local games or removed.",
                    okButtonText: "Yes",
                    cancelButtonText: "No"
                }).then(function (result) {
                    if (result) {
                        console.log("uploaded")
                    } else {
                        console.log("no uploaded")
                    }
                });
            }
        });
    }
}
