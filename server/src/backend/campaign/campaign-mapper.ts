import {DBCampaign} from "./db-campaign";
import {Campaign} from "../../../../client/src/frontend/data-objects/campaign";
import {Company} from "../../../../client/src/frontend/data-objects/company";
import {CompanyMapper} from "../company/company-mapper";
import {DBCategory} from "../categories/db-category";


export class CampaignMapper {

    public static mapAll(dbCampaigns: DBCampaign[]): Campaign[] {
        let campaigns = [];
        for (let dbCampaign of dbCampaigns) {
            campaigns.push(this.map(dbCampaign))
        }
        return campaigns;
    }

    public static map(dbCampaign: DBCampaign): Campaign {
        let company: Company = CompanyMapper.map(dbCampaign.company);
        return new Campaign(dbCampaign.uuid, dbCampaign.title, dbCampaign.description, dbCampaign.image, company,
            dbCampaign.amount, dbCampaign.requiredNumberOfFollowers, dbCampaign.enforcedHashTags, dbCampaign.startDate,
            dbCampaign.endDate, dbCampaign.stillRunning);
    }

    public static mapToDbObject(campaign: Campaign): DBCampaign {
        let dbCompany = CompanyMapper.mapToDbObject(campaign.company);
        let dbCategories: DBCategory[] = [];
        return new DBCampaign(campaign.uuid, campaign.title, campaign.description, campaign.image, dbCompany,
            campaign.amount, campaign.requiredNumberOfFollowers, campaign.enforcedHashTags, campaign.startDate,
            campaign.endDate, dbCategories, campaign.stillRunning);
    }
}