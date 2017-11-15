import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {fromAsset, ImageSource} from "tns-core-modules/image-source";
import {ImageAsset} from "tns-core-modules/image-asset";
import {openTelegramImagePicker, TelegramPickerResponse} from "nativescript-telegram-image-picker";
import * as camera from "nativescript-camera";
import "rxjs/add/observable/fromPromise";

@Injectable()
export class ImageService {

    private options = {
        width: 300,
        height: 300,
        keepAspectRatio: true,
        saveToGallery: false
    };

    public getImageFromCamera(): Observable<ImageAsset> {
        return Observable.fromPromise(camera.takePicture(this.options));
    }

    public getBase64String(asset: ImageAsset): Observable<string> {
        return Observable.fromPromise(fromAsset(asset)).map((src: ImageSource) => {
            return src.toBase64String("png");
        });
    }

    public getImageFromStorage() {
        console.log("started image chooser");
        openTelegramImagePicker(5).then((resp: TelegramPickerResponse) => {
            for (let i = 0; i < resp.photos.length; i++) {
                console.log(resp.photos[i]);
            }
        })
    }
}