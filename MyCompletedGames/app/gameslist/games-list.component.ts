import {AfterViewInit, ChangeDetectorRef, Component, NgZone, OnInit, ViewChild} from "@angular/core";
import {SearchBar} from "tns-core-modules/ui/search-bar";
import {isAndroid} from "tns-core-modules/platform";
import 'rxjs/add/operator/mergeMap'
import {RouterExtensions} from "nativescript-angular";

import {Game} from "../common/Game";
import {GamesService} from "../services/GamesService";
import {DEFAULT_VALUE_FILTER, VIDEO_GAME_CONSOLES, WHO} from "../common/Constants";
import {Filter} from "../common/Filter";
import {BaseComponent} from "../common/BaseComponent";
import {RadSideDrawerComponent} from "nativescript-pro-ui/sidedrawer/angular";
import {RadSideDrawer} from "nativescript-pro-ui/sidedrawer";

@Component({
    selector: "games-list",
    moduleId: module.id,
    templateUrl: "./games-list.component.html",
    styleUrls: ['./games-list.css']
})
export class GamesListComponent extends BaseComponent implements AfterViewInit, OnInit {

    private filter: Filter;

    public consoles: Array<String> = [];

    public who: Array<String> = [];

    public games: Array<Game> = [];

    public chosenConsoleIndex: number = 0;

    public chosenWhoIndex: number = 0;

    @ViewChild(RadSideDrawerComponent)
    public drawerComponent: RadSideDrawerComponent;

    private drawer: RadSideDrawer;

    constructor(private gamesFileService: GamesService,
                private routerExtensions: RouterExtensions,
                private zone: NgZone,
                private changeDetectionRef: ChangeDetectorRef) {
        super();
        this.filter = {
            console: "",
            who: ""
        };
        this.consoles.push(DEFAULT_VALUE_FILTER);
        this.consoles = this.consoles.concat(VIDEO_GAME_CONSOLES);
        this.who.push(DEFAULT_VALUE_FILTER);
        this.who = this.who.concat(WHO);
    }

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this.changeDetectionRef.detectChanges();
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
        if (searchValue === '') {
            this.filter = {
                console: "",
                who: ""
            };
            this.getGames();
        } else {
            this.gamesFileService.getGames(searchValue, this.filter);
        }
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

    onApplyFilters(event) {
        if (this.chosenConsoleIndex === 0) {
            this.filter.console = '';
        }

        if (this.chosenWhoIndex === 0) {
            this.filter.who = '';
        }

        this.getGames();
        this.drawer.closeDrawer();
    }

    onClearFilter(event) {
        this.filter = {
            console: '',
            who: ''
        };
        this.getGames();
        this.drawer.closeDrawer();
    }

    onChooseWhere(index: number) {
        this.chosenConsoleIndex = index;
        if (index === 0) {
            this.filter.console = '';
        } else {
            this.filter.console = this.consoles[index];
        }
    }

    onChooseWho(index) {
        this.chosenWhoIndex = index;
        if (index === 0) {
            this.filter.who = '';
        } else {
            this.filter.who = this.who[index];
        }
    }

    onOpenFilters(event) {
        this.drawer.showDrawer();
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
