import {Injectable} from "@angular/core";

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
        }else {
            console.log("no token found");
        }
    }

    public ensureLoggedIn(document: any) {
        console.log("Start ensure logged in");
        this.getAccessToken(document);

    }
}