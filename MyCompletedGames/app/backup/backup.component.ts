import {Component, NgZone} from "@angular/core";
import * as _ from "lodash";
import * as dialogs from "ui/dialogs";
import {GoogleAuthService} from "../services/GoogleAuthService";
import {GoogleFileSyncService} from "../services/GoogleFileSyncService";
import {BaseComponent} from "../common/BaseComponent";

import 'rxjs/add/operator/mergeMap'
import {GamesService} from "../services/GamesService";
import {Subscriber} from "rxjs/Subscriber";

@Component({
    selector: "backup",
    moduleId: module.id,
    templateUrl: "./backup.component.html",
    styleUrls: ['./backup.css']
})
export class BackupComponent extends BaseComponent {

    public backupFiles: Array<String> = [];

    public isHideConnectButton: boolean = false;

    constructor(private googleAuthService: GoogleAuthService,
                private googleFileSyncService: GoogleFileSyncService,
                private gamesService: GamesService,
                private zone: NgZone) {
        super();
    }

    connectGoogleDrive = () => {
        this.showProgress();
        let subscription = this.googleAuthService.getToken().subscribe(
            (result) => {
                this.isHideConnectButton = true;
                this.reload();
            },
            (error) => {
                this.hideProgress();
                this.showAlert({
                    title: "Authorization",
                    message: error.message
                });
            }
        );

        this.subscriptions.push(subscription);
    };

    onActionBackup = (event) => {
        let fileId = this.backupFiles[event.index];
        dialogs.action({
            message: "Actions with backup",
            cancelButtonText: "Cancel",
            actions: ["Delete", "Load", "Upload"]
        }).then((result) => {
            if (result == "Delete") {
                dialogs.confirm({
                    title: "Delete backup",
                    message: "Are you sure that you want to delete backup?",
                    okButtonText: "Yes",
                    cancelButtonText: "No"
                }).then((result) => {
                    if (result) {
                        this.deleteBackup(fileId)
                    }
                });
            } else if (result == "Load") {
                dialogs.confirm({
                    title: "Load backup",
                    message: "Are you sure that you want to load backup? " +
                    "Your local saved games will be replaced on remote games or removed.",
                    okButtonText: "Yes",
                    cancelButtonText: "No"
                }).then((result) => {
                    if (result) {
                        this.showProgress();
                        this.load(fileId);
                    }
                });
            } else if (result == "Upload") {
                dialogs.confirm({
                    title: "Upload backup",
                    message: "Are you sure that you want to upload backup? " +
                    "Your remote saved games will be replaced on local games or removed.",
                    okButtonText: "Yes",
                    cancelButtonText: "No"
                }).then((result) => {
                    if (result) {
                        this.showProgress();
                        this.upload(fileId);
                    }
                });
            }
        });
    };

    private reload() {
        let subscription = this.googleFileSyncService.getExistFiles(this.googleAuthService.getTokenFromStorage())
            .subscribe(
                (result) => {
                    this.hideProgress();
                    this.backupFiles = [];
                    _.forEach(result, (item) => {
                        this.zone.run(() => {
                            this.backupFiles.push(item.id);
                        });
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

    private deleteBackup(fileId) {
        this.showProgress();
        let subscription = this.googleFileSyncService.deleteGamesFile(this.googleAuthService.getTokenFromStorage(), fileId)
            .subscribe(
                () => {
                    this.reload();
                },
                (error) => {
                    this.hideProgress();
                    this.showAlert({
                        title: "Delete backup",
                        message: error.message
                    });
                }
            );
        this.subscriptions.push(subscription);
    }

    private load(fileId) {
        this.googleFileSyncService.setFileIdToStorage(fileId);
        this.showProgress();
        let subscription = this.googleFileSyncService.requestLoadFile(this.googleAuthService.getTokenFromStorage(), fileId)
            .switchMap((result) => {
                return this.gamesService.updateGames(result)
            })
            .subscribe(
                this.createGamesLoadingSubscriber()
            );
        this.subscriptions.push(subscription);
    }

    private upload(fileId) {
        this.googleFileSyncService.setFileIdToStorage(fileId);
        this.showProgress();
        let subscription = this.googleFileSyncService
            .requestUploadFile(
                this.googleAuthService.getTokenFromStorage(),
                this.gamesService.getGamesFromSetting(),
                fileId
            )
            .subscribe(this.createGamesLoadingSubscriber());
        this.subscriptions.push(subscription);
    }

    private createGamesLoadingSubscriber(): Subscriber<any> {
        return Subscriber.create(
            () => {
                this.hideProgress();
                this.gamesService.getGames("", {
                    console: "",
                    who: ""
                });
            },
            (error) => {
                this.hideProgress();
                this.showAlert({
                    title: "Loading games",
                    message: error.message
                });
            }
        )
    }
}
