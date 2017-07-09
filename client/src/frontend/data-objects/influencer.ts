export class Influencer {
    public uuid: string;
    public username: string;
    public instagramId:string;
    public address: string;
    public token: string;


    constructor(uuid: string, username:string, instagramId:string, address: string, token: string) {
        this.uuid = uuid;
        this.username = username;
        this.instagramId = instagramId;
        this.address = address;
        this.token = token;
    }
}