
import * as mongoose from "mongoose";
import {Model} from "mongoose";
import {IOfferRepository} from "../offer/offer-repository";
import {offerSchema} from "../offer/offer-schema";
import {DBCategory} from "./db-category";
import {DBOffer} from "../offer/db-offer";
import {Offer} from "../../../../client/src/frontend/data-objects/offer";
import {OfferMapper} from "../offer/offer-mapper";

export class CategoryRepository {
    private offerModel: Model<IOfferRepository>;


    private constructor(offerModel: Model<IOfferRepository>) {
        this.offerModel = offerModel;
    }

    public static createNewInstance(connection: mongoose.Connection): CategoryRepository {
        let offerModel: Model<IOfferRepository> = connection.model<IOfferRepository>("Offer", offerSchema);
        return new CategoryRepository(offerModel);
    }

    public getAllOffersForCategory(category: DBCategory, func: Function) {
        let categoryAsString: string = DBCategory[category];
        this.offerModel.find({categories: categoryAsString})
            .populate("company", "-_id -__v")
            .exec(function (err: any, offerList: DBOffer[]) {
                let offers: Offer[] = OfferMapper.mapAll(offerList);
                func(offers);
            });
    }
}