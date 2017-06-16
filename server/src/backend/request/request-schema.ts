
import {Schema} from "mongoose";
export const requestSchema: Schema = new Schema({
    uuid: Number,
    offer: {type: Schema.Types.ObjectId, ref: "Offer"},
    influencer: {type: Schema.Types.ObjectId, ref: "Influencer"},
    status: { type: String, enum: ['PENDING', 'ACCEPTED', 'REJECTED']},
    postponed: Boolean,
});