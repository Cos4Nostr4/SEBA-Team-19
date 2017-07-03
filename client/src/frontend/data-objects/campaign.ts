
import {Company} from "./company";
export class Campaign {
    //TODO: make private
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
    public stillRunning: boolean;


    constructor(uuid: string, title: string, description: string, image: string, company: Company, amount: number,
                requiredNumberOfFollowers: number, enforcedHashTags: Array<string>, startDate: Date, endDate: Date,
                stillRunning: boolean) {
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
        this.stillRunning = stillRunning;
    }

}