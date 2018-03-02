import {AfterViewInit, ChangeDetectorRef, Component, NgZone, OnInit, ViewChild} from "@angular/core";
import {SearchBar} from "tns-core-modules/ui/search-bar";
import {isAndroid} from "tns-core-modules/platform";
import 'rxjs/add/operator/mergeMap'
import {RouterExtensions} from "nativescript-angular";

import {Game} from "../common/Game";
import {GamesService} from "../services/GamesService";
import {VIDEO_GAME_CONSOLES, WHO} from "../common/Constants";
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

    public consoles: Array<String> = VIDEO_GAME_CONSOLES;

    public who: Array<String> = WHO;

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
        if(searchValue === ''){
            this.filter = {
                console: "",
                who: ""
            };
            this.getGames();
        }else{
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
            this.filter.console = VIDEO_GAME_CONSOLES[0];
        }

        if (this.chosenWhoIndex === 0) {
            this.filter.who = WHO[0];
        }

        this.getGames();
        this.drawer.closeDrawer();
    }

    onClearFilter(event) {
        this.filter = {
            console: "",
            who: ""
        };
        this.getGames();
        this.drawer.closeDrawer();
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
