import {Component, EventEmitter, Input, Output} from "@angular/core";
import {ListPicker} from "tns-core-modules/ui/list-picker";

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
