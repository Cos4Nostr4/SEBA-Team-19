import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions} from "@angular/http";
declare var jquery: any;
declare var $: any;


const CLIENT_ID = "1083168b29cb4a1e8b0bf6a6ddb3c1c9";


@Injectable()
export class AuthenticationService {
    private http: Http;

    constructor(http: Http) {
        this.http = http;
    }


    public ensureLoggedIn() {
        console.log("Start ensure logged in");
        if (!this.isLoggedIn()) {
            this.login();
        }
    }


    public isLoggedIn(): boolean {
        console.log("Call is logged in");
        this.checkForAccessToken();

        let cookie = document.cookie;
        console.log("Cookie: " + cookie);

        let accessToken = cookie.substr(6);
        console.log("TRY to retrieve data with access token:" + accessToken);

        /*let headers = new Headers();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Headers', 'Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With');
        headers.append('Access-Control-Allow-Methods', 'GET, PUT, POST');
        let options = new RequestOptions({headers: headers});*/

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        this.http.get('https://api.instagram.com/v1/users/self/?access_token=' + accessToken, options)
            .subscribe((data: any) => {
                console.log("DATA: " + data);
            });

        return (cookie && cookie.includes("token="));
    }

    public login() {
        this.checkForAccessToken();

        if (!this.isLoggedIn()) {
            //Go back to same page (DEACTIVATED)
            let url = document.location.href;

            //Go to CampssPage (ACTIVATED)
            let url_CampusPage = "http://localhost:4200/app-campus-page"

            document.location.href = "https://api.instagram.com/oauth/authorize/?client_id=" + CLIENT_ID + "&redirect_uri=" + url_CampusPage + "&response_type=token";
        }
    }

    private checkForAccessToken() {
        let url = document.location.href;
        console.log("URL" + url);

        if (url.includes('access_token')) {
            let accessToken = this.getAccessToken();
            document.cookie = "token=" + accessToken;

            console.log("Cookie set to " + document.cookie);
        }
    }

    private getAccessToken(): any {
        let url = document.location.href;
        console.log("URL" + url);

        if (url.includes('access_token')) {
            let token = new URL(url).hash.split('&').filter(function (el) {
                if (el.match('access_token') !== null) return true;
            })[0].split('=')[1];

            console.log("Token: " + token);
            return token;
        } else {
            throw new Error("Can't extract token from url '" + url + "'");
        }
    }
}