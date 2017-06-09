import {Offer} from "../../../../client/src/frontend/offer-list-view/offer";
import mongoose = require("mongoose");
import {Schema} from "mongoose";

export class OfferRepository {
    private static OFFER_SCHEMA: Schema = new Schema({
        id: String,
        title: String
    });
    private dbConnection = mongoose.createConnection("mongodb://localhost:27017/beetoobee")
    private model:any;

    constructor() {
        this.model = this.dbConnection.model("Offer", OfferRepository.OFFER_SCHEMA);
        let newInstance = new this.model;
        newInstance.id = "asd";
        newInstance.title="bebe";
        newInstance.save(function(err:any){
            if(err){
                throw new Error(err);
            }
        });
    }

    public getAllOffer(): Offer[] {
        /*let offer: Offer[] = [
            {'id': 1, 'title': "arnolf"},
            {'id': 2, 'title': "bertram"},
            {'id': 3, 'title': "caspar"},
            {'id': 3, 'title': "detlef"},
        ];
        return offer;*/
        let allOffer:Offer[] = [];
        this.model.find(function (err:any, offer:any) {
            console.log("Database result: "+offer);
            allOffer = offer;
        });
        return allOffer;
    }

    //TODO: replace by find with es6
    public getOfferWithId(id: number) {
        let allOffer: Offer[] = this.getAllOffer();
        let offer: Offer = this.findOfferWithId(allOffer, id);
        return offer;
    }

    private findOfferWithId(allOffer: Offer[], id: number): Offer {
        for (let offer of allOffer) {
            if (offer.id == id) {
                return offer;
            }
        }
        throw new Error("No Offer with id '" + id + "' found");
    }
}