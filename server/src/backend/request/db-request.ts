import {DBOffer} from "../offer/db-offer";
import {DBInfluencer} from "../influencer/db-influencer";
export class DBRequest{
    uuid:string;
    offer:DBOffer;
    influencer: DBInfluencer;
    status: RequestState;
    postponed: boolean;

}

export enum RequestState{
    ACCEPTED, REJECTED, PENDING
}