import {Observable} from "rxjs/Observable";
import InsSelfData from "../data-objects/ins-user-data";
import {Config} from "../config/config";
import JsonExtractor from "./json-extractor";
import ServiceErrorHandler from "./service_error_handler";
import {Http} from "@angular/http";
import {Injectable} from "@angular/core";
import {CookieHandler} from "./cookie-handler";
import InsRecentMedia from "../data-objects/ins-recent-media";


const INSTAGRAMM_BACKEND_BASE_URL = Config.backend_address + ":" + Config.backend_port + Config.backend_base_url + "instagram/";

@Injectable()
export class InstagrammDataService{
    private http:Http;


    constructor(http: Http) {
        this.http = http;
    }

    public getSelfData():Observable<InsSelfData>{
        let accessToken = CookieHandler.getCookie("token");
        let url = INSTAGRAMM_BACKEND_BASE_URL + "self/"+accessToken;
        let selfData: Observable<InsSelfData> = this.http.get(url)
            .map(JsonExtractor.extractData)
            .catch(ServiceErrorHandler.handleError);
        return selfData;
    }

    public getUserData(username: string):Observable<InsSelfData>{
        let url = INSTAGRAMM_BACKEND_BASE_URL + "user/"+username;
        let selfData: Observable<InsSelfData> = this.http.get(url)
            .map(JsonExtractor.extractData)
            .catch(ServiceErrorHandler.handleError);
        return selfData;
    }

    public getRecentMedia(username:string):Observable<InsRecentMedia[]>{
        let url = INSTAGRAMM_BACKEND_BASE_URL + "media/"+username;
        let selfData: Observable<InsRecentMedia[]> = this.http.get(url)
            .map(JsonExtractor.extractData)
            .catch(ServiceErrorHandler.handleError);
        return selfData;
    }
}