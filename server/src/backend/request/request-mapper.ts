import {DBRequest, RequestState} from "./db-request";
import {Request} from "../../../../client/src/frontend/data-objects/request";
import {CampaignMapper} from "../campaign/campaign-mapper";
import {InfluencerMapper} from "../influencer/influencer-mapper";

export class RequestMapper {

    public static mapAll(dbRequests: DBRequest[]): Request[] {
        let requests = [];
        for (let dbRequest of dbRequests) {
            if (dbRequest.campaign && dbRequest.campaign.company) {
                let request = this.map(dbRequest);
                requests.push(request)
            }
        }
        return requests;
    }

    public static map(dbRequest: DBRequest): Request {
        let campaign = (dbRequest.campaign) ? CampaignMapper.map(dbRequest.campaign) : null;
        let requestStateAsString = RequestState[RequestState[dbRequest.status]];
        return new Request(dbRequest.uuid, campaign, dbRequest.influencer, requestStateAsString, dbRequest.postponed);
    }

    public static mapToDbObject(request: Request): DBRequest {
        let dbCampaign = CampaignMapper.mapToDbObject(request.campaign);
        let dbInfluencer = InfluencerMapper.mapToDbObject(request.influencer);
        return new DBRequest(request.uuid, dbCampaign, dbInfluencer, RequestState[request.status], request.postponed);
    }
}