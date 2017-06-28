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
                influencerRepository.getAllInfluencers(function (influencers: Influencer[], error: String) {
                    if (error) {
                        res.status(400);
                        let transferObject = TransferObject.aTransferObjectForError(error);
                        res.json(transferObject);
                    } else {
                        let transferObject = TransferObject.aTransferObjectFor(influencers);
                        res.json(transferObject);
                    }
                });
            });

        router.route('/influencers/:id')
            .get(function (req, res) {
                let influencerUuid = req.params.id;
                influencerRepository.getInfluencerWithId(influencerUuid, function (influencer: Influencer, error: String) {
                    if (error) {
                        res.status(400);
                        let transferObject = TransferObject.aTransferObjectForError(error);
                        res.json(transferObject);
                    } else {
                        let transferObject = TransferObject.aTransferObjectFor(influencer);
                        res.json(transferObject);
                    }
                });
            });

        application.use(baseUrl, router);
    }
}