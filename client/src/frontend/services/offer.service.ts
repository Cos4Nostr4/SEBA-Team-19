import {Injectable} from "@angular/core";
import {Offer} from "../data-objects/offer";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Config} from "../config/config";
import {Categories, CategoryMapper} from "../data-objects/categories";

const URL_ALL_OFFERS = Config.backend_address+":"+Config.backend_port+Config.backend_base_url+'offers';
const URL_BASE_CATEGORY = Config.backend_address+":"+Config.backend_port+Config.backend_base_url+'categories/';

@Injectable()
export class OfferService {
    private http: Http;

    constructor(http: Http) {
        this.http = http;
    }

    public getAllOffers(): Observable<Offer[]> {
        let offers: Observable<Offer[]> = this.http.get(URL_ALL_OFFERS)
            .map(this.extractData)
            .catch(this.handleError);
        return offers;
    }

    public getOfferWithId(id: string): Observable<Offer> {
        return this.getAllOffers().map(
            offers => offers.find(offer => offer.uuid == id));
    }

    public getOffersForCategory(categoryId: number): Observable<Offer[]>{
        let category: string = CategoryMapper.forId(categoryId);

        console.log("Get Category:"+category);
        let offers: Observable<Offer[]> = this.http.get(URL_BASE_CATEGORY+category)
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