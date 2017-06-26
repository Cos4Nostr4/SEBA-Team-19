
import * as mongoose from "mongoose";
import {Model} from "mongoose";
import {ICampaignRepository} from "../campaign/campaign-repository";
import {campaignSchema} from "../campaign/campaign-schema";
import {DBCategory} from "./db-category";
import {DBCampaign} from "../campaign/db-campaign";
import {Offer} from "../../../../client/src/frontend/data-objects/offer";
import {CampaignMapper} from "../campaign/campaign-mapper";

export class CategoryRepository {
    private campaignRepository: Model<ICampaignRepository>;


    private constructor(offerModel: Model<ICampaignRepository>) {
        this.campaignRepository = offerModel;
    }

    public static createNewInstance(connection: mongoose.Connection): CategoryRepository {
        let campaignRepository: Model<ICampaignRepository> = connection.model<ICampaignRepository>("Campaign", campaignSchema);
        return new CategoryRepository(campaignRepository);
    }

    public getAllCampaignsForCategory(category: DBCategory, func: Function) {
        let categoryAsString: string = DBCategory[category];
        this.campaignRepository.find({categories: categoryAsString})
            .populate("company", "-_id -__v")
            .exec(function (err: any, dbCampaigns: DBCampaign[]) {
                let offers: Offer[] = CampaignMapper.mapAll(dbCampaigns);
                func(offers);
            });
    }
}