import {IOfferRepository} from "./offer/offer-repository";
import {Offer} from "../../../client/src/frontend/offer-list-view/offer";
import * as express from "express"
import {IDatabase} from "./database";
import * as mongoose from "mongoose";
import {Schema} from "mongoose";
import {OfferRepository} from "./offer/offer-repository_old";
import {IOffer} from "./offer/offer";

export class OfferRouter{
    private offerRepository: OfferRepository;
    private database:IDatabase;
    private static OFFER_SCHEMA: Schema = new Schema({
        id: String,
        title: String
    });

    constructor() {
        this.offerRepository = new OfferRepository();
        let connection: mongoose.Connection = mongoose.createConnection("mongodb://localhost:27017/beetoobee");
        this.database = {offer: connection.model<IOfferRepository>("Offer", OfferRouter.OFFER_SCHEMA)};
    }


    public configureRoutes(baseUrl: string, application: express.Application) {
        let router: express.Router = express.Router();
        let offerRepository = this.offerRepository;
        let Offer: mongoose.Model<IOfferRepository> = this.database.offer;

        router.route('/offer')
            .get(function (req, res) {
                Offer.find(function (err, offerList) {
                    let transferObject:any = {"data":[]};
                    for(let dbOffer of offerList){
                        let offer:Offer = {"id":1, "title":dbOffer.title};
                        transferObject.data.push(offer);
                    }
                    res.json(transferObject);
                })
            });

        /*router.route('/offer')
            .get(function (req, res) {
                let offer: Offer[] = offerRepository.getAllOffer();
                let transferObject = {data:offer};
                res.json(transferObject);
            });

        router.route('/offer/:id')
            .get(function (req, res) {
                let id = req.params.id;
                let offer: Offer = offerRepository.getOfferWithId(id);
                res.json(JSON.stringify(offer));
            });*/

        application.use(baseUrl, router);
    }
}