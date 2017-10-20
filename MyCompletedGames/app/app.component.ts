import {GoogleAuthService} from "./services/GoogleAuthService";
import {Component} from "@angular/core";
import {GoogleFileSyncService} from "./services/GoogleFileSyncService";
require('nativescript-nodeify');

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent {

    constructor(private googleAuthService: GoogleAuthService, private googleFileSyncService: GoogleFileSyncService) {

    }

    ngOnInit() {

        this.googleAuthService.getToken().subscribe(
            (result) => {
                console.log("Result request token: " + result);
                this.googleFileSyncService.requestLoadFile(result).subscribe(
                    (result) => {
                        console.dir(result);
                    },
                    (error) => {
                        console.log(error);
                    }
                )
            }
        )
    }
}
