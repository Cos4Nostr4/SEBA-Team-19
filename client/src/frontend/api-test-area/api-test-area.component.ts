import {Component} from "@angular/core";
import {ApiObject} from "../data-objects/api-object";
import {ApiService} from "../services/api.service";

@Component({
    selector: 'api-test-area',
    templateUrl: './api-test-area.component.html',
    styleUrls: ['./api-test-area.component.css'],
    providers: [ApiService]
})
export class ApiObjectComponent {
    private apiObject: ApiObject;

    constructor() {
        this.apiObject = new ApiObject(1, "Very important content");
    }
}
