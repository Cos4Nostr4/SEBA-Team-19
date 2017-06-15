import {DBOffer} from "./db-offer";
import * as mongoose from "mongoose";
import {Document, Model, Schema} from "mongoose";
import {Offer} from "../../../../client/src/frontend/data-objects/offer";
import {OfferMapper} from "./offer-mapper";

let OFFER_SCHEMA: Schema = new Schema({
    id: String,
    title: String,
    description: String,
    image: String,
    company: String,
    amount: Number,
    requiredNumberOfFollowers: Number,
    enforcedHashTags: [String],
    startDate: Date,
    endDate: Date,
    requests: [String],
    stillRunning: Boolean
});

export interface IOfferRepository extends DBOffer, Document {

}

export class OfferRepository {
    private model: Model<IOfferRepository>;


    private constructor(model: Model<IOfferRepository>) {
        this.model = model;
    }

    public static createNewInstance(connection: mongoose.Connection): OfferRepository {
        let model: Model<IOfferRepository> = connection.model<IOfferRepository>("Offer", OFFER_SCHEMA);
        return new OfferRepository(model);
    }

    public getAllOffers(func: Function) {
        this.model.find(function (err: any, offerList: DBOffer[]) {
            let offers = OfferMapper.mapAll(offerList);
            func(offers);
        });
    }
}