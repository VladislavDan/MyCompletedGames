import {Injectable} from "@angular/core";
import * as fs from "file-system";
import {fromFile} from "tns-core-modules/image-source";
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
        let cameraDirectory: string = android.os.Environment.getExternalStoragePublicDirectory(
            android.os.Environment.DIRECTORY_DCIM
        ).toString() + '/Camera';
        let imagesChannel = Observable.fromPromise(fs.Folder.fromPath(imagesDirectory).getEntities());
        let cameraImagesChannel = Observable.fromPromise(fs.Folder.fromPath(cameraDirectory).getEntities());
        return Observable.merge(imagesChannel, cameraImagesChannel)
            .concatMap((entities) => {
                return entities;
            })
            .map((entity): Image => {
                return {
                    name: entity.name,
                    image: 'data:image/png;base64,' + fromFile(entity.path).toBase64String('png')
                };
            })
            .toArray();
    }
}