import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import {Config} from "../config/config";
import {Request} from "../data-objects/request";
import JsonExtractor from "./json-extractor";
import ServiceErrorHandler from "./service_error_handler";


const URL_ALL_REQUESTS = Config.backend_address + ":" + Config.backend_port + Config.backend_base_url + "requests";

@Injectable()
export class RequestService {

    private http: Http;

    constructor(http: Http) {
        this.http = http;
    }


    public getAllRequests(): Observable<Request[]> {
        let allRequests: Observable<Request[]> = this.http.get(URL_ALL_REQUESTS)
            .map(this.extractData)
            .catch(this.handleError);
        return allRequests;
    }


    public getRequestsForInfluencer(uuid: string): Observable<Request[]> {
        return this.getAllRequests()
            .map(requests => requests.filter(request => request.influencer.uuid == uuid))
    }


    public getRequestsForCampaign(uuid: string): Observable<Request[]> {
        return this.getAllRequests()
            .map(requests => requests.filter(request => request.campaign.uuid == uuid));
    }

    public addRequest(request: Request): Observable<string> {
        let url = URL_ALL_REQUESTS;
        let requestUuidObservable = this.http.post(url, {data: request})
            .map(JsonExtractor.extractData)
            .catch(ServiceErrorHandler.handleError);
        return requestUuidObservable;
    }

    public updatRequest(request: Request): Observable<Request> {
        let url = URL_ALL_REQUESTS + "/" + request.uuid;
        let updatedRequest: Observable<Request> = this.http.put(url, {data: request})
            .map(JsonExtractor.extractData)
            .catch(ServiceErrorHandler.handleError);
        return updatedRequest;
    }


    private    extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }


    private    handleError(error: Response | any) {
        //TODO: implement more sophisticated logging
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}
