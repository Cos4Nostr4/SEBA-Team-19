import {DBOffer} from "./db-offer";
import {Offer} from "../../../../client/src/frontend/data-objects/offer";


export class OfferMapper {

    public static mapAll(dbOffers: DBOffer[]): Offer[] {
        let offers = [];
        for (let dbOffer of dbOffers) {
            offers.push(this.map(dbOffer))
        }
        return offers;
    }

    public static map(dbOffer: DBOffer): Offer {
        return new Offer(dbOffer.uuid, dbOffer.title, dbOffer.description, dbOffer.image, dbOffer.company,
            dbOffer.amount, dbOffer.requiredNumberOfFollowers, dbOffer.enforcedHashTags, dbOffer.startDate,
            dbOffer.endDate, dbOffer.requests, dbOffer.stillRunning);
    }
}