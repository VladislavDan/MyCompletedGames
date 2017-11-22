import {LoadingIndicator} from "nativescript-loading-indicator";
import {Subscription} from "rxjs/Subscription";
import * as _ from "lodash";

import {AlertMessage} from "./AlertMessage";

export class BaseComponent {

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