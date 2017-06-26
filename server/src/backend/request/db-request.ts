import {DBCampaign} from "../campaign/db-campaign";
import {DBInfluencer} from "../influencer/db-influencer";
export class DBRequest{
    uuid:string;
    campaign:DBCampaign;
    influencer: DBInfluencer;
    status: RequestState;
    postponed: boolean;

}

export enum RequestState{
    ACCEPTED, REJECTED, PENDING
}