import {Component, Input} from "@angular/core";
import {ListPicker} from "tns-core-modules/ui/list-picker";

@Component({
    selector: "console-chooser",
    moduleId: module.id,
    templateUrl: "./console-chooser.component.html",
    styleUrls: ['./console-chooser.css']
})
export class ConsoleChooserComponent {

    @Input()
    public callback: any;

    @Input()
    public elements: Array<String>;

    @Input()
    public selectedIndex: number;

    constructor() {
    }

    selectedIndexChanged(event) {
        let picker = <ListPicker> event.object;
        this.callback(this.elements[picker.selectedIndex]);
    }
}
