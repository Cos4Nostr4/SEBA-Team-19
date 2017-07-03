import {DBCampaign} from "./db-campaign";
import * as mongoose from "mongoose";
import {Document, Model} from "mongoose";
import {Campaign} from "../../../../client/src/frontend/data-objects/campaign";
import {CampaignMapper} from "./campaign-mapper";
import {campaignSchema} from "./campaign-schema";
import {requestSchema} from "../request/request-schema";
import {IRequestRepository} from "../request/request-repository";
import {Request} from "../../../../client/src/frontend/data-objects/request";
import {ICompanyRepository} from "../company/company-repository";
import {companySchema} from "../company/company-schema";

export interface ICampaignRepository extends DBCampaign, Document {

}

export class CampaignRepository {
    private campaignModel: Model<ICampaignRepository>;
    private requestModel: Model<IRequestRepository>;
    private companyModel: Model<ICompanyRepository>;


    private constructor(campaignModel: Model<ICampaignRepository>, requestModel: Model<IRequestRepository>, companyModel: Model<ICompanyRepository>) {
        this.campaignModel = campaignModel;
        this.requestModel = requestModel;
        this.companyModel = companyModel;
    }

    public static createNewInstance(connection: mongoose.Connection): CampaignRepository {
        let campaignRepository: Model<ICampaignRepository> = connection.model<ICampaignRepository>("Campaign", campaignSchema);
        let requestModel: Model<IRequestRepository> = connection.model<IRequestRepository>("Request", requestSchema);
        let companyModel: Model<ICompanyRepository> = connection.model<ICompanyRepository>("Company", companySchema);
        return new CampaignRepository(campaignRepository, requestModel, companyModel);
    }

    public getAllCampaigns(func: Function) {
        this.campaignModel.find()
            .populate("company", "-_id -__v")
            .exec(function (err: any, dbCampaigns: DBCampaign[]) {
                let campaigns: Campaign[] = CampaignMapper.mapAll(dbCampaigns);
                func(campaigns, null);
            });
    }

    public getCampaignWithId(campaignUuid: string, func: Function) {
        this.campaignModel.findOne({'uuid': campaignUuid})
            .populate("company", "-_id -__v")
            .exec(function (err: any, dbCampaign: DBCampaign) {
                if (dbCampaign) {
                    let campaign: Campaign = CampaignMapper.map(dbCampaign);
                    func(campaign, null);
                } else {
                    let errorMessage = "Cannot find Campaign for id '" + campaignUuid + "'";
                    func(null, errorMessage);
                }
            });
    }

    public addCampaign(campaign: Campaign, func: Function) {
        let campaignId = campaign.uuid;
        this.campaignModel.findOne({'uuid': campaignId}, (err: any, dbCampaign: DBCampaign) => {
            if (dbCampaign) {
                let errorMessage = "Campaign for id '" + campaignId + "' already exists.";
                func(null, errorMessage);
            } else {
                let dbCampaign: DBCampaign = CampaignMapper.mapToDbObject(campaign);
                this.companyModel.findOne({'uuid': dbCampaign.company.uuid}, (err: any, dbCompany: any) => {
                    if (err) {
                        func(null, err);
                    } else if (dbCompany) {
                        let campaignModel = new this.campaignModel({
                            uuid: dbCampaign.uuid,
                            title: dbCampaign.title,
                            description: dbCampaign.description,
                            image: dbCampaign.image,
                            company: dbCompany._id,
                            amount: dbCampaign.amount,
                            requiredNumberOfFollowers: dbCampaign.requiredNumberOfFollowers,
                            enforcedHashTags: dbCampaign.enforcedHashTags,
                            startDate: dbCampaign.startDate,
                            endDate: dbCampaign.endDate,
                            categories: dbCampaign.categories,
                            stillRunning: dbCampaign.stillRunning
                        });
                        campaignModel.save((err: any) => {
                            if (err) {
                                func(null, err);
                            } else {
                                func(campaignModel, null);
                            }
                        })
                    } else {
                        let errorMessage = "Cannot create campaign, because referenced company with id '"
                            + dbCampaign.company.uuid + "' does not exists.";
                        func(null, errorMessage);
                    }
                });

            }
        });
    }
}