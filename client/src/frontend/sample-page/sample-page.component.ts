import {Component} from "@angular/core";
import {SampleObject} from "../data-objects/sample-object";
import {SampleService} from "../services/sample.service";

@Component({
    selector: 'sample-page',
    templateUrl: './sample-page.component.html',
    styleUrls: ['./sample-page.component.css'],
    providers: [SampleService]
})
export class SampleObjectComponent {
    private sampleObject: SampleObject;

    constructor() {
        this.sampleObject = new SampleObject(1, "Very important content");
    }
}
