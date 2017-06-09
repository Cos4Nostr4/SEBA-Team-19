import {OfferRepository} from "./offer-repository";
import * as express from "express";
import {Database} from "../database/database";
import {TransferObject} from "../transferobject/transfer-object";
import {Offer} from "../../../../client/src/frontend/offer-list-view/offer";

export class OfferRouter {
    private database: Database;
    private offerRepository: OfferRepository;

    constructor() {
        this.database = Database.connect();
        this.offerRepository = this.database.accessOfferRepository();
    }


    public configureRoutes(baseUrl: string, application: express.Application) {
        let offerRepository: OfferRepository = this.offerRepository;

        let router: express.Router = express.Router();
        router.route('/offers')
            .get(function (req, res) {
                offerRepository.getAllOffers(function (offers: Offer[]) {
                    let transferObject = TransferObject.aTransferObjectFor(offers);
                    res.json(transferObject);
                });
            });
        application.use(baseUrl, router);
    }
}