import {GoogleAuthService} from "./services/GoogleAuthService";
import {Component} from "@angular/core";
require('nativescript-nodeify');

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent {

    constructor(private googleAuthService: GoogleAuthService) {

    }

    ngOnInit() {

        this.googleAuthService.getToken().subscribe(
            (result) => {
                console.log(result);
            }
        )
    }
}
