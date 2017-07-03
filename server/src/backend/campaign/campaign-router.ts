import {CampaignRepository} from "./campaign-repository";
import * as express from "express";
import {Database} from "../database/database";
import {TransferObject} from "../transferobject/transfer-object";
import {Campaign} from "../../../../client/src/frontend/data-objects/campaign";
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
        router.route('/campaigns')
            .get((req, res) =>{
                this.campaignRepository.getAllCampaigns(function (campaigns: Campaign[], error: any) {
                    if (error) {
                        res.status(400);
                        let transferObject = TransferObject.aTransferObjectForError(error);
                        res.json(transferObject);
                    } else {
                        let transferObject = TransferObject.aTransferObjectFor(campaigns);
                        res.json(transferObject);
                    }
                });
            })
            .post((req, res) =>{
                let campaign:Campaign = req.body.data;
                this.campaignRepository.addCampaign(campaign, function(campaign:Campaign, error:any){
                    if(error){
                        res.status(400);
                        let transferObject = TransferObject.aTransferObjectForError(error);
                        res.json(transferObject);
                    }else{
                        let transferObject = TransferObject.aTransferObjectFor(campaign.uuid);
                        res.json(transferObject);
                    }
                });
            });

        router.route('/campaigns/:id')
            .get((req, res) =>{
                let campaignUuid = req.params.id;
                this.campaignRepository.getCampaignWithId(campaignUuid, function (campaign: Campaign, error: any) {
                    if (error) {
                        res.status(400);
                        let transferObject = TransferObject.aTransferObjectForError(error);
                        res.json(transferObject);
                    } else {
                        let transferObject = TransferObject.aTransferObjectFor(campaign);
                        res.json(transferObject);
                    }
                });
            });

        router.route('/campaigns/:id/requests')
            .get((req, res) =>{
                let campaignUuid = req.params.id;
                this.requestRepository.getAllRequestsForCampaign(campaignUuid,function (requests: Request[], error: any) {
                    if (error) {
                        res.status(400);
                        let transferObject = TransferObject.aTransferObjectForError(error);
                        res.json(transferObject);
                    } else {
                        let transferObject = TransferObject.aTransferObjectFor(requests);
                        res.json(transferObject);
                    }
                });
            });
        application.use(baseUrl, router);
    }
}