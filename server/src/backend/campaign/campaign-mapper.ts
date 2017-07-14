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
        let categories: string[] = this.mapCategories(dbCampaign);
        return new Campaign(dbCampaign.uuid, dbCampaign.title, dbCampaign.description, dbCampaign.image, company,
            dbCampaign.amount, dbCampaign.requiredNumberOfFollowers, dbCampaign.enforcedHashTags, dbCampaign.startDate,
            dbCampaign.endDate, categories, dbCampaign.stillRunning);
    }

    public static mapToDbObject(campaign: Campaign): DBCampaign {
        let dbCompany = CompanyMapper.mapToDbObject(campaign.company);
        let dbCategories: any[] = this.mapToDbCategories(campaign);
        return new DBCampaign(campaign.uuid, campaign.title, campaign.description, campaign.image, dbCompany,
            campaign.amount, campaign.requiredNumberOfFollowers, campaign.enforcedHashTags, campaign.startDate,
            campaign.endDate, dbCategories, campaign.stillRunning);
    }

    private static mapCategories(dbCampaign: DBCampaign): string[] {
        let dbCategories = dbCampaign.categories;
        let categories = dbCategories.map((dbCategory) => DBCategory[DBCategory[dbCategory]]);
        return categories;
    }

    private static mapToDbCategories(campaign: Campaign): any[] {
        if (campaign.categories) {
            return campaign.categories
                .map((category) => category.toUpperCase())
                .map((category) => DBCategory[DBCategory[category]]);
        } else {
            return [];
        }
    }
}