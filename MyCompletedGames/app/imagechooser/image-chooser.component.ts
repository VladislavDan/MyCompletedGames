import {Component} from "@angular/core";
import * as _ from "lodash";
import {Page} from "tns-core-modules/ui/page";
import {ModalDialogParams} from "nativescript-angular";

import {MAX_IMAGE_COUNT} from "../common/Constants";
import {ImagesService} from "../services/ImagesService";
import {Image} from "../common/Image";
import {BaseComponent} from "../common/BaseComponent";

@Component({
    selector: "image-chooser",
    moduleId: module.id,
    templateUrl: "./image-chooser.component.html",
    styleUrls: ['./image-chooser.css']
})
export class ImageChooserComponent extends BaseComponent {

    public images: Array<Image> = [];

    private selectedImagesIndexes: Array<number> = [];

    constructor(private imagesService: ImagesService,
                private params: ModalDialogParams,
                private page: Page) {
        super();
        let subscription = this.imagesService.getImages().subscribe(
            (images) => {
                if (images) {
                    this.images = images;
                }
            },
            (error) => {
                this.showAlert({
                    title: "Initialisation image chooser",
                    message: error.message
                });
            }
        );
        this.subscriptions.push(subscription);

        this.page.on("unloaded", () => {
            this.params.closeCallback();
        });
    }

    onItemTap(event, index) {
        if (this.isSelected(index)) {
            _.pull(this.selectedImagesIndexes, index);
        } else {
            if (this.selectedImagesIndexes.length < MAX_IMAGE_COUNT) {
                this.selectedImagesIndexes.push(index);
            } else {
                this.showAlert({
                    title: "Choosing image",
                    message: "You chose more than " + MAX_IMAGE_COUNT + " images"
                });
            }
        }
    }

    onSave(event) {
        this.showProgress();
        let images = [];
        _.forEach(this.selectedImagesIndexes, (item) => {
            images.push(this.images[item].image)
        });
        this.imagesService.resizeImages(images).subscribe((images) => {
            this.hideProgress();
            this.params.closeCallback(images);
        });
    }

    isSelected(index) {
        return _.findIndex(this.selectedImagesIndexes, (element) => {
            return element === index;
        }) >= 0;
    }
}
