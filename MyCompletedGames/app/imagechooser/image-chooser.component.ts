import {Component} from "@angular/core";
import {ImagesService} from "../services/ImagesService";
import {Image} from "../common/Image";
import * as _ from "lodash";
import {Page} from "tns-core-modules/ui/page";
import {ModalDialogParams} from "nativescript-angular";

import {MAX_IMAGE_COUNT} from "../common/Constants";

@Component({
    selector: "image-chooser",
    moduleId: module.id,
    templateUrl: "./image-chooser.component.html",
    styleUrls: ['./image-chooser.css']
})
export class ImageChooserComponent {

    public images: Array<Image> = [];

    private selectedImagesIndexes: Array<number> = [];

    constructor(private imagesService: ImagesService,
                private params: ModalDialogParams,
                private page: Page) {

        this.imagesService.getImages().subscribe(
            (images) => {
                if (images) {
                    console.dir(images);
                    this.images = images;
                }
            },
            (error) => {
                console.log(error.message);
            }
        );

        this.page.on("unloaded", () => {
            this.params.closeCallback();
        });
    }

    onItemTap(event, index) {
        console.dir(index);
        if (this.isSelected(index)) {
            _.pull(this.selectedImagesIndexes, index);
            console.dir(this.selectedImagesIndexes);
        } else {
            if (this.selectedImagesIndexes.length < MAX_IMAGE_COUNT) {
                this.selectedImagesIndexes.push(index);
            }
        }
    }

    onSave(event) {
        let images = [];
        _.forEach(this.selectedImagesIndexes, (item) => {
            images.push(this.images[item].image)
        });
        this.params.closeCallback(images);
    }

    isSelected(index) {
        return _.findIndex(this.selectedImagesIndexes, (element) => {
            return element === index;
        }) >= 0;
    }
}
