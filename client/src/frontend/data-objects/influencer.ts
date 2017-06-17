export class Influencer {
    public uuid: string;
    public address: string;
    public token: string;


    constructor(uuid: string, address: string, token: string) {
        this.uuid = uuid;
        this.address = address;
        this.token = token;
    }
}