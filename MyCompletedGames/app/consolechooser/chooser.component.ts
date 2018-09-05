import {Component, EventEmitter, Input, Output} from "@angular/core";
import {action} from "tns-core-modules/ui/dialogs";
import * as _ from "lodash";

@Component({
    selector: "item-chooser",
    moduleId: module.id,
    templateUrl: "./chooser.component.html",
    styleUrls: ['./chooser.css']
})
export class ChooserComponent {

    @Output()
    public callback: EventEmitter<number> = new EventEmitter<number>();

    @Input()
    public elements: Array<string>;

    @Input()
    public selectedIndex: number;

    @Input()
    public dialogTitle: string;

    @Input()
    public description: string;

    constructor() {
    }

    onChangeChoice() {
        let options = {
            title: this.dialogTitle,
            cancelButtonText: "Cancel",
            actions: this.elements
        };

        action(options).then((result) => {
            if (result !== 'Cancel') {
                this.callback.emit(_.findIndex(this.elements, (element) => element === result));
            }
        });
    }
}
