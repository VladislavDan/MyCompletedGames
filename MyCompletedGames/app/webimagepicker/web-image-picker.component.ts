import {Component} from "@angular/core";
import * as _ from "lodash";

import {BaseComponent} from "~/common/BaseComponent";
import {MAX_IMAGE_COUNT} from "~/common/Constants";
import {Image} from "~/typings/Image";
import {ModalDialogParams} from "nativescript-angular";
import {Page} from "tns-core-modules/ui/page";
import {ImagesService} from "~/services/ImagesService";
import {fromUrl, ImageSource} from "tns-core-modules/image-source";

import {fromPromise} from "rxjs/internal/observable/fromPromise";
import {map, switchMap} from 'rxjs/operators'
import {fromArray} from "rxjs/internal/observable/fromArray";

import {knownFolders} from "tns-core-modules/file-system";
import {toArray} from "rxjs/internal/operators";

@Component({
    selector: "image-chooser",
    moduleId: module.id,
    templateUrl: "./web-image-picker.component.html",
    styleUrls: ['./web-image-picker.css']
})
export class WebImagePickerComponent extends BaseComponent {

    public images: Array<Image> = [];

    private selectedImages: Array<Image> = [];

    private name: string;

    private console: string;

    constructor(private imagesService: ImagesService,
                private params: ModalDialogParams,
                private page: Page) {
        super();

        this.page.on("unloaded", () => {
            this.params.closeCallback();
        });
    }

    ngOnInit() {
        this.name = this.params.context.name;
        this.console = this.params.context.console;
        let subscription = this.imagesService.getImages(this.name, this.console).subscribe(
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
    }

    onItemTap(event, imageId) {
        if (this.isSelected(imageId)) {
            _.pull(this.selectedImages, _.find(this.images, (image: Image) => {
                return image.id === imageId;
            }));
        } else {
            if (this.selectedImages.length < MAX_IMAGE_COUNT) {
                this.selectedImages.push(_.find(this.images, (image: Image) => {
                    return image.id === imageId;
                }));
            } else {
                this.showAlert({
                    title: "Choosing image",
                    message: "You chose more than " + MAX_IMAGE_COUNT + " images"
                });
            }
        }
    }

    onSave(event) {
        let images: Array<Image> = [];
        _.forEach(this.selectedImages, (item) => {
            images.push({
                imageUrl: item.imageUrl
            })
        });
        fromArray(this.images).pipe(
            switchMap((image: Image) => {
                return fromPromise(fromUrl(image.imageUrl))
            }),
            map((imageSrc: ImageSource) => {
                return imageSrc.toBase64String("jpg", 90);
            }),
            toArray()
        ).subscribe((base64s: string[]) => {
            _.forEach(images, (image: Image, index: number) => {
                image.base64 = base64s[index];
            });
        });
        fromArray(this.images).pipe(
            switchMap((image: Image) => {
                return fromPromise(fromUrl(image.imageUrl))
            }),
            map((imageSrc: ImageSource) => {
                let path = knownFolders.temp().path + "/" + Date.now() + ".jpg";
                imageSrc.saveToFile(path, "jpg");
                return path;
            }),
            toArray()
        ).subscribe((paths: string[]) => {
            _.forEach(images, (image: Image, index: number) => {
                image.cachedFilePath = paths[index];
            });
        });
        this.params.closeCallback(images);
    }

    isSelected(imageId) {
        return _.findIndex(this.selectedImages, (image: Image) => {
            return image.id === imageId;
        }) >= 0;
    }
}