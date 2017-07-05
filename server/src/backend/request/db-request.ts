import {DBCampaign} from "../campaign/db-campaign";
import {DBInfluencer} from "../influencer/db-influencer";
export class DBRequest{
    uuid:string;
    campaign:DBCampaign;
    influencer: DBInfluencer;
    status: RequestState;
    postponed: boolean;


    constructor(uuid: string, campaign: DBCampaign, influencer: DBInfluencer, status: RequestState, postponed: boolean) {
        this.uuid = uuid;
        this.campaign = campaign;
        this.influencer = influencer;
        this.status = status;
        this.postponed = postponed;
    }
}

export enum RequestState{
    ACCEPTED, REJECTED, PENDING
}