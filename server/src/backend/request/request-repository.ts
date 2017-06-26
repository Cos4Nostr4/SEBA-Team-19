import {DBRequest} from "./db-request";
import * as mongoose from "mongoose";
import {Document, Model} from "mongoose";
import {requestSchema} from "./request-schema";
import {RequestMapper} from "./request-mapper";
import {Request} from "../../../../client/src/frontend/data-objects/request";
import {campaignSchema} from "../campaign/campaign-schema";
import {ICampaignRepository} from "../campaign/campaign-repository";

export interface IRequestRepository extends DBRequest, Document {

}

export class RequestRepository {
    private requestModel: Model<IRequestRepository>;
    private campaignRepository: Model<ICampaignRepository>;


    private constructor(model: Model<IRequestRepository>, offerModel: Model<ICampaignRepository>) {
        this.requestModel = model;
        this.campaignRepository = offerModel;
    }

    public static createNewInstance(connection: mongoose.Connection): RequestRepository {
        let requestModel: Model<IRequestRepository> = connection.model<IRequestRepository>("Request", requestSchema);
        let offerModel: Model<ICampaignRepository> = connection.model<ICampaignRepository>("Campaign", campaignSchema);
        return new RequestRepository(requestModel, offerModel);
    }

    public getAllRequests(func: Function) {
        this.requestModel.find()
            .populate("campaign", '-_id -__v')
            .populate("influencer", '-_id -__v')
            .exec(function (err: any, dbRequests: DBRequest[]) {
                let requests: Request[] = RequestMapper.mapAll(dbRequests);
                func(requests);
            });
    }

    public getRequestWithId(requestUuid: string, func: Function) {
        this.requestModel.findOne({'uuid':requestUuid})
            .populate("campaign", '-_id -__v')
            .populate("influencer", '-_id -__v')
            .exec(function (err: any, dbRequest: DBRequest) {
                let request: Request = RequestMapper.map(dbRequest);
                func(request);
            });
    }

    public getAllRequestsForCampaign(campaignUuid: string, func: Function) {
        this.campaignRepository.findOne({'uuid': campaignUuid}, (err: any, campaign: any) => {
            this.requestModel.find({'campaign': campaign._id})
                .populate("campaign", '-_id -__v')
                .populate("influencer", '-_id -__v')
                .exec(function (err: any, requestList: DBRequest[]) {
                    let requests: Request[] = RequestMapper.mapAll(requestList);
                    func(requests);
                });
        });
    }
}