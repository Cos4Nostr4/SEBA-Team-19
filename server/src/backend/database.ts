import {Model} from "mongoose";
import {IOfferRepository} from "./offer/offer-repository";
export interface IDatabase{
    offer: Model<IOfferRepository>;
}