import {Component, Inject} from "@angular/core";
import {ApiObject} from "../data-objects/api-object";
import {ApiService} from "../services/api.service";
import {DOCUMENT} from '@angular/platform-browser';

@Component({
    selector: 'api-test-area',
    templateUrl: './api-test-area.component.html',
    styleUrls: ['./api-test-area.component.css'],
    providers: [ApiService]
})
export class ApiObjectComponent {
    private apiObject: ApiObject;
    private apiService: ApiService;

    constructor(@Inject(DOCUMENT) document: any, apiService: ApiService) {
        this.apiObject = new ApiObject(1, "TestObject");
        this.apiService = apiService;
    }

    ngOnInit(): void {
      this.apiService.ensureLoggedIn(document);
    }
}
