import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ThreadService {

    constructor() {
        (function (Observable) {

            Observable.prototype.map = mapWorker;

            function mapWorker(cb) {
                let subject = new Subject<any>();
                let worker = _createWorker(cb);

                worker.onmessage = function (e) {
                    subject.next(e.data);
                };

                this.subscribe(function (value) {
                    worker.postMessage(value);
                });

                return subject;
            }

            function _createWorker(fn) {
                let blob = new Blob(
                    [
                        'self.cb = ', fn, ';',
                        'self.onmessage = function (e) { self.postMessage(self.cb(e.data)) }'
                    ], {
                        type: 'text/javascript'
                    }
                );

                let url = URL.createObjectURL(blob);

                return new Worker(url);
            }

        })(Observable);
    }
}
