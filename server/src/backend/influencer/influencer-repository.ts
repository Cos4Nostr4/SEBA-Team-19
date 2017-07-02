import * as mongoose from "mongoose";
import {Document, Model} from "mongoose";
import {DBInfluencer} from "./db-influencer";
import {InfluencerMapper} from "./influencer-mapper";
import {influencerSchema} from "./influencer-schema";
import {Influencer} from "../../../../client/src/frontend/data-objects/influencer";

export interface IInfluencerRepository extends DBInfluencer, Document {

}

export class InfluencerRepository {
    private model: Model<IInfluencerRepository>;


    private constructor(model: Model<IInfluencerRepository>) {
        this.model = model;
    }

    public static createNewInstance(connection: mongoose.Connection): InfluencerRepository {
        let model: Model<IInfluencerRepository> = connection.model<IInfluencerRepository>("Influencer", influencerSchema);
        return new InfluencerRepository(model);
    }

    public getAllInfluencers(func: Function) {
        this.model.find(function (err: any, influencerList: DBInfluencer[]) {
            let influencer: Influencer[] = InfluencerMapper.mapAll(influencerList);
            func(influencer, null);
        });
    }

    public getInfluencerWithId(influencerUuid:string, func: Function) {
        this.model.findOne({'uuid':influencerUuid}, function (err: any, dbInfluencer: DBInfluencer) {
            if(dbInfluencer) {
                let influencer: Influencer = InfluencerMapper.map(dbInfluencer);
                func(influencer, null);
            }else{
                let errorMessage = "Cannot find Influencer for id '"+influencerUuid+"'";
                func(null, errorMessage);
            }
        });
    }

    public addInfluencer(influencer: Influencer, func: Function){
        let influencerId = influencer.uuid;
        this.model.findOne({'uuid':influencerId}, (err: any, dbInfluencer: DBInfluencer)=> {
            if(dbInfluencer) {
                let errorMessage = "Influencer for id '"+influencerId+"' already exists.";
                func(null, errorMessage);
            }else{
                let dbInfluencer:DBInfluencer = InfluencerMapper.mapToDbObject(influencer);
                let influencerModel = new this.model(dbInfluencer);
                influencerModel.save((err: any) =>{
                    if(err) {
                        func(null, err);
                    }else{
                        func(influencerModel, null);
                    }
                })
            }
        });
    }
}