import {Schema} from "mongoose";
export const campaignSchema: Schema = new Schema({
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
    categories: [{
        type: String,
        enum: ["HEARTS", "NEW", "AREA", "JEWELRY", "FITNESS", "MAKE_UP", "CLOTHES", "ACCESSORY", "OTHERS"]
    }],
    stillRunning: Boolean,
});