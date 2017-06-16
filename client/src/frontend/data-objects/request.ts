
import {Offer} from "./offer";
export class Request{
    public uuid: string;
    public offer: Offer;
    public influencer: string;
    public status: string;
    public postponed:boolean;


    constructor(uuid: string, offer: Offer, influencer: string, status: string, postponed: boolean) {
        this.uuid = uuid;
        this.offer = offer;
        this.influencer = influencer;
        this.status = status;
        this.postponed = postponed;
    }
}