import {Observable} from 'rxjs/Observable';
import {ApiObject} from "../data-objects/api-object";
import {AuthenticationService} from "../services/authentification.service";
import {Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'api-test-area',
    templateUrl: './api-test-area.component.html',
    styleUrls: ['./api-test-area.component.css'],
    providers: [AuthenticationService]
})
export class ApiObjectComponent {
    private apiObject: ApiObject;

    constructor() {
        this.apiObject = new ApiObject(1, "Very important content");
    }
}

@Component({
    selector: 'authentication-service',
    templateUrl: './api-test-area.component.html',
    styleUrls: ['./api-test-area.component.css'],
    providers: [AuthenticationService]
})

export class InstagramAuthenticationCallbackComponent /*implements OnInit*/ {

 // private authenticationService: AuthenticationService;

  //constructor(authenticationService: AuthenticationService){
  //  this.authenticationService = authenticationService;
    //this.authenticationService.authenticate();
 // }





/*  codeStatus: boolean = false;
  private code: string;
  private error: string;

  constructor(private router: Router) {

  }

  ngOnInit() {
    const queryParams = this.router.routerState.snapshot.root.queryParams;
    this.code = queryParams['token'];
    this.error = queryParams['error'];
    const error_description = queryParams['error_description'];
    console.log("CODE: ", this.code)
    console.log("ERROR: ", this.error)
    console.log("QueryParams: ",queryParams)
  }
*/
}
