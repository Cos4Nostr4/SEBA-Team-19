import {Injectable} from "@angular/core";
import {Campaign} from "../data-objects/campaign";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import {Config} from "../config/config";
import {CategoryMapper} from "../data-objects/categories";

const URL_ALL_OFFERS = Config.backend_address + ":" + Config.backend_port + Config.backend_base_url + 'campaigns';
const URL_BASE_CATEGORY = Config.backend_address + ":" + Config.backend_port + Config.backend_base_url + 'categories/';

@Injectable()
export class CampaignService {
    private http: Http;

    constructor(http: Http) {
        this.http = http;
    }

    public getAllCampaigns(): Observable<Campaign[]> {
        let offers: Observable<Campaign[]> = this.http.get(URL_ALL_OFFERS)
            .map(this.extractData)
            .catch(this.handleError);
        return offers;
    }

    public getCampaignWithId(id: string): Observable<Campaign> {
        return this.getAllCampaigns().map(
            offers => offers.find(offer => offer.uuid == id));
    }

    public getCampaignForCategory(categoryId: number): Observable<Campaign[]> {
        let category: string = CategoryMapper.forId(categoryId);

        console.log("Get Category:" + category);
        let offers: Observable<Campaign[]> = this.http.get(URL_BASE_CATEGORY + category)
            .map(this.extractData)
            .catch(this.handleError);

        return offers;
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }

    private handleError(error: Response | any) {
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