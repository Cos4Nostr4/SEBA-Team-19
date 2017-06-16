import * as mongoose from "mongoose";
import {Document, Model} from "mongoose";
import {DBInfluencer} from "./db-influencer";
import {InfluencerMapper} from "./influencer-mapper";
import {influencerSchema} from "./influencer-schema";

export interface IInfluencerRepository extends DBInfluencer, Document {

}

export class InfluencerRepository {
    private model: Model<IInfluencerRepository>;


    private constructor(model: Model<IInfluencerRepository>) {
        this.model = model;
    }

    public static createNewInstance(connection: mongoose.Connection): InfluencerRepository {
        let model: Model<IInfluencerRepository> = connection.model<IInfluencerRepository>("influencer", influencerSchema);
        return new InfluencerRepository(model);
    }

    public getAllInfluencers(func: Function) {
        this.model.find(function (err: any, influencerList: DBInfluencer[]) {
            let influencer = InfluencerMapper.mapAll(influencerList);
            func(influencer);
        });
    }
}