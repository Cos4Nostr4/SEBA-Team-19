import {Component} from "@angular/core";
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import {Company} from "../../data-objects/company";
import {CompanyService} from "../../services/company.service";
import {CookieHandler} from "../../services/cookie-handler";
import {Headers, RequestOptions} from '@angular/http';

@Component ({
    selector: "app-company-register-page",
    templateUrl: "./company-register-page.component.html",
    styleUrls: ["./company-register-page.component.css"],
    providers: [CompanyService]
})

export class CompanyRegisterPageComponent {
  errorMessage: string;
  companies: Company[];
  mode = 'Observable';
  submitted = false;
  url = document.location.href;
  model = new Company("","","","","","","","","","",false);
 
  constructor (private companyService: CompanyService) {}

  ngOnInit() { this.getHeroes(); }

  onSubmit(email: string, password: string, companyName: string, address: string) {
    let companyEmail = this.companies.find((company) => company.email === email);
    let companyUsername = this.companies.find((company) => company.name === name)

    if (companyEmail == null){
    	console.log("SUCCESS, no email match! New Account");      
      if (companyUsername == null) {
        console.log("SUCCESS, no company name match! New company name!");
        this.model.email = email;
        this.model.password = password;
        this.model.name = companyName;
        this.model.address = address;
        this.addCompany(this.model);

      } else {
        console.log("FAIL! "+companyUsername.name+"  Company name already exists!" )
      }
    } else {
    	console.log("FAIL!"+companyEmail.email+ "  Email already exists!");
    }
    
    this.submitted = true;
    console.log("Email: "+email+"  Password: "+password+"  Name: "+companyName+"   Address: "+address);
  }


  addCompany(company: Company) {
    this.companyService.addCompany(company)
  }

   getHeroes() {
    this.companyService.getAllCompanies()
                     .subscribe(
                       companies => this.companies = companies,
                       error =>  this.errorMessage = <any>error);
  }




}