
import {Schema} from "mongoose";
export const offerSchema: Schema = new Schema({
    id: String,
    title: String,
    description: String,
    image: String,
    company: String,
    amount: Number,
    requiredNumberOfFollowers: Number,
    enforcedHashTags: [String],
    startDate: Date,
    endDate: Date,
    requests: [String],
    stillRunning: Boolean,
});