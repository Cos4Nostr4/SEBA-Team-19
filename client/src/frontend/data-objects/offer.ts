
import {Request} from "./request";

export class Offer {
    //TODO: make private
    public uuid: string;
    public title: string;

    public description: string;
    public image: string;
    public company: string;
    public amount: number;
    public requiredNumberOfFollowers: number;
    public enforcedHashTags: Array<string>;
    public startDate: Date;
    public endDate: Date;
    public stillRunning: boolean;


    constructor(uuid: string, title: string, description: string, image: string, company: string, amount: number,
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