import {Component} from "@angular/core";
import {ImagesService} from "../services/ImagesService";
import {Image} from "../common/Image";
import * as _ from "lodash";

@Component({
    selector: "image-chooser",
    moduleId: module.id,
    templateUrl: "./image-chooser.component.html",
    styleUrls: ['./image-chooser.css']
})
export class ImageChooserComponent {

    public images: Array<Image> = [];

    private selectedImagesIndexes: Array<number> = [];

    constructor(private imagesService: ImagesService) {

        this.imagesService.getImages().subscribe(
            (images) => {
                this.images = images;
            },
            (error) => {
                console.log(error.message);
            }
        );
    }

    onItemTap(event, index) {
        console.dir(index);
        if (this.isSelected(index)) {
            _.pull(this.selectedImagesIndexes, index);
            console.dir(this.selectedImagesIndexes);
        } else {
            this.selectedImagesIndexes.push(index);
            console.dir(this.selectedImagesIndexes);
        }
    }

    isSelected(index) {
        return _.findIndex(this.selectedImagesIndexes, (element) => {
            return element === index;
        }) >= 0;
    }
}
