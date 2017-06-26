
import {Campaign} from "./campaign";
import {Influencer} from "./influencer";
export class Request{
    public uuid: string;
    public offer: Campaign;
    public influencer: Influencer;
    public status: string;
    public postponed:boolean;


    constructor(uuid: string, offer: Campaign, influencer: Influencer, status: string, postponed: boolean) {
        this.uuid = uuid;
        this.offer = offer;
        this.influencer = influencer;
        this.status = status;
        this.postponed = postponed;
    }
}