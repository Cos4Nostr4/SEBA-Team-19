import {CampaignRepository} from "./campaign-repository";
import * as express from "express";
import {Database} from "../database/database";
import {TransferObject} from "../transferobject/transfer-object";
import {Campaign} from "../../../../client/src/frontend/data-objects/offer";
import {RequestRepository} from "../request/request-repository";
import {Request} from "../../../../client/src/frontend/data-objects/request";

export class CampaignRouter {
    private database: Database;
    private campaignRepository: CampaignRepository;
    private requestRepository: RequestRepository;

    constructor() {
        this.database = Database.connect();
        this.campaignRepository = this.database.accessCampaignRepository();
        this.requestRepository = this.database.accessRequestRepository();
    }


    public configureRoutes(baseUrl: string, application: express.Application) {
        let router: express.Router = express.Router();
        router.route('/offers')
            .get((req, res) =>{
                this.campaignRepository.getAllCampaigns(function (offers: Campaign[]) {
                    let transferObject = TransferObject.aTransferObjectFor(offers);
                    res.json(transferObject);
                });
            });

        router.route('/offers/:id')
            .get((req, res) =>{
                let campaignUuid = req.params.id;
                this.campaignRepository.getCampaignWithId(campaignUuid, function (offer: Campaign) {
                    let transferObject = TransferObject.aTransferObjectFor(offer);
                    res.json(transferObject);
                });
            });

        router.route('/offers/:id/requests')
            .get((req, res) =>{
                let campaignUuid = req.params.id;
                this.requestRepository.getAllRequestsForCampaign(campaignUuid,function (requests: Request[]) {
                    let transferObject = TransferObject.aTransferObjectFor(requests);
                    res.json(transferObject);
                });
            });
        application.use(baseUrl, router);
    }
}