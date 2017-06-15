import {Injectable} from "@angular/core";
import {ApiObject} from "../data-objects/api-object";
import {Router} from '@angular/router';


@Injectable()
export class AuthenticationService {

	public code: string;
	public error: string;
	private router: Router;

	constructor(router: Router){
		this.router = router;
	}

   	public authenticate(){
    	const queryParams = this.router.routerState.snapshot.root.queryParams;
    	this.code = queryParams['token'];
    	this.error = queryParams['error'];
    	const error_description = queryParams['error_description'];
    	console.log("CODE: ", this.code)
    	console.log("ERROR: ", this.error)
    	console.log("QueryParams: ",queryParams)
    }

    public ensureLoggedIn(){

    }

    public isLoggedIn(): boolean{
    	return true;
    }

}