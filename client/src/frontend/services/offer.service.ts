import {Injectable} from "@angular/core";
import {Offer} from "../data-objects/offer";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Config} from "../config/config";

@Injectable()
export class OfferService {
    private http: Http;
    private url: string;

    constructor(http: Http) {
        this.http = http;
        this.url = Config.backend_address+":"+Config.backend_port+Config.backend_base_url+'offers';
    }

    public getAllOffers(): Observable<Offer[]> {
        let offerList: Observable<Offer[]> = this.http.get(this.url)
            .map(this.extractData)
            .catch(this.handleError);
        return offerList;
    }

    public getOfferWithId(id: string): Observable<Offer> {
        return this.getAllOffers().map(
            offers => offers.find(offer => offer.uuid == id));
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