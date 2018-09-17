import {LoadingIndicator} from "nativescript-loading-indicator";
import {Subscription} from "rxjs";
import * as _ from "lodash";

import {AlertMessage} from "../typings/AlertMessage";
import {OnDestroy} from "@angular/core";

export class BaseComponent implements OnDestroy {

    private loadingIndicator = new LoadingIndicator();

    public subscriptions: Subscription[] = [];

    constructor() {
    }

    showProgress() {
        this.loadingIndicator.show();
    }

    hideProgress() {
        this.loadingIndicator.hide();
    }

    showAlert(alertMessage: AlertMessage) {
        let options = {
            title: alertMessage.title,
            message: alertMessage.message,
            okButtonText: "Ok"
        };
        alert(options);
    }

    ngOnDestroy() {
        _.forEach(this.subscriptions, (subscription) => {
            subscription.unsubscribe();
        });
    }
}