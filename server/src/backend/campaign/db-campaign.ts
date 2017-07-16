import {DBCompany} from "../company/db-company";
import {DBCategory} from "../categories/db-category";
export class DBCampaign {
    uuid: string;
    title: string;
    description: string;
    image: string;
    company: DBCompany;
    amount: number;
    requiredNumberOfFollowers: number;
    enforcedHashTags: Array<string>;
    startDate: Date;
    endDate: Date;
    categories: DBCategory[];
    stillRunning: boolean;


    constructor(uuid: string, title: string, description: string, image: string, company: DBCompany, amount: number,
                requiredNumberOfFollowers: number, enforcedHashTags: Array<string>, startDate: Date, endDate: Date,
                categories: DBCategory[], stillRunning: boolean) {
        this.uuid = uuid;
        this.title = title;
        this.description = description;
        this.image = image;
        this.company = company;
        this.amount = amount;
        this.requiredNumberOfFollowers = requiredNumberOfFollowers;
        this.enforcedHashTags = enforcedHashTags;
        this.startDate = startDate;
        this.endDate = endDate;
        this.categories = categories;
        this.stillRunning = stillRunning;
    }
}