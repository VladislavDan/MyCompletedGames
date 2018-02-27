import {Component, NgZone, OnInit} from "@angular/core";
import {SearchBar} from "tns-core-modules/ui/search-bar";
import {isAndroid} from "tns-core-modules/platform";
import 'rxjs/add/operator/mergeMap'
import {RouterExtensions} from "nativescript-angular";

import {Game} from "../common/Game";
import {GamesService} from "../services/GamesService";
import {VIDEO_GAME_CONSOLES, WHO} from "../common/Constants";
import {Filter} from "../common/Filter";
import {BaseComponent} from "../common/BaseComponent";

@Component({
    selector: "games-list",
    moduleId: module.id,
    templateUrl: "./games-list.component.html",
    styleUrls: ['./games-list.css']
})
export class GamesListComponent extends BaseComponent implements OnInit {

    private filter: Filter;

    public consoles: Array<String> = VIDEO_GAME_CONSOLES;

    public who: Array<String> = WHO;

    public games: Array<Game> = [];

    public isShowConsoleChooser: boolean;

    public isShowWhoChooser: boolean;

    public chosenConsoleIndex: number = 0;

    public chosenWhoIndex: number = 0;

    constructor(private gamesFileService: GamesService,
                private routerExtensions: RouterExtensions,
                private zone: NgZone) {
        super();
        this.filter = {
            console: "",
            who: ""
        };
        this.isShowConsoleChooser = false;
        this.isShowWhoChooser = false;
    }

    ngOnInit(): void {
        this.showProgress();
        this.reload();
        let subscriptionGamesChannel = this.gamesFileService.gamesChannel
            .subscribe(
                (games) => {
                    this.zone.run(() => {
                        this.games = games;
                    });
                    this.hideProgress();
                },
                (error) => {
                    this.hideProgress();
                    this.showAlert({
                        title: "Showing games",
                        message: error.message
                    });
                }
            );

        this.subscriptions.push(subscriptionGamesChannel);
    }

    onTextChanged(args) {
        let searchBar = <SearchBar>args.object;
        let searchValue = searchBar.text;
        this.gamesFileService.getGames(searchValue, this.filter);
    }

    onClearFocus(event) {
        if (isAndroid) {
            if (event.object.android) {
                event.object.dismissSoftInput();
                event.object.android.clearFocus();
                event.object.android.setFocusable(false);
            }
        }
    }

    onShowConsoleChooser(event) {
        this.isShowConsoleChooser = !this.isShowConsoleChooser;
        if (!this.isShowConsoleChooser) {
            this.getGames();
        }
    }

    onShowWhoChooser(event) {
        this.isShowWhoChooser = !this.isShowWhoChooser;
        if (!this.isShowWhoChooser) {
            this.getGames();
        }
    }

    onClearFilter(event) {
        this.filter = {
            console: "",
            who: ""
        };
        this.getGames();
    }

    onChooseWhere(index: number) {
        this.chosenConsoleIndex = index;
        if (Number.isNaN(index)) {
            this.filter.console = VIDEO_GAME_CONSOLES[0];
        } else {
            this.filter.console = VIDEO_GAME_CONSOLES[index];
        }
    }

    onChooseWho(index) {
        this.chosenWhoIndex = index;
        if (Number.isNaN(index)) {
            this.filter.who = WHO[0];
        } else {
            this.filter.who = WHO[index];
        }
    }

    public createNewGame() {
        this.routerExtensions.navigate(["/new-game"], {clearHistory: false});
    }

    private reload() {
        this.getGames();
    }

    private getGames() {
        this.gamesFileService.getGames("", this.filter);
    }
}
