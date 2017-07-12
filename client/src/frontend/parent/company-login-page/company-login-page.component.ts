import {Component} from "@angular/core";
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import {Company} from "../../data-objects/company";
import {CompanyService} from "../../services/company.service";
import {CookieHandler} from "../../services/cookie-handler";

@Component ({
    selector: "app-company-login-page",
    templateUrl: "./company-login-page.component.html",
    styleUrls: ["./company-login-page.component.css"],
    providers: [CompanyService]
})

export class CompanyLoginPageComponent {
errorMessage: string;
  companies: Company[];
  mode = 'Observable';
  email = '';
  password = '';
  submitted = false;
  url = document.location.href;
  model = new Company("","","","","","","","","","",false);
 
  constructor (private companyService: CompanyService) {}

  ngOnInit() { this.getHeroes(); }

  onSubmit(email: string, password: string) {
    this.email = email;
    this.password = password;
    let company = this.companies.find((company) => company.email === email);
    if (company == null){
    	console.log("FAIL, no email match!");
    } else {
    	console.log("SUCCESS!"+company.email);
    	if(company.password == password){
    		CookieHandler.addCookie("companyname",company.username);
            /*document.location.href = this.url.split(/[?#]/)[0];*/
            let id = CookieHandler.getCookie("companyname")
            document.location.href = this.url+"/"+id
            console.log("Setting cookie to " + document.cookie);
    		console.log("SUCCES! You are logging in");
    	} else {
    		console.log("FAIL, password is wrong");
    	}
    }
    this.submitted = true;
    console.log("Email: "+this.email+"  Password: "+this.password);
  }

   getHeroes() {
    this.companyService.getHeroes()
                     .subscribe(
                       companies => this.companies = companies,
                       error =>  this.errorMessage = <any>error);
  }


}