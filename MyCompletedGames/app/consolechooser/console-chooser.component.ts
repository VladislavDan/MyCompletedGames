import {Component, OnInit} from "@angular/core";
import {ModalDialogParams} from "nativescript-angular";
import {Page} from "tns-core-modules/ui/page";
import * as application from "tns-core-modules/application";
import {isAndroid} from "tns-core-modules/platform";

@Component({
    selector: "console-chooser",
    moduleId: module.id,
    templateUrl: "./console-chooser.component.html",
    styleUrls: ['./console-chooser.css']
})
export class ConsoleChooserComponent implements OnInit {

    public chosenConsoles: Array<String> = [];

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
    }

    ngOnInit(): void {
    }

    close() {
        // this.params.closeCallback();
    }
}
