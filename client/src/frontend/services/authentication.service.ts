import {Injectable} from "@angular/core";
declare var jquery: any;
declare var $: any;

@Injectable()
export class AuthenticationService {

    getAccessToken(document: any): void {
        let url = document.location.href;
        console.log("URL" + url);

        if(url.includes('access_token')) {

            let token = new URL(url).hash.split('&').filter(function (el) {
                if (el.match('access_token') !== null) return true;
            })[0].split('=')[1];
            console.log("Token: " + token);
            document.cookie = "token="+token;
            console.log("Cookie set");
        }else {
            console.log("no token found. redirecting ...");

            document.location.href = "https://api.instagram.com/oauth/authorize/?client_id=1083168b29cb4a1e8b0bf6a6ddb3c1c9&redirect_uri="+url+"&response_type=token"
        }
    }


    public ensureLoggedIn(document: any) {
        console.log("Start ensure logged in");
        this.getAccessToken(document);
    }

    public isLoggedIn(): boolean{
        console.log("Call is logged in");
        let cookie = document.cookie;
        console.log("Cookie: "+cookie);
        return (cookie && cookie.includes("token="));
    }
}