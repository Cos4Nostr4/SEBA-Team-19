import InsSelfData from "../../../../client/src/frontend/data-objects/ins-self-data";
export default class InstagrammDataMapper {

    public static mapToSelfData(data: any): InsSelfData {

        return new InsSelfData(data.id, data.username, data.fullName, data.profile_picture, data.bio, data.website,
            data.counts.media, data.counts.follows, data.counts.followed_by);
    }
}