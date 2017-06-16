import {DBRequest} from "./db-request";
import * as mongoose from "mongoose";
import {Document, Model} from "mongoose";
import {requestSchema} from "./request-schema";
import {RequestMapper} from "./request-mapper";

export interface IRequestRepository extends DBRequest, Document {

}

export class RequestRepository {
    private model: Model<IRequestRepository>;


    private constructor(model: Model<IRequestRepository>) {
        this.model = model;
    }

    public static createNewInstance(connection: mongoose.Connection): RequestRepository {
        let model: Model<IRequestRepository> = connection.model<IRequestRepository>("Request", requestSchema);
        return new RequestRepository(model);
    }

    public getAllRequests(func: Function) {
        this.model.find()
            .populate("offer", '-_id -__v')
            .populate("influencer", '-_id -__v')
            .exec(function (err: any, offerList: DBRequest[]) {
                let requests = RequestMapper.mapAll(offerList);
                func(requests);
            });
    }
}