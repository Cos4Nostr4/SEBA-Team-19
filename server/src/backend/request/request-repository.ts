import {DBRequest, RequestState} from "./db-request";
import * as mongoose from "mongoose";
import {Document, Model} from "mongoose";
import {requestSchema} from "./request-schema";
import {RequestMapper} from "./request-mapper";
import {Request} from "../../../../client/src/frontend/data-objects/request";
import {campaignSchema} from "../campaign/campaign-schema";
import {ICampaignRepository} from "../campaign/campaign-repository";
import {IInfluencerRepository} from "../influencer/influencer-repository";
import {influencerSchema} from "../influencer/influencer-schema";

export interface IRequestRepository extends DBRequest, Document {

}

export class RequestRepository {
    private requestModel: Model<IRequestRepository>;
    private campaignRepository: Model<ICampaignRepository>;
    private influencerRepository: Model<IInfluencerRepository>;


    private constructor(requestModel: Model<IRequestRepository>, campaignModel: Model<ICampaignRepository>, influencerModel: Model<IInfluencerRepository>) {
        this.requestModel = requestModel;
        this.campaignRepository = campaignModel;
        this.influencerRepository = influencerModel;
    }

    public static createNewInstance(connection: mongoose.Connection): RequestRepository {
        let requestModel: Model<IRequestRepository> = connection.model<IRequestRepository>("Request", requestSchema);
        let campaignModel: Model<ICampaignRepository> = connection.model<ICampaignRepository>("Campaign", campaignSchema);
        let influencerModel: Model<IInfluencerRepository> = connection.model<IInfluencerRepository>("Influencer", influencerSchema);
        return new RequestRepository(requestModel, campaignModel, influencerModel);
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
            .sort('uuid')
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

    public addRequest(request: Request, func: Function) {
        let requestId = request.uuid;
        this.requestModel.findOne({'uuid': requestId}, (err: any, loadedDbRequest: DBRequest) => {
            if (loadedDbRequest) {
                let errorMessage = "Campaign for id '" + requestId + "' already exists.";
                func(null, errorMessage);
            } else {
                let dbRequest: DBRequest = RequestMapper.mapToDbObject(request);
                this.influencerRepository.findOne({'uuid': dbRequest.influencer.uuid}, (err: any, dbInfluencer: any) => {
                    if (err) {
                        func(null, err);
                    } else if (dbInfluencer) {
                        this.campaignRepository.findOne({'uuid': dbRequest.campaign.uuid}, (err: any, dbCampaign: any) => {
                            if (err) {
                                func(null, err);
                            }
                            if (dbCampaign) {
                                let requestModel = new this.requestModel({
                                    uuid: dbRequest.uuid,
                                    campaign: dbCampaign._id,
                                    influencer: dbInfluencer._id,
                                    status: RequestState[dbRequest.status],
                                    postponed: dbRequest.postponed
                                });
                                requestModel.save((err: any) => {
                                    if (err) {
                                        func(null, err);
                                    } else {
                                        func(requestModel, null);
                                    }
                                })
                            } else {
                                let errorMessage = "Cannot create request, because referenced campaign with id '"
                                    + dbRequest.campaign.uuid + "' does not exist.";
                                func(null, errorMessage);
                            }
                        });
                    } else {
                        let errorMessage = "Cannot create request, because referenced influencer with id '"
                            + dbRequest.influencer.uuid + "' does not exist.";
                        func(null, errorMessage);
                    }
                });

            }
        });
    }
}