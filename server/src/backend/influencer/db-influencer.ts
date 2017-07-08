
export class DBInfluencer{
    uuid: string;
    username:string;
    address:string;
    token:string;

    constructor(uuid: string, username:string, address: string, token: string) {
        this.uuid = uuid;
        this.username = username;
        this.address = address;
        this.token = token;
    }
}