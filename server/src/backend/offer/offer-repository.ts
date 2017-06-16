import {DBOffer} from "./db-offer";
import * as mongoose from "mongoose";
import {Document, Model} from "mongoose";
import {Offer} from "../../../../client/src/frontend/data-objects/offer";
import {OfferMapper} from "./offer-mapper";
import {offerSchema} from "./offer-schema";
import {requestSchema} from "../request/request-schema";
import {IRequestRepository} from "../request/request-repository";
import {Request} from "../../../../client/src/frontend/data-objects/request";

export interface IOfferRepository extends DBOffer, Document {

}

export class OfferRepository {
    private offerModel: Model<IOfferRepository>;
    private requestModel: Model<IRequestRepository>;


    private constructor(offerModel: Model<IOfferRepository>, requestModel: Model<IRequestRepository>) {
        this.offerModel = offerModel;
        this.requestModel = requestModel;
    }

    public static createNewInstance(connection: mongoose.Connection): OfferRepository {
        let offerModel: Model<IOfferRepository> = connection.model<IOfferRepository>("Offer", offerSchema);
        let requestModel: Model<IRequestRepository> = connection.model<IRequestRepository>("Request", requestSchema);
        return new OfferRepository(offerModel, requestModel);
    }

    public getAllOffers(func: Function) {
        this.offerModel.find(function (err: any, offerList: DBOffer[]) {
            let offers: Offer[] = OfferMapper.mapAll(offerList);
            func(offers);
        });
    }

    public getOfferWithId(offerUuid:string, func: Function) {
        this.offerModel.findOne({'uuid':offerUuid},function (err: any, dbOffer: DBOffer) {
            let offer: Offer = OfferMapper.map(dbOffer);
            func(offer);
        });
    }

}