import {DBRequest} from "./db-request";
import * as mongoose from "mongoose";
import {Document, Model} from "mongoose";
import {requestSchema} from "./request-schema";
import {RequestMapper} from "./request-mapper";
import {Request} from "../../../../client/src/frontend/data-objects/request";
import {offerSchema} from "../offer/offer-schema";
import {IOfferRepository} from "../offer/offer-repository";

export interface IRequestRepository extends DBRequest, Document {

}

export class RequestRepository {
    private requestModel: Model<IRequestRepository>;
    private offerModel: Model<IOfferRepository>;


    private constructor(model: Model<IRequestRepository>, offerModel: Model<IOfferRepository>) {
        this.requestModel = model;
        this.offerModel = offerModel;
    }

    public static createNewInstance(connection: mongoose.Connection): RequestRepository {
        let requestModel: Model<IRequestRepository> = connection.model<IRequestRepository>("Request", requestSchema);
        let offerModel: Model<IOfferRepository> = connection.model<IOfferRepository>("Offer", offerSchema);
        return new RequestRepository(requestModel, offerModel);
    }

    public getAllRequests(func: Function) {
        this.requestModel.find()
            .populate("offer", '-_id -__v')
            .populate("influencer", '-_id -__v')
            .exec(function (err: any, dbRequests: DBRequest[]) {
                let requests: Request[] = RequestMapper.mapAll(dbRequests);
                func(requests);
            });
    }

    public getRequestWithId(requestUuid: string, func: Function) {
        this.requestModel.findOne({'uuid':requestUuid})
            .populate("offer", '-_id -__v')
            .populate("influencer", '-_id -__v')
            .exec(function (err: any, dbRequest: DBRequest) {
                let request: Request = RequestMapper.map(dbRequest);
                func(request);
            });
    }

    public getAllRequestsForOffer(offerUuid: string, func: Function) {
        let model = this.requestModel;
        this.offerModel.findOne({'uuid': offerUuid}, function (err: any, offer: any) {
            model.find({'offer': offer._id})
                .populate("offer", '-_id -__v')
                .populate("influencer", '-_id -__v')
                .exec(function (err: any, requestList: DBRequest[]) {
                    let requests: Request[] = RequestMapper.mapAll(requestList);
                    func(requests);
                });
        });
    }
}