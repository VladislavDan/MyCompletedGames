import {Component, EventEmitter, Input, Output} from "@angular/core";
import {ListPicker} from "tns-core-modules/ui/list-picker";

@Component({
    selector: "console-chooser",
    moduleId: module.id,
    templateUrl: "./console-chooser.component.html",
    styleUrls: ['./console-chooser.css']
})
export class ConsoleChooserComponent {

    @Output()
    public callback: EventEmitter<number> = new EventEmitter<number>();

    @Input()
    public elements: Array<String>;

    @Input()
    public selectedIndex: number;

    constructor() {
    }

    selectedIndexChanged(event) {
        let picker = <ListPicker> event.object;
        this.callback.emit(picker.selectedIndex);
        console.log(picker.selectedIndex);
    }
}
