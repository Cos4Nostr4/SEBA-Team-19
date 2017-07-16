import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {CookieHandler} from "./cookie-handler";
import {Company} from "../data-objects/company";
import {Router} from "@angular/router";


@Injectable()
export class CompanyAuthenticationService {
    public static COOKIE_USERNAME = "company-name";
    public static COOKIE_ID = "company-id";
    private static LOGGED_IN_LANDING_PAGE = "/campany/";
    private static LOGIN_PAGE = "/company-login/";
    private http: Http;
    private router: Router;

    constructor(http: Http, router: Router) {
        this.http = http;
        this.router = router;
    }


    public login(company: Company): void {
        let companyId = company.uuid;
        CookieHandler.addCookie(CompanyAuthenticationService.COOKIE_USERNAME, company.username);
        CookieHandler.addCookie(CompanyAuthenticationService.COOKIE_ID, companyId);
        document.location.href = CompanyAuthenticationService.LOGGED_IN_LANDING_PAGE;
        this.router.navigate([CompanyAuthenticationService.LOGGED_IN_LANDING_PAGE]);
    }

    public isLoggedIn(): boolean {
        let usernameCookieSet = CookieHandler.isCookiePresent(CompanyAuthenticationService.COOKIE_USERNAME);
        let isCookieSet = CookieHandler.isCookiePresent(CompanyAuthenticationService.COOKIE_ID);
        return usernameCookieSet && isCookieSet;
    }

    public ensureIsLoggedIn(): void {
        if (!this.isLoggedIn()) {
            this.router.navigate([CompanyAuthenticationService.LOGIN_PAGE]);
        }
    }

}