import {Component, ViewContainerRef} from "@angular/core";
import {ModalDialogOptions, ModalDialogService, RouterExtensions} from "nativescript-angular";
import {requestPermissions} from "nativescript-camera";

import {VIDEO_GAME_CONSOLES, WHO} from "../common/Constants";
import {CameraService} from "../services/CameraService";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {ImageChooserComponent} from "../imagechooser/image-chooser.component";

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

    public chosenConsoleIndex: number;

    public chosenWhoIndex: number;

    private imageChooseChannel: ReplaySubject<Array<string>> = new ReplaySubject();

    constructor(private routerExtensions: RouterExtensions,
                private imageService: CameraService,
                private modalService: ModalDialogService,
                private vcRef: ViewContainerRef) {
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
        this.createModelView()
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

    }

    onBack() {
        this.routerExtensions.back();
    }

    private createModelView(): Promise<any> {
        const today = new Date();
        const options: ModalDialogOptions = {
            viewContainerRef: this.vcRef,
            context: today.toDateString(),
            fullscreen: true
        };

        return this.modalService.showModal(ImageChooserComponent, options);
    }
}
