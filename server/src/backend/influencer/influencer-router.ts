import {Database} from "../database/database";
import {InfluencerRepository} from "./influencer-repository";
import {TransferObject} from "../transferobject/transfer-object";
import * as express from "express";
import {Influencer} from "../../../../client/src/frontend/data-objects/influencer";

export class InfluencerRouter {
    private database: Database;
    private influencerRepository: InfluencerRepository;

    constructor() {
        this.database = Database.connect();
        this.influencerRepository = this.database.accessInfluencerRepository();
    }


    public configureRoutes(baseUrl: string, application: express.Application) {
        let influencerRepository: InfluencerRepository = this.influencerRepository;

        let router: express.Router = express.Router();
        router.route('/influencers')
            .get(function (req, res) {
                influencerRepository.getAllInfluencers(function (influencer: Influencer[]) {
                    let transferObject = TransferObject.aTransferObjectFor(influencer);
                    res.json(transferObject);
                });
            });
        application.use(baseUrl, router);
    }
}