import {Campaign} from "./campaign";
import {Influencer} from "./influencer";
export class Request {
    public uuid: string;
    public campaign: Campaign;
    public influencer: Influencer;
    public status: string;
    public postponed: boolean;


    constructor(uuid: string, campaign: Campaign, influencer: Influencer, status: string, postponed: boolean) {
        this.uuid = uuid;
        this.campaign = campaign;
        this.influencer = influencer;
        this.status = status;
        this.postponed = postponed;
    }
}