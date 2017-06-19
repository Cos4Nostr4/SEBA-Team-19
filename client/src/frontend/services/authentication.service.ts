import {Injectable} from "@angular/core";
declare var jquery: any;
declare var $: any;


const CLIENT_ID = "1083168b29cb4a1e8b0bf6a6ddb3c1c9";


@Injectable()
export class AuthenticationService {

    public ensureLoggedIn() {
        console.log("Start ensure logged in");
        if(!this.isLoggedIn()){
            this.login();
        }
    }


    public isLoggedIn(): boolean {
        console.log("Call is logged in");
        this.checkForAccessToken();

        let cookie = document.cookie;
        console.log("Cookie: " + cookie);
        return (cookie && cookie.includes("token="));
    }

    public login() {
        this.checkForAccessToken();

        if (!this.isLoggedIn()) {
            let url = document.location.href;
            document.location.href = "https://api.instagram.com/oauth/authorize/?client_id=" + CLIENT_ID + "&redirect_uri=" + url + "&response_type=token";
        }
    }

    private checkForAccessToken() {
        let url = document.location.href;
        console.log("URL" + url);

        if (url.includes('access_token')) {
            let accessToken = this.getAccessToken();
            document.cookie = "token=" + accessToken;
            console.log("Cookie set");
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
        }else{
            throw new Error("Can't extract token from url '"+url+"'");
        }
    }
}