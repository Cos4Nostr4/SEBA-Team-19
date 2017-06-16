
import {Schema} from "mongoose";
export const requestSchema: Schema = new Schema({
    uuid: Number,
    offer: {type: Schema.Types.ObjectId, ref: "Offer"},
    influencer: String,
    status: String,
    postponed: Boolean,
});