import {Injectable} from "@angular/core";
import {AjaxResponse, Observable} from "rxjs/Rx";
import {Game} from "../common/Game";

@Injectable()
export class GamesService {

    constructor() {
    }

    public getGames(): Observable<any> {
        return Observable.ajax(`http://192.168.0.106:3004/games`)
            .map((result: AjaxResponse) => {
                return result.response;
            })
            .concatMap((data: Array<any>) => data)
            .map((item): Game => {
                return GamesService.mapGame(item);
            })
            .toArray();
    }

    private static mapGame(item: any): Game {
        return {
            id: item.id,
            name: item.name,
            console: item.console,
            isTogether: item.isTogether,
            image: item.image
        }
    }
}
