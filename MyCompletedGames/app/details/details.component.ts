import {Component, OnInit} from "@angular/core";

import {BaseComponent} from "../common/BaseComponent";
import {PageRoute} from "nativescript-angular";
import {Game} from "../common/Game";
import {GamesFileService} from "../services/GamesFileService";

@Component({
    selector: "details",
    moduleId: module.id,
    templateUrl: "./details.component.html",
    styleUrls: ['./details.css']
})
export class DetailsComponent extends BaseComponent implements OnInit {

    public game: Game;

    constructor(private pageRoute: PageRoute,
                private gamesService: GamesFileService) {
        super();
    }

    ngOnInit() {
        this.showProgress();
        let subscription = this.pageRoute.activatedRoute
            .switchMap(activatedRoute => activatedRoute.params)
            .switchMap((params) => {
                return this.gamesService.getGamesById(params['id'])
            })
            .subscribe(
                (game) => {
                    this.hideProgress();
                    this.game = game;
                    console.dir(this.game);
                },
                (error) => {
                    this.showAlert({
                        title: "Getting games",
                        message: error.message
                    })
                });
        this.subscriptions.push(subscription);
    }
}
