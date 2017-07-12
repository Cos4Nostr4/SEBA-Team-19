import InsSelfData from "../../../../client/src/frontend/data-objects/ins-user-data";
import InsRecentMedia from "../../../../client/src/frontend/data-objects/ins-recent-media";
export default class InstagrammDataMapper {

    public static mapToSelfData(data: any): InsSelfData {

        return new InsSelfData(data.id, data.username, data.fullName, data.profile_picture, data.bio, data.website,
            data.counts.media, data.counts.follows, data.counts.followed_by);
    }

    public static mapToMediasData(data: any) {
        let medias: InsRecentMedia[] = data.map((media: any) => {
            return InstagrammDataMapper.mapToSingleMedia(media);
        });
        return medias;
    }

    public static mapToSingleMedia(mediaData: any) {
        let type = mediaData.type;
        switch (type) {
            case "image":
                return InstagrammDataMapper.mapToImageMedia(mediaData);
            case "video":
                return InstagrammDataMapper.mapToVideoMedia(mediaData);
            default:
                throw new Error("Unknown media type '" + type + "'");
        }
    }

    private static mapToImageMedia(imageData: any) {
        let id = imageData.id;
        let captionText = (imageData.caption) ? imageData.caption.text : "";
        let numberOfComments = (imageData.comments) ? imageData.comments.count : "0";
        let numberOfLikes = (imageData.likes) ? imageData.likes.count : "0";
        let imageUrl = (imageData.images.standard_resolution) ? imageData.images.standard_resolution.url : "";
        return new InsRecentMedia(id, imageUrl, "image", numberOfComments, numberOfLikes,
            captionText, imageData.tags, imageData.link);
    }

    private static mapToVideoMedia(videoData: any) {
        let captionText = (videoData.caption) ? videoData.caption.text : "";
        let numberOfComments = (videoData.comments) ? videoData.comments.count : "0";
        let numberOfLikes = (videoData.likes) ? videoData.likes.count : "0";
        let imageUrl = (videoData.images.standard_resolution) ? videoData.images.standard_resolution.url : "";
        return new InsRecentMedia(videoData.id, imageUrl, "image", numberOfComments, numberOfLikes,
            captionText, videoData.tags, videoData.link);
    }
}