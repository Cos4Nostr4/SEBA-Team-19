export class DBInfluencer {
    uuid: string;
    username: string;
    email: string;
    instagramId: string;
    address: string;
    token: string;

    constructor(uuid: string, username: string, email: string, instagramId: string, address: string, token: string) {
        this.uuid = uuid;
        this.username = username;
        this.email = email;
        this.instagramId = instagramId;
        this.address = address;
        this.token = token;
    }
}