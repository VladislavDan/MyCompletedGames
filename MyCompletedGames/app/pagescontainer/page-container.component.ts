import {Component, OnInit} from "@angular/core";

import 'rxjs/add/operator/mergeMap'

@Component({
    selector: "page-container",
    moduleId: module.id,
    templateUrl: "./page-container.component.html",
    styleUrls: ['./page-container.css']
})
export class PageContainerComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }
}
