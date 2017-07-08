import {Database} from "../database/database";
import Instagram from "node-instagram";
import InsSelfData from "../../../../client/src/frontend/data-objects/ins-self-data";
import InstagrammDataMapper from "./instagramm-data-mapper";
import {InfluencerRepository} from "../influencer/influencer-repository";
import {Influencer} from "../../../../client/src/frontend/data-objects/influencer";

const CLIENT_ID = '1083168b29cb4a1e8b0bf6a6ddb3c1c9';
export class InstagramRepository {
    private database: Database;
    private influencerRepository: InfluencerRepository;

    constructor() {
        this.database = Database.connect();
        this.influencerRepository = this.database.accessInfluencerRepository();
    }

    public login(accessToken: any, func: (error: any, selfData: InsSelfData) => any) {
        this.getSelfData(accessToken, (errorRetrievingSelfData: any, selfData: InsSelfData) => {
            if (errorRetrievingSelfData) {
                func(errorRetrievingSelfData, null);
            } else {
                this.influencerRepository.getAllInfluencers((influencers: Influencer[], errorRetrievingAllInfluencers: any) => {
                    if (errorRetrievingAllInfluencers) {
                        func(errorRetrievingAllInfluencers, null);
                    } else {
                        let username = selfData.username;
                        let existingInfluencer = influencers.find((influencer) => influencer.username == username);
                        if (existingInfluencer) {
                            console.log("User exists");
                            existingInfluencer.token = accessToken;
                            this.influencerRepository.updateInfluencerWithId(existingInfluencer.uuid, existingInfluencer, (influencer, error) => {
                                if (error) {
                                    func(error, null);
                                } else {
                                    func(null, selfData);
                                }
                            });
                        } else {
                            console.log("User not existed.");
                            let createdInfluencer = new Influencer(selfData.instagrammId, selfData.username, "", accessToken);
                            this.influencerRepository.addInfluencer(createdInfluencer, (influencer: Influencer, err: any) => {
                                if (err) {
                                    func(err, null);
                                } else {
                                    func(null, selfData);
                                }
                            });
                        }
                    }
                });
            }
        });
    }

    public getSelfData(accessToken: any, func: Function) {
        const instagram = this.createInstagramObject(accessToken);
        instagram.get('users/self', (err: any, selfData: any) => {
            if (err) {
                func(err, null);
            } else {
                if (selfData.meta.code == "200") {
                    let insSelfData = InstagrammDataMapper.mapToSelfData(selfData.data);
                    func(null, insSelfData);
                } else {
                    //TODO: better error message
                    let errorMessage = "Blocked access";
                    func(errorMessage, null);
                }
            }
        });

    }

    private createInstagramObject(accessToken: any) {
        const instagram = new Instagram({
            clientId: CLIENT_ID,
            accessToken: accessToken,
        });
        return instagram;
    }
}