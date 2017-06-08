import {OfferRepository} from "./offer-repository";
import {Offer} from "../../../client/src/frontend/offer-list-view/offer";
import * as express from "express"

export class OfferRouter{
    private offerRepository: OfferRepository;


    constructor() {
        this.offerRepository = new OfferRepository();
    }


    public configureRoutes(baseUrl: string, application: express.Application) {
        let router: express.Router = express.Router();
        let offerRepository = this.offerRepository;
        router.route('/offer')
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
            });

        application.use(baseUrl, router);
    }
}