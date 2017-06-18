import {OfferRepository} from "./offer-repository";
import * as express from "express";
import {Database} from "../database/database";
import {TransferObject} from "../transferobject/transfer-object";
import {Offer} from "../../../../client/src/frontend/data-objects/offer";
import {RequestRepository} from "../request/request-repository";
import {Request} from "../../../../client/src/frontend/data-objects/request";

export class OfferRouter {
    private database: Database;
    private offerRepository: OfferRepository;
    private requestRepository: RequestRepository;

    constructor() {
        this.database = Database.connect();
        this.offerRepository = this.database.accessOfferRepository();
        this.requestRepository = this.database.accessRequestRepository();
    }


    public configureRoutes(baseUrl: string, application: express.Application) {
        let offerRepository: OfferRepository = this.offerRepository;
        let requestRepository: RequestRepository = this.requestRepository;

        let router: express.Router = express.Router();
        router.route('/offers')
            .get(function (req, res) {
                offerRepository.getAllOffers(function (offers: Offer[]) {
                    let transferObject = TransferObject.aTransferObjectFor(offers);
                    res.json(transferObject);
                });
            });

        router.route('/offers/:id')
            .get(function (req, res) {
                let offerUuid = req.params.id;
                offerRepository.getOfferWithId(offerUuid, function (offer: Offer) {
                    let transferObject = TransferObject.aTransferObjectFor(offer);
                    res.json(transferObject);
                });
            });

        router.route('/offers/:id/requests')
            .get(function (req, res) {
                let offerUuid = req.params.id;
                requestRepository.getAllRequestsForOffer(offerUuid,function (requests: Request[]) {
                    let transferObject = TransferObject.aTransferObjectFor(requests);
                    res.json(transferObject);
                });
            });
        application.use(baseUrl, router);
    }
}