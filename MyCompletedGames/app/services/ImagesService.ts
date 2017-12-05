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
                    source: fromFile(entity.path),
                    name: entity.name
                }
            })
            .filter((result) => {
                return result.source !== null;
            })
            .map((result): Image => {
                let width = result.source.width;
                let height = result.source.height;
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

                let resizedImage = android.graphics.Bitmap.createScaledBitmap(result.source.android, width, height, false);
                result.source = null;
                let image = new ImageSource();
                image.android = resizedImage;
                return {
                    name: result.name,
                    image: 'data:image/png;base64,' + image.toBase64String('png')
                };
            })
            .toArray();
    }
}