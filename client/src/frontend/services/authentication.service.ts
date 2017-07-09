import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Config} from "../config/config";
import JsonExtractor from "./json-extractor";
import ServiceErrorHandler from "./service_error_handler";
import "rxjs/add/operator/toPromise";
import {CookieHandler} from "./cookie-handler";

declare var jquery: any;
declare var $: any;


const CLIENT_ID = "1083168b29cb4a1e8b0bf6a6ddb3c1c9";
const INSTAGRAMM_BACKEND_BASE_URL = Config.backend_address + ":" + Config.backend_port + Config.backend_base_url + "instagram/";

@Injectable()
export class AuthenticationService {
    private http: Http;

    constructor(http: Http) {
        this.http = http;
    }


    public ensureLoggedIn() {
        if (!this.isLoggedIn()) {
            this.login();
        }
    }


    public isLoggedIn(): boolean {
        this.checkForAccessToken();

        let cookie = document.cookie;
        console.log("Cookie: " + cookie);
        let isLoggedIn = (cookie && cookie.includes("token="));
        console.log("IsLoggedIn:" + ((isLoggedIn) ? "true" : "false") + " with cookie: " + cookie);
        return isLoggedIn;
    }

    public login() {
        this.checkForAccessToken();

        if (!this.isLoggedIn()) {
            //Go back to same page (DEACTIVATED)
            let url = document.location.href;

            //Go to CampssPage (ACTIVATED)
            let url_CampusPage = "http://localhost:4200/default-page";

            document.location.href = "https://api.instagram.com/oauth/authorize/?client_id=" + CLIENT_ID + "&redirect_uri=" + url_CampusPage + "&response_type=token";
        }
    }

    private async checkForAccessToken() {
        let url = document.location.href;

        if (url.includes('access_token')) {
            let accessToken = this.getAccessToken();

            let login_url = INSTAGRAMM_BACKEND_BASE_URL + "login/" + accessToken;
            await this.http.get(login_url)
                .map(JsonExtractor.extractData)
                .catch(ServiceErrorHandler.handleError)
                .subscribe(
                    selfData => {
                        CookieHandler.addCookie("token", accessToken);
                        CookieHandler.addCookie("username", selfData.username);
                        document.location.href = url.split(/[?#]/)[0];
                        console.log("Setting cookie to " + document.cookie);
                    },
                    error => {
                        console.log("ERROR when retrieving cookie: " + error);
                    }
                );
        }
    }

    private getAccessToken(): any {
        let url = document.location.href;
        if (url.includes('access_token')) {
            let token = new URL(url).hash.split('&').filter(function (el) {
                if (el.match('access_token') !== null) return true;
            })[0].split('=')[1];

            return token;
        } else {
            throw new Error("Can't extract token from url '" + url + "'");
        }
    }
}