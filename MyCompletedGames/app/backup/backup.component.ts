import {Component, EventEmitter, NgZone, Output} from "@angular/core";
import * as _ from "lodash";
import * as dialogs from "ui/dialogs";
import {of, Subscriber} from "rxjs";
import {switchMap} from 'rxjs/operators'

import {GoogleAuthService} from "~/services/GoogleAuthService";
import {GoogleFileSyncService} from "~/services/GoogleFileSyncService";
import {BaseComponent} from "~/common/BaseComponent";
import {GamesService} from "~/services/GamesService";

@Component({
    selector: "backup",
    moduleId: module.id,
    templateUrl: "./backup.component.html",
    styleUrls: ['./backup.css']
})
export class BackupComponent extends BaseComponent {

    public backupFiles: Array<String> = [];

    public isHideConnectButton: boolean = false;

    @Output()
    public connectStatus: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private googleAuthService: GoogleAuthService,
                private googleFileSyncService: GoogleFileSyncService,
                private gamesService: GamesService,
                private zone: NgZone) {
        super();
    }

    onConnectGoogleDrive = () => {
        this.showProgress();
        let subscription = this.googleAuthService.getToken().subscribe(
            (result) => {
                this.isHideConnectButton = true;
                this.connectStatus.emit(true);
                this.reload();
            },
            (error) => {
                this.hideProgress();
                this.showAlert({
                    title: "Authorization",
                    message: error.message
                });
                this.connectStatus.emit(false);
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

    public createNewBackup() {
        this.showProgress();
        return this.googleFileSyncService.getExistFolder(this.googleAuthService.getTokenFromStorage())
            .pipe(
                switchMap((foundedFiles) => {
                    if (foundedFiles) {
                        let foundedFolders = _.find(foundedFiles, (file) => {
                            return file.mimeType === "application/vnd.google-apps.folder"
                        });
                        if (foundedFolders) {
                            return of(_.find(foundedFiles, (file) => {
                                return file.mimeType === "application/vnd.google-apps.folder"
                            }).id);
                        } else {
                            return this.googleFileSyncService.createCompletedGamesFolder(this.googleAuthService.getTokenFromStorage());
                        }
                    } else {
                        return this.googleFileSyncService.createCompletedGamesFolder(this.googleAuthService.getTokenFromStorage());
                    }
                }),
                switchMap((folderId) => {
                    return this.googleFileSyncService.createCompletedGamesFile(
                        this.googleAuthService.getTokenFromStorage(),
                        folderId
                    );
                }),
                switchMap((fileId) => {
                    this.googleFileSyncService.setFileIdToStorage(fileId);
                    return this.googleFileSyncService.requestUploadFile(this.googleAuthService.getTokenFromStorage(), this.gamesService.getGamesFromSetting(), fileId);
                })
            )
            .subscribe(
                () => {
                    this.reload();
                },
                (error) => {
                    this.hideProgress();
                    this.showAlert({
                        title: "Creating new backup",
                        message: error.message
                    });
                }
            );
    }

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
            .pipe(
                switchMap((result) => {
                    return this.gamesService.updateGames(result)
                })
            )
            .subscribe(
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
                },
                () => {
                    console.log('complete');
                }
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
            .subscribe(() => {
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
                });
        this.subscriptions.push(subscription);
    }
}
