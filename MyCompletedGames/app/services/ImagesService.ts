import {Injectable} from "@angular/core";
import {ajax} from 'rxjs/ajax'
import {map} from 'rxjs/operators'
import * as htmlparser from "htmlparser"
import * as _ from "lodash";

import {Image} from "~/typings/Image";

@Injectable()
export class ImagesService {

    constructor() {
    }

    getImages(name: string, gameConsole: string) {
        return ajax({
            url: `https://www.google.ru/search?&tbm=isch&&source=lnms&tbs=isz:lt,islt:svga&biw=1750&bih=842&q=${name}+${gameConsole}`,
            method: "GET"
        }).pipe(
            map((result) => {
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
                imagesLinks.push({
                    imageUrl: raw.ou,
                    id: getHashFromText(raw.ou)
                });
            });
        });
        let parser = new htmlparser.Parser(handler);
        parser.parseComplete(html);
        return imagesLinks;
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