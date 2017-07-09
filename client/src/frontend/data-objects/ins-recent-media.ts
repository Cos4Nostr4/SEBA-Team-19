export default class InsRecentMedia{
    public instagrammId:string;
    public url: string;
    public type: string;
    public numberOfComments:number;
    public numberOfLikes:number;
    public description:string;
    public tags: string[];
    public originUrl: string;


    constructor(instagrammId: string, url: string, type: string, numberOfComments: number, numberOfLikes: number,
                description: string, tags: string[], originUrl: string) {
        this.instagrammId = instagrammId;
        this.url = url;
        this.type = type;
        this.numberOfComments = numberOfComments;
        this.numberOfLikes = numberOfLikes;
        this.description = description;
        this.tags = tags;
        this.originUrl = originUrl;
    }
}