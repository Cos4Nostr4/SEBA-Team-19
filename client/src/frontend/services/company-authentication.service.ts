import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {CookieHandler} from "./cookie-handler";
import {Company} from "../data-objects/company";


@Injectable()
export class CompanyAuthenticationService {
    public static COOKIE_USERNAME = "company-name";
    public static COOKIE_ID = "company-id";
    private static LOGGED_IN_LANDING_PAGE = "http://localhost:4200/campany/";
    private static LOGIN_PAGE = "http://localhost:4200/company-login/";
    private http: Http;

    constructor(http: Http) {
        this.http = http;
    }


    public login(company: Company): void {
        let companyId = company.uuid;
        CookieHandler.addCookie(CompanyAuthenticationService.COOKIE_USERNAME, company.username);
        CookieHandler.addCookie(CompanyAuthenticationService.COOKIE_ID, companyId);
        document.location.href = CompanyAuthenticationService.LOGGED_IN_LANDING_PAGE;
    }

    public isLoggedIn() : boolean{
        let usernameCookieSet = CookieHandler.isCookiePresent(CompanyAuthenticationService.COOKIE_USERNAME);
        let isCookieSet = CookieHandler.isCookiePresent(CompanyAuthenticationService.COOKIE_ID);
        return usernameCookieSet && isCookieSet;
    }

    public ensureIsLoggedIn(): void {
        if(!this.isLoggedIn()){
            document.location.href = CompanyAuthenticationService.LOGIN_PAGE;
        }
    }
}