import {Component, ViewContainerRef} from "@angular/core";
import {ModalDialogOptions, ModalDialogService, RouterExtensions} from "nativescript-angular";
import {requestPermissions} from "nativescript-camera";
import {LoadingIndicator} from "nativescript-loading-indicator";

import {TOGETHER, VIDEO_GAME_CONSOLES, WHO} from "../common/Constants";
import {CameraService} from "../services/CameraService";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {ImageChooserComponent} from "../imagechooser/image-chooser.component";
import {GamesFileService} from "../services/GamesFileService";

@Component({
    selector: "games-list",
    moduleId: module.id,
    templateUrl: "./new-game.component.html",
    styleUrls: ['./new-game.css']
})
export class NewGameComponent {

    public consoles: Array<String> = VIDEO_GAME_CONSOLES;

    public who: Array<String> = WHO;

    public images: Array<String> = [];

    public what: string = "";

    public chosenConsoleIndex: number = 0;

    public chosenWhoIndex: number = 0;

    private imageChooseChannel: ReplaySubject<Array<string>> = new ReplaySubject();

    private loadingIndicator = new LoadingIndicator();

    constructor(private routerExtensions: RouterExtensions,
                private imageService: CameraService,
                private modalService: ModalDialogService,
                private vcRef: ViewContainerRef,
                private gamesFileService: GamesFileService) {
        requestPermissions();
        this.imageChooseChannel.subscribe((images: Array<string>) => {
            this.images = images;
        });
    }

    onChooseWhere(index: number) {
        this.chosenConsoleIndex = index;
    }

    onChooseWho(index) {
        this.chosenWhoIndex = index;
    }

    onChooseImage(event) {
        this.showImagesChooser()
            .then(result => {
                if (result) {
                    this.images = result;
                } else {
                    this.images = [];
                }
            })
            .catch(error => console.log(error.message));
    }

    onTakePhoto(event) {
        console.log("Started camera " + this.imageService);
        this.imageService.getImageFromCamera().subscribe(
            (asset) => {
                console.log("Result" + asset);
                this.imageService.getBase64String(asset).subscribe(
                    (base64Image) => {
                        this.images.push(base64Image);
                    },
                    (error) => {
                        console.log(error.message);
                    }
                );
            },
            (error) => {
                console.dir(error);
            }
        );
    }

    onSaveNewGame(event) {
        this.loadingIndicator.show();
        this.gamesFileService.addNewGame({
            id: Date.now().toString(),
            name: this.what,
            console: this.consoles[this.chosenConsoleIndex],
            isTogether: this.who[this.chosenWhoIndex] === TOGETHER,
            images: this.images
        }).subscribe(
            () => {
                this.loadingIndicator.hide();
                this.routerExtensions.backToPreviousPage();
            },
            (error) => {
                this.loadingIndicator.hide();
                console.log("NewGameComponent: " + error.message);
            }
        );
    }

    onBack() {
        this.routerExtensions.back();
    }

    private showImagesChooser(): Promise<any> {
        const options: ModalDialogOptions = {
            viewContainerRef: this.vcRef,
            fullscreen: true
        };
        return this.modalService.showModal(ImageChooserComponent, options);
    }
}
