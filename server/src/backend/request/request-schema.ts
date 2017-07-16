import {Schema} from "mongoose";
export const requestSchema: Schema = new Schema({
    uuid: String,
    campaign: {type: Schema.Types.ObjectId, ref: "Campaign"},
    influencer: {type: Schema.Types.ObjectId, ref: "Influencer"},
    status: {type: String, enum: ['PENDING', 'ACCEPTED', 'REJECTED']},
    postponed: Boolean,
});