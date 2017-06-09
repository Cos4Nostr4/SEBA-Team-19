import {DBOffer} from "./db-offer";
import {Document, Model, Schema} from "mongoose";
import {Offer} from "../../../../client/src/frontend/offer-list-view/offer";
import {OfferMapper} from "./offer-mapper";
import * as mongoose from "mongoose";

let OFFER_SCHEMA: Schema = new Schema({
    id: String,
    title: String
});

export interface IOfferRepository extends DBOffer, Document {

}

export class OfferRepository {
    private model: Model<IOfferRepository>;


    private constructor(model: Model<IOfferRepository>) {
        this.model = model;
    }

    public static createNewInstance(connection: mongoose.Connection):OfferRepository{
        let model:Model<IOfferRepository> = connection.model<IOfferRepository>("Offer", OFFER_SCHEMA);
        return new OfferRepository(model);
    }

    public getAllOffers(func:Function) {
        this.model.find(function (err: any, offerList: DBOffer[]) {
            let offers = OfferMapper.mapAll(offerList);
            func(offers);
        });
    }
}

/*
 offerRepository.find(function (err: any, offerList: DBOffer[]) {
 let offers = OfferMapper.mapAll(offerList);
 let transferObject = TransferObject.aTransferObjectFor(offers);

 res.json(transferObject);
 })
 */