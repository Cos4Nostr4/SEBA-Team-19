import {Observable} from "rxjs/Observable";
import InsSelfData from "../data-objects/ins-self-data";
import {Config} from "../config/config";
import JsonExtractor from "./json-extractor";
import ServiceErrorHandler from "./service_error_handler";
import {Http} from "@angular/http";


const INSTAGRAMM_BACKEND_BASE_URL = Config.backend_address + ":" + Config.backend_port + Config.backend_base_url + "instagram/";

export class InstagrammDataService{
    private http:Http;


    constructor(http: Http) {
        this.http = http;
    }

    public getSelfData(username: string):Observable<InsSelfData>{
        let url = INSTAGRAMM_BACKEND_BASE_URL + "self";
        let selfData: Observable<InsSelfData> = this.http.post(url, {username})
            .map(JsonExtractor.extractData)
            .catch(ServiceErrorHandler.handleError);
        return selfData;
    }
}