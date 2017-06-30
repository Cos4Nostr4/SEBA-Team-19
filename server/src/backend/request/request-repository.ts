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


    private constructor(requestModel: Model<IRequestRepository>, campaignModel: Model<ICampaignRepository>) {
        this.requestModel = requestModel;
        this.campaignRepository = campaignModel;
    }

    public static createNewInstance(connection: mongoose.Connection): RequestRepository {
        let requestModel: Model<IRequestRepository> = connection.model<IRequestRepository>("Request", requestSchema);
        let campaignModel: Model<ICampaignRepository> = connection.model<ICampaignRepository>("Campaign", campaignSchema);
        return new RequestRepository(requestModel, campaignModel);
    }

    public getAllRequests(func: Function) {
        this.requestModel.find()
            .populate({
                path: 'campaign',
                select: '-_id -__v',
                populate: {
                    path: 'company',
                    select: '-_id -__v'
                }
            })
            .populate("influencer", '-_id -__v')
            .exec(function (err: any, dbRequests: DBRequest[]) {
                let requests: Request[] = RequestMapper.mapAll(dbRequests);
                func(requests, null);
            });
    }

    public getRequestWithId(requestUuid: string, func: Function) {
        this.requestModel.findOne({'uuid': requestUuid})
            .populate({
                path: 'campaign',
                select: '-_id -__v',
                populate: {
                    path: 'company',
                    select: '-_id -__v'
                }
            })
            .populate("influencer", '-_id -__v')
            .exec(function (err: any, dbRequest: DBRequest) {
                if (dbRequest) {
                    let request: Request = RequestMapper.map(dbRequest);
                    func(request, null);
                } else {
                    let errorMessage = "Cannot find Request for id '" + requestUuid + "'";
                    func(null, errorMessage);
                }
            });
    }

    public getAllRequestsForCampaign(campaignUuid: string, func: Function) {
        this.campaignRepository.findOne({'uuid': campaignUuid}, (err: any, campaign: any) => {
            if (!err && campaign) {
                this.requestModel.find({'campaign': campaign._id})
                    .populate({
                        path: 'campaign',
                        select: '-_id -__v',
                        populate: {
                            path: 'company',
                            select: '-_id -__v'
                        }
                    })
                    .populate("influencer", '-_id -__v')
                    .exec(function (err: any, requestList: DBRequest[]) {
                        let requests: Request[] = RequestMapper.mapAll(requestList);
                        func(requests, null);
                    });
            } else {
                let errorMessage = "Cannot find Requests for Campaign with id '" + campaignUuid + "'";
                func(null, errorMessage);
            }
        });
    }
}