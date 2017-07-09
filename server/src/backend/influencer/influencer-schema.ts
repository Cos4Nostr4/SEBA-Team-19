import {Schema} from "mongoose";
export const influencerSchema: Schema = new Schema({
    uuid: String,
    username: String,
    instagramId:String,
    address: String,
    token: String,
});