import * as mongoose from "mongoose";
import {DatabaseConnection} from "../../backend/database/database-connection";
import {NameToIdStorage} from "../name-to-id-storage";
import {influencerSchema} from "../../backend/influencer/influencer-schema";

const sampleInfluencers = require('./sample-influencers.json');

let connection: mongoose.Connection = mongoose.createConnection(DatabaseConnection.defaultConnection());
let Influencer: any = connection.model("Influencer", influencerSchema);

export async function deleteInfluencerData(printLog?: any) {
    const influencerDeletePromise = new Promise(resolve => Influencer.remove(function (err: any) {
        if (err) {
            console.log(err);
        } else {
            if (printLog) {
                console.log("Cleared Influencer database");
            }
            resolve(true);
        }
    }));
    await influencerDeletePromise;
}

export async function resetInfluencerData(influencerIds: NameToIdStorage[], printLog?: any) {
    await deleteInfluencerData(printLog);

    let i = 0;
    const influencerPromise = new Promise(resolve => {
        for (let influencerData of sampleInfluencers) {
            let influencer = new Influencer(influencerData);
            influencer.save(function (err: any) {
                if (err) {
                    console.log(err);
                } else {
                    influencerIds.push({name: influencer.uuid, id: influencer._id});
                }

                if (++i == sampleInfluencers.length) {
                    if (printLog) {
                        console.log("Stored " + i + " influencer");
                    }
                    resolve(true);
                }
            })
        }
    });
    await  influencerPromise;
}