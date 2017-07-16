import {Component, OnInit} from "@angular/core";
import {Company} from "../../data-objects/company";
import {CompanyService} from "../../services/company.service";
import UUID from "../../../../../server/src/backend/uuid/uuid";
import {CompanyAuthenticationService} from "../../services/company-authentication.service";

@Component({
    selector: "app-company-register-page",
    templateUrl: "./company-register-page.component.html",
    styleUrls: ["./company-register-page.component.css"],
    providers: [CompanyService, CompanyAuthenticationService]
})

export class CompanyRegisterPageComponent implements OnInit {
    private companyService: CompanyService;
    private companyAuthenticationService: CompanyAuthenticationService;
    private formData = {name: "", email: "", password: "", address: "", terms:""};
    private companies: Company[];
    private registerErrorMessage: string;


    constructor(companyService: CompanyService, companyAuthenticationService: CompanyAuthenticationService) {
        this.companyService = companyService;
        this.companyAuthenticationService = companyAuthenticationService;
        this.companies = [];
        this.registerErrorMessage = null;
    }

    ngOnInit() {
        this.companyService.getAllCompanies()
            .subscribe(
                companies => {
                    this.companies = companies
                },
                error => {
                    throw new Error(error)
                });
    }

    performRegistration(): boolean {
        this.registerErrorMessage = null;

        if (this.usernameAlreadyExisting()) {
            this.registerErrorMessage = "Username already exists";
            return false;
        }

        if (this.emailAlreadyExisting()) {
            this.registerErrorMessage = "Email already exists";
            return false;
        }

        this.registerCompany(this.formData);
    }

    private emailAlreadyExisting(): boolean {
        let companyWithEmail = this.companies.find((company) => company.email === this.formData.email);
        return companyWithEmail != null;
    }

    private usernameAlreadyExisting(): boolean {
        let companyWithEmail = this.companies.find((company) => company.email === this.formData.name);
        return companyWithEmail != null;
    }

    private registerCompany(formData: { name: string, email: string, password: string, address: string }) {
        let uuid = UUID.createNew().asStringValue();
        let profilPicture = "";
        let contact = "";
        let paymentInformation = "";
        let taxInformation = "";
        let companyToCreate = new Company(uuid, formData.name, formData.name, formData.password, formData.email,
            profilPicture, contact, formData.address, paymentInformation, taxInformation, false);
        this.companyService.addCompany(companyToCreate)
            .subscribe(
                addedCompanyId => {
                    this.companyAuthenticationService.login(companyToCreate);
                },
                error => {
                    throw new Error(error)
                }
            );
    }
}