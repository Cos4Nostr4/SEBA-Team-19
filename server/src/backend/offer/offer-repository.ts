import {DBOffer} from "./db-offer";
import * as mongoose from "mongoose";
import {Document, Model} from "mongoose";
import {Offer} from "../../../../client/src/frontend/data-objects/offer";
import {OfferMapper} from "./offer-mapper";
import {offerSchema} from "./offer-schema";

export interface IOfferRepository extends DBOffer, Document {

}

export class OfferRepository {
    private model: Model<IOfferRepository>;


    private constructor(model: Model<IOfferRepository>) {
        this.model = model;
    }

    public static createNewInstance(connection: mongoose.Connection): OfferRepository {
        let model: Model<IOfferRepository> = connection.model<IOfferRepository>("Offer", offerSchema);
        return new OfferRepository(model);
    }

    public getAllOffers(func: Function) {
        this.model.find(function (err: any, offerList: DBOffer[]) {
            let offers = OfferMapper.mapAll(offerList);
            func(offers);
        });
    }
}