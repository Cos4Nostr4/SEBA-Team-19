import {DBCampaign} from "./db-campaign";
import * as mongoose from "mongoose";
import {Document, Model} from "mongoose";
import {Campaign} from "../../../../client/src/frontend/data-objects/offer";
import {CampaignMapper} from "./campaign-mapper";
import {campaignSchema} from "./campaign-schema";
import {requestSchema} from "../request/request-schema";
import {IRequestRepository} from "../request/request-repository";
import {Request} from "../../../../client/src/frontend/data-objects/request";

export interface ICampaignRepository extends DBCampaign, Document {

}

export class CampaignRepository {
    private campaignModel: Model<ICampaignRepository>;
    private requestModel: Model<IRequestRepository>;


    private constructor(offerModel: Model<ICampaignRepository>, requestModel: Model<IRequestRepository>) {
        this.campaignModel = offerModel;
        this.requestModel = requestModel;
    }

    public static createNewInstance(connection: mongoose.Connection): CampaignRepository {
        let offerModel: Model<ICampaignRepository> = connection.model<ICampaignRepository>("Campaign", campaignSchema);
        let requestModel: Model<IRequestRepository> = connection.model<IRequestRepository>("Request", requestSchema);
        return new CampaignRepository(offerModel, requestModel);
    }

    public getAllCampaigns(func: Function) {
        this.campaignModel.find()
            .populate("company", "-_id -__v")
            .exec(function (err: any, dbCampaigns: DBCampaign[]) {
            let offers: Campaign[] = CampaignMapper.mapAll(dbCampaigns);
            func(offers);
        });
    }

    public getCampaignWithId(campaignUuid:string, func: Function) {
        this.campaignModel.findOne({'uuid':campaignUuid})
            .populate("company", "-_id -__v")
            .exec(function (err: any, dbCampaign: DBCampaign) {
            let offer: Campaign = CampaignMapper.map(dbCampaign);
            func(offer);
        });
    }

}