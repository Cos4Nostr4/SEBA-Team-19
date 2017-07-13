import {Component, OnInit} from "@angular/core";
import {Company} from "../../data-objects/company";
import {CompanyService} from "../../services/company.service";
import {CookieHandler} from "../../services/cookie-handler";
import {CompanyAuthenticationService} from "../../services/company-authentication.service";

@Component({
    selector: "app-company-login-page",
    templateUrl: "./company-login-page.component.html",
    styleUrls: ["./company-login-page.component.css"],
    providers: [CompanyService, CompanyAuthenticationService]
})

export class CompanyLoginPageComponent implements OnInit {
    private companyService: CompanyService;
    private companyAuthenticationService: CompanyAuthenticationService;
    private companies: Company[];
    private loginErrorMessage: string;
    private model:any;

    constructor(companyService: CompanyService, companyAuthenticationService: CompanyAuthenticationService) {
        this.companyService = companyService;
        this.companyAuthenticationService = companyAuthenticationService;
        this.companies = [];
        this.loginErrorMessage = null;
        this.model = {email: "", password: ""};
    }

    public ngOnInit(): void {
        this.companyService.getAllCompanies()
            .subscribe(
                companies => {
                    this.companies = companies
                },
                error => {
                    throw new Error(error);
                }
            )
        ;
    }

    public checkForm(): boolean {
        let email = this.model.email;
        let password = this.model.password;
        let company = this.companies.find((company) => company.email === email);
        if (company != null && company.password == password) {
            this.companyAuthenticationService.login(company);
        } else {
            this.loginErrorMessage = "Wrong email or password";
        }
        return false;
    }
}