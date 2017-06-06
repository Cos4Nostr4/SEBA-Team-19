import {Injectable} from "@angular/core";

const OFFER_LIST: any[] = [
    {title: "bibi"},
    {title: "sep"},
    {title: 'detlef'}
];

@Injectable()
export class OfferService{
    getAllOffers(){
        return OFFER_LIST;
    }
}