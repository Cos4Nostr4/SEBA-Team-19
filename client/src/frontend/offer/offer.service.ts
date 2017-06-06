import {Injectable} from "@angular/core";
import {Offer} from "./offer";

const OFFER_LIST: Offer[] = [
    {id:1, title: "bibi"},
    {id:2, title: "sep"},
    {id:3, title: 'detlef'}
];

@Injectable()
export class OfferService{
    getAllOffers(): Promise<Offer[]>{
        return Promise.resolve(OFFER_LIST);
    }
}