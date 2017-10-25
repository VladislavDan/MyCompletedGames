import {Component, OnInit} from "@angular/core";
import {ModalDialogParams} from "nativescript-angular";
import {Page} from "tns-core-modules/ui/page";
import * as application from "tns-core-modules/application";
import {isAndroid} from "tns-core-modules/platform";
import * as _ from "lodash";

import {ChosenConsole} from "../common/ChosenConsole";
import {VIDEO_GAME_CONSOLES} from "../common/Constants";

@Component({
    selector: "console-chooser",
    moduleId: module.id,
    templateUrl: "./console-chooser.component.html",
    styleUrls: ['./console-chooser.css']
})
export class ConsoleChooserComponent implements OnInit {

    public chosenConsoles: Array<ChosenConsole>;

    constructor(private params: ModalDialogParams, private page: Page) {
        this.page.on("shownModally", data => {
            if (isAndroid) {
                let fragmentManger = application.android.foregroundActivity.getFragmentManager();
                let dialogFragment = fragmentManger.findFragmentByTag("dialog");
                if (dialogFragment !== null) {
                    dialogFragment.setCancelable(false);
                }
            }
        });

        this.createConsolesList();
    }

    ngOnInit(): void {
    }

    createConsolesList() {
        let chosenConsoles = this.chosenConsoles;
        chosenConsoles = [];
        _.forEach(VIDEO_GAME_CONSOLES, function (value, index) {
            chosenConsoles.push({
                id: index,
                name: value,
                isChosen: false
            });
        });
    }

    onItemChoose(itemId) {
        let index = _.findIndex(this.chosenConsoles, {id: itemId});
        let chosenConsole = this.chosenConsoles[index];
        chosenConsole.isChosen = !chosenConsole.isChosen;
        this.chosenConsoles.splice(index, 1, chosenConsole);
    }

    close() {
        // this.params.closeCallback();
    }
}
