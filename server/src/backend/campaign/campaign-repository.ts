import {DBCampaign} from "./db-campaign";
import * as mongoose from "mongoose";
import {Document, Model} from "mongoose";
import {Campaign} from "../../../../client/src/frontend/data-objects/campaign";
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


    private constructor(campaignModel: Model<ICampaignRepository>, requestModel: Model<IRequestRepository>) {
        this.campaignModel = campaignModel;
        this.requestModel = requestModel;
    }

    public static createNewInstance(connection: mongoose.Connection): CampaignRepository {
        let campaignRepository: Model<ICampaignRepository> = connection.model<ICampaignRepository>("Campaign", campaignSchema);
        let requestModel: Model<IRequestRepository> = connection.model<IRequestRepository>("Request", requestSchema);
        return new CampaignRepository(campaignRepository, requestModel);
    }

    public getAllCampaigns(func: Function) {
        this.campaignModel.find()
            .populate("company", "-_id -__v")
            .exec(function (err: any, dbCampaigns: DBCampaign[]) {
            let campaigns: Campaign[] = CampaignMapper.mapAll(dbCampaigns);
            func(campaigns);
        });
    }

    public getCampaignWithId(campaignUuid:string, func: Function) {
        this.campaignModel.findOne({'uuid':campaignUuid})
            .populate("company", "-_id -__v")
            .exec(function (err: any, dbCampaign: DBCampaign) {
            let campaign: Campaign = CampaignMapper.map(dbCampaign);
            func(campaign);
        });
    }

}