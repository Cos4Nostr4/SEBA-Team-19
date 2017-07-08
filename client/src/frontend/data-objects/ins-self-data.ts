export default class InsSelfData{
    instagrammId: string;
    username: string;
    fullName: string;
    profilePictureUrl: string;
    biography: string;
    websiteUrl: string;
    mediaCount: string;
    followerCount: string;
    followingCount: string;


    constructor(instagrammId: string, username: string, fullName: string, profilePictureUrl: string, biography: string, websiteUrl: string, mediaCount: string, followerCount: string, followingCount: string) {
        this.instagrammId = instagrammId;
        this.username = username;
        this.fullName = fullName;
        this.profilePictureUrl = profilePictureUrl;
        this.biography = biography;
        this.websiteUrl = websiteUrl;
        this.mediaCount = mediaCount;
        this.followerCount = followerCount;
        this.followingCount = followingCount;
    }
}