import application = require("application");

declare var android: any;
declare var com: any;
declare var java: any;

export class AndroidImagePicker {

    constructor() {
    }

    getPic() {
        let callback = new com.myhexaville.smartimagepicker.OnImagePickedListener();
        callback.onImagePicked = (arg: any) => {
            console.dir(arg);
        };
        let imagePicker = new com.myhexaville.smartimagepicker.ImagePicker(
            application.android.foregroundActivity.getApplicationContext(),
            null,
            callback
        );
        imagePicker.openCamera();
    }
}
