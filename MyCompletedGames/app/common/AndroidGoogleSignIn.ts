import application = require("application");
import {Config} from "./Config";

declare var android: any;
declare var com: any;
declare var java: any;

const GOOGLE_SIGNIN_RESULT_CODE = 597965301;

export class AndroidGoogleSignIn {

    private activity: any;

    private actionRunnable = java.lang.Runnable.extend({
        action: undefined,

        run: function () {
            this.action();
        }
    });

    constructor() {
    }

    initEnvironment(callback) {

        let authCode = null;

        this.activity = application.android.foregroundActivity || application.android.startActivity;

        this.activity.onActivityResult = (requestCode, resultCode, data) => {
            try {
                if (requestCode == GOOGLE_SIGNIN_RESULT_CODE) {
                    if (resultCode == android.app.Activity.RESULT_OK) {

                        let signInResult = com.google.android.gms.auth.api.Auth.GoogleSignInApi.getSignInResultFromIntent(data);
                        if (signInResult.isSuccess()) {
                            let account = signInResult.getSignInAccount();
                            authCode = account.getServerAuthCode();
                            callback(authCode);
                        }
                    }
                }
            }
            catch (e) {
                console.log("initEnvironment e: " + e);
            }
        }
    }

    loginWithGoogle(config: Config) {
        try {
            let scopeDrive = new com.google.android.gms.common.api.Scope(config.scope);
            let optionBuilder = new com.google.android.gms.auth.api.signin.GoogleSignInOptions.Builder(com.google.android.gms.auth.api.signin.GoogleSignInOptions.DEFAULT_SIGN_IN)
                .requestScopes(scopeDrive, [])
                .requestServerAuthCode(config.googleServerClientId, false);

            let options = optionBuilder.build();

            let client = new com.google.android.gms.common.api.GoogleApiClient.Builder(this.activity.getApplicationContext())
                .addApi(com.google.android.gms.auth.api.Auth.GOOGLE_SIGN_IN_API, options)
                .build();

            let signInIntent = com.google.android.gms.auth.api.Auth.GoogleSignInApi.getSignInIntent(client);

            let uiAction = new this.actionRunnable();
            uiAction.action = () => {
                try {
                    this.activity.startActivityForResult(signInIntent, GOOGLE_SIGNIN_RESULT_CODE);
                }
                catch (e) {
                    console.log(e);
                }
            };
            this.activity.runOnUiThread(uiAction);
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }
}