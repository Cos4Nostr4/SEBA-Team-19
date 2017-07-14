import {Company} from "./company";
export class Campaign {
    public uuid: string;
    public title: string;
    public description: string;
    public image: string;
    public company: Company;
    public amount: number;
    public requiredNumberOfFollowers: number;
    public enforcedHashTags: Array<string>;
    public startDate: Date;
    public endDate: Date;
    public categories: string[];
    public stillRunning: boolean;


    constructor(uuid: string, title: string, description: string, image: string, company: Company, amount: number,
                requiredNumberOfFollowers: number, enforcedHashTags: Array<string>, startDate: Date, endDate: Date,
                categories: string[], stillRunning: boolean) {
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