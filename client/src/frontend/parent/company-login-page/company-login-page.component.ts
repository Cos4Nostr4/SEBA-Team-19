import {Component} from "@angular/core";
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import {Company} from "../../data-objects/company";
import {CompanyService} from "../../services/company.service";

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
 
  constructor (private companyService: CompanyService) {}

  onEnter(email: string) { this.email = email; }

  onEnter2(password: string) { this.password = password; }

  ngOnInit() { this.getHeroes(); }

  checkData(email: string, password: string) {
  	console.log("I AM HERE !!!!")
    this.email = email;
    this.password = password;
    console.log("Email: "+this.email+"  Password: "+this.password);
  }

   getHeroes() {
    this.companyService.getHeroes()
                     .subscribe(
                       companies => this.companies = companies,
                       error =>  this.errorMessage = <any>error);
  }





  model = new Company("18", 'Jens', "Peteee", 'Passwort',"a","b","v","fds","sdfa",false);

  submitted = false;

  onSubmit() { this.submitted = true; }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }
 

}