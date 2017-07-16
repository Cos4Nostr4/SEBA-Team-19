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
        let router: express.Router = express.Router();
        router.route('/influencers')
            .get((req, res) => {
                this.influencerRepository.getAllInfluencers(function (influencers: Influencer[], error: String) {
                    if (error) {
                        res.status(400);
                        let transferObject = TransferObject.aTransferObjectForError(error);
                        res.json(transferObject);
                    } else {
                        let transferObject = TransferObject.aTransferObjectFor(influencers);
                        res.json(transferObject);
                    }
                });
            })
            .post((req, res) => {
                let influencer: Influencer = req.body.data;
                this.influencerRepository.addInfluencer(influencer, function (influencer: Influencer, error: any) {
                    if (error) {
                        res.status(400);
                        let transferObject = TransferObject.aTransferObjectForError(error);
                        res.json(transferObject);
                    } else {
                        let transferObject = TransferObject.aTransferObjectFor(influencer.uuid);
                        res.json(transferObject);
                    }
                });
            });

        router.route('/influencers/:id')
            .get((req, res) => {
                let influencerUuid = req.params.id;
                this.influencerRepository.getInfluencerWithId(influencerUuid, function (influencer: Influencer, error: String) {
                    if (error) {
                        res.status(400);
                        let transferObject = TransferObject.aTransferObjectForError(error);
                        res.json(transferObject);
                    } else {
                        let transferObject = TransferObject.aTransferObjectFor(influencer);
                        res.json(transferObject);
                    }
                });
            })
            .put((req, res) => {
                let influencerUuid = req.params.id;
                let influencer: Influencer = req.body.data;
                this.influencerRepository.updateInfluencerWithId(influencerUuid, influencer, function (influencer: Influencer, error: String) {
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

        router.route('/influencersByName/:username')
            .get((req, res) => {
                let username = req.params.username;
                this.influencerRepository.getInfluencerByUsername(username, function (error: string, influencer: Influencer) {
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