import {Injectable} from "@angular/core";
import {AjaxResponse, Observable} from "rxjs/Rx";

@Injectable()
export class GamesService {

    constructor() {
    }

    public static getGames(): Observable<any> {
        return Observable.ajax(`http://192.168.0.106:3004/games`)
            .map((result: AjaxResponse) => {
                return result.response;
            })
    }
}
