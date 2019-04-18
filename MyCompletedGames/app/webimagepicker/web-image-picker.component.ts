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
import {switchMap} from 'rxjs/operators'
import {fromArray} from "rxjs/internal/observable/fromArray";

import {knownFolders} from "tns-core-modules/file-system";

@Component({
    selector: "image-chooser",
    moduleId: module.id,
    templateUrl: "./web-image-picker.component.html",
    styleUrls: ['./web-image-picker.css']
})
export class WebImagePickerComponent extends BaseComponent {

    public images: Array<Image> = [];

    public isLoadImages: boolean = false;

    public countOfImage: number = 30;

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
                this.isLoadImages = true;
                this.countOfImage = images.length;
                if (images) {
                    let index = 0;
                    fromArray(images).pipe(
                        switchMap((image: Image) => {
                            return fromPromise(new Promise<Image[]>((resolve, reject) => {
                                fromUrl(image.imageUrl).then((imageSource: ImageSource) => {
                                    let path = knownFolders.temp().path + "/" + Date.now() + ".jpg";
                                    imageSource.saveToFile(path, "jpg");
                                    this.countOfImage--;
                                    this.images.push({
                                        id: index++,
                                        cachedFilePath: path,
                                        base64: imageSource.toBase64String("jpg", 90)
                                    });
                                    resolve(images)
                                }).catch(error => console.log(error));
                            }))
                        })
                    )
                        .subscribe(
                            (images: Image[]) => {
                                this.isLoadImages = false;
                                this.images = this.imagesService.images;
                            },
                            (error) => {
                                this.isLoadImages = false;
                                console.log(error);
                            }
                        );
                }
            },
            (error) => {
                this.isLoadImages = false;
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
        this.params.closeCallback(this.selectedImages[0]);
    }

    isSelected(imageId) {
        return _.findIndex(this.selectedImages, (image: Image) => {
            return image.id === imageId;
        }) >= 0;
    }
}