import {DBOffer} from "./db-offer";
import {Offer} from "../../../../client/src/frontend/data-objects/offer";
import {Company} from "../../../../client/src/frontend/data-objects/company";
import {CompanyMapper} from "../company/company-mapper";


export class OfferMapper {

    public static mapAll(dbOffers: DBOffer[]): Offer[] {
        let offers = [];
        for (let dbOffer of dbOffers) {
            offers.push(this.map(dbOffer))
        }
        return offers;
    }

    public static map(dbOffer: DBOffer): Offer {
        let company: Company = CompanyMapper.map(dbOffer.company);
        return new Offer(dbOffer.uuid, dbOffer.title, dbOffer.description, dbOffer.image, company,
            dbOffer.amount, dbOffer.requiredNumberOfFollowers, dbOffer.enforcedHashTags, dbOffer.startDate,
            dbOffer.endDate, dbOffer.stillRunning);
    }
}