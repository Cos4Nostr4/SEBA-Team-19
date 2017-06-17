import {DBInfluencer} from "./db-influencer";
import {Influencer} from "../../../../client/src/frontend/data-objects/influencer";
export class InfluencerMapper {

    public static mapAll(dbInfluencers: DBInfluencer[]): Influencer[] {
        let influencers = [];
        for (let dbInfluencer of dbInfluencers) {
            influencers.push(this.map(dbInfluencer))
        }
        return influencers;
    }

    public static map(dbInfluencer: DBInfluencer): Influencer {
        return new Influencer(dbInfluencer.uuid, dbInfluencer.address, dbInfluencer.token);
    }
}