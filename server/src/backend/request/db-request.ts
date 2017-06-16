import {DBOffer} from "../offer/db-offer";
export class DBRequest{
    uuid:string;
    offer:DBOffer;
    influencer: string;
    status: string;
    postponed: boolean;

}

export enum RequestState{
    ACCEPTED, REJECTED, PENDING
}