import {Injectable} from "@angular/core";
import * as fs from "file-system";
import {fromFile, ImageSource} from "tns-core-modules/image-source";
import {Observable} from "rxjs/Observable";

import {Image} from "../common/Image";

declare var android: any;

@Injectable()
export class ImagesService {

    constructor() {
    }

    public getImages(): Observable<Array<Image>> {
        let imagesDirectory: string = android.os.Environment.getExternalStoragePublicDirectory(
            android.os.Environment.DIRECTORY_PICTURES
        ).toString();
        let downloadsDirectory: string = android.os.Environment.getExternalStoragePublicDirectory(
            android.os.Environment.DIRECTORY_DOWNLOADS
        ).toString();
        let imagesChannel = Observable.fromPromise(fs.Folder.fromPath(imagesDirectory).getEntities());
        let downloadImagesChannel = Observable.fromPromise(fs.Folder.fromPath(downloadsDirectory).getEntities());
        return Observable.merge(imagesChannel, downloadImagesChannel)
            .concatMap((entities) => {
                return entities;
            })
            .filter((entity) => {
                return entity.path.indexOf(".png", -4) !== -1
                    || entity.path.indexOf(".jpg", -4) !== -1
                    || entity.path.indexOf(".jpeg", -4) !== -1;
            })
            .map((entity) => {
                return {
                    image: entity.path,
                    name: entity.name
                }
            })
            .toArray();
    }

    public resizeImages(images: Array<string>): Observable<Array<String>> {
        return Observable.from(images)
            .map((image) => {
                return fromFile(image)
            })
            .map((result) => {
                let width = result.width;
                let height = result.height;
                let maxWidth = 600;
                let maxHeight = 600;

                if (width > height) {
                    let ratio = width / maxWidth;
                    width = maxWidth;
                    height = height / ratio;
                } else if (height > width) {
                    let ratio = height / maxHeight;
                    height = maxHeight;
                    width = width / ratio;
                } else {
                    height = maxHeight;
                    width = maxWidth;
                }

                let resizedImage = android.graphics.Bitmap.createScaledBitmap(result.android, width, height, false);
                result = null;
                let image = new ImageSource();
                image.android = resizedImage;
                return 'data:image/jpeg;base64,' + image.toBase64String('jpeg', 80);
            })
            .toArray();
    }
}