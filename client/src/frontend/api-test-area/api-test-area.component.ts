import {Component, Inject, OnInit} from "@angular/core";
import {AuthenticationService} from "../services/authentication.service";
import {DOCUMENT} from "@angular/platform-browser";

@Component({
    selector: 'api-test-area',
    templateUrl: './api-test-area.component.html',
    styleUrls: ['./api-test-area.component.css'],
    providers: [AuthenticationService]
})
export class AuthenticationComponent implements OnInit {
    private apiService: AuthenticationService;
    private document: any;

    constructor(@Inject(DOCUMENT) document: any, apiService: AuthenticationService) {
        this.document = document;
        this.apiService = apiService;
    }

    ngOnInit(): void {
        this.apiService.ensureLoggedIn();
    }
}
