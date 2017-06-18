import {Injectable} from "@angular/core";
import {ApiObject} from "../data-objects/api-object";
import {DOCUMENT} from '@angular/platform-browser';
import {Router} from '@angular/router';

@Injectable()
export class ApiService {
	private token: string;
    private url: string;


   public getApiObject(): ApiObject {
        return new ApiObject(1, "Very important component");
    }

    getAccessToken(): void{
      this.token = new URL(this.url).hash.split('&').filter(function(el) { if(el.match('access_token') !== null) return true; })[0].split('=')[1];
    }

    public ensureLoggedIn(document: any){
    	this.getAccessToken();
    	this.url = document.location.href;
    }
}