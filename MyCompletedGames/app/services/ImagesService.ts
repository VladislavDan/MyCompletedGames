import {Injectable} from "@angular/core";
import {ajax} from 'rxjs/ajax'
import {map} from 'rxjs/operators'
import * as htmlparser from "htmlparser"
import * as _ from "lodash";
import {Image} from "~/typings/Image";

@Injectable()
export class ImagesService {

    public images: Array<Image> = [];

    constructor() {
    }

    getImages(name: string, gameConsole: string) {
        let url = `https://www.google.ru/search?q=${name}+${gameConsole}&tbm=isch&tbs=isz:lt,islt:svga&source=lnms&biw=1750&bih=842`;
        return ajax({
            url: url,
            method: "GET",
            headers: {'User-Agent': "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.134 Safari/537.36"}
        }).pipe(
            map((result): Array<Image> => {
                this.getPreviewImages(result.response);
                return this.getPreviewImages(result.response);
            })
        );
    }

    getPreviewImages(html: string): Array<Image> {
        let getObjects = this.getObjects;
        let getHashFromText = this.getHashFromText;
        let imagesLinks: Array<Image> = [];
        let handler = new htmlparser.DefaultHandler(function (error, dom) {
            let result = getObjects(dom, 'raw', 'div class="rg_meta notranslate"');
            _.forEach(result, (item) => {
                let raw = JSON.parse(item.children[0].raw);
                imagesLinks.push(<Image>{
                    imageUrl: raw.ou,
                    id: getHashFromText(raw.ou),
                    cachedFilePath: "",
                    base64: ""
                });
            });
        });
        let parser = new htmlparser.Parser(handler);
        parser.parseComplete(html);
        return _.take(imagesLinks, 30);
    }

    getObjects = (obj, key, val) => {
        let objects = [];
        for (let i in obj) {
            if (!obj.hasOwnProperty(i)) continue;
            if (typeof obj[i] == 'object') {
                objects = objects.concat(this.getObjects(obj[i], key, val));
            } else if (i == key && obj[i] == val || i == key && val == '') { //
                objects.push(obj);
            } else if (obj[i] == val && key == '') {
                if (objects.lastIndexOf(obj) == -1) {
                    objects.push(obj);
                }
            }
        }
        return objects;
    };

    getHashFromText = (text) => {
        let hash = 0, i, chr;
        if (text === 0) return hash;
        for (i = 0; i < text.length; i++) {
            chr = text.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0;
        }
        return hash < 0 ? -hash : hash;
    };
}