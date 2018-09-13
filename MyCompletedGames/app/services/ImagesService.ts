import {Injectable} from "@angular/core";
import {ajax} from 'rxjs/ajax'
import {map} from 'rxjs/operators'
import {Image} from "~/common/Image";
import * as htmlparser from "htmlparser"

@Injectable()
export class ImagesService {

    constructor() {
        this.getGooglePageWithPreviewImages("Turok", "PC").subscribe();
    }

    getGooglePageWithPreviewImages(name: string, gameConsole: string) {
        return ajax({
            url: `https://www.google.ru/search?&tbm=isch&tbs=isz:lt,islt:svga&biw=1750&bih=842&q=${name}+${gameConsole}`,
            method: "GET"
        }).pipe(
            map((result) => {
                console.log(result.response);
                this.getPreviewImages(result.response);
                return result.response.files;
            })
        );
    }

    getPreviewImages(html: string): Array<Image> {
        let handler = new htmlparser.DefaultHandler(function (error, dom) {
            console.log(dom);
        });
        let parser = new htmlparser.Parser(handler);
        parser.parseComplete(html);
        return null;
    }
}