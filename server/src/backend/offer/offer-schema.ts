
import {Schema} from "mongoose";
export const offerSchema: Schema = new Schema({
    uuid: String,
    title: String,
    description: String,
    image: String,
    company: {type: Schema.Types.ObjectId, ref: "Company"},
    amount: Number,
    requiredNumberOfFollowers: Number,
    enforcedHashTags: [String],
    startDate: Date,
    endDate: Date,
    requests: [String],
    stillRunning: Boolean,
});