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
        this.model.find()
            .sort('uuid')
            .exec(function (err: any, influencerList: DBInfluencer[]) {
                if (err) {
                    func(null, err);
                } else {
                    let influencer: Influencer[] = InfluencerMapper.mapAll(influencerList);
                    func(influencer, null);
                }
            });
    }

    public getInfluencerWithId(influencerUuid: string, func: Function) {
        this.model.findOne({'uuid': influencerUuid}, function (err: any, dbInfluencer: DBInfluencer) {
            if (dbInfluencer) {
                let influencer: Influencer = InfluencerMapper.map(dbInfluencer);
                func(influencer, null);
            } else {
                let errorMessage = "Cannot find Influencer for id '" + influencerUuid + "'";
                func(null, errorMessage);
            }
        });
    }

    public getInfluencerByUsername(username: string, func: (error: any, influencer: Influencer) => void) {
        this.model.findOne({'username': username}, function (err: any, dbInfluencer: DBInfluencer) {
            if (dbInfluencer) {
                let influencer: Influencer = InfluencerMapper.map(dbInfluencer);
                func(null, influencer);
            } else {
                let errorMessage = "Cannot find Influencer with username '" + username + "'";
                func(errorMessage, null);
            }
        });
    }

    public addInfluencer(influencer: Influencer, func: (influencer: Influencer, error: String) => void) {
        let influencerId = influencer.uuid;
        this.model.findOne({'uuid': influencerId}, (err: any, dbInfluencer: DBInfluencer) => {
            if (dbInfluencer) {
                let errorMessage = "Influencer for id '" + influencerId + "' already exists.";
                func(null, errorMessage);
            } else {
                let dbInfluencer: DBInfluencer = InfluencerMapper.mapToDbObject(influencer);
                let influencerModel = new this.model(dbInfluencer);
                influencerModel.save((err: any) => {
                    if (err) {
                        func(null, err);
                    } else {
                        func(influencerModel, null);
                    }
                })
            }
        });
    }

    public updateInfluencerWithId(influencerId: string, influencer: Influencer, func: (influencer: Influencer, error: String) => void) {
        console.log("ID:"+influencerId);
        if(influencerId != influencer.uuid){
            func(null, "Updating influencer with id '" + influencerId + "' is not allowed with data having different id");
            return;
        }

        let update = {
            uuid: influencer.uuid,
            username: influencer.username,
            email:influencer.email,
            instagramId: influencer.instagramId,
            address: influencer.address,
            token: influencer.token
        };
        this.model.findOne({'uuid': influencerId}, (err: any, dbInfluencerData: any) => {
            if(err){
                func(null, err);
            }else {
                if(dbInfluencerData) {
                    this.model.findByIdAndUpdate(dbInfluencerData._id, {$set: update}, {new: false}, (err: any, ignored: DBInfluencer) => {
                        if (err) {
                            func(null, err);
                        } else {
                            this.model.findOne({'uuid': influencerId}, (err: any, updatedDbInfluencer: DBInfluencer) => {
                                if (err) {
                                    func(null, err);
                                } else {
                                    let updatedInfluencer = InfluencerMapper.map(updatedDbInfluencer);
                                    func(updatedInfluencer, null);
                                }
                            });
                        }
                    });
                }else{
                    let errorMessage = "Influencer for id '" + influencerId + "' does not exist";
                    func(null, errorMessage);
                }
            }
        });
    }
}