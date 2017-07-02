
export class DBInfluencer{
    uuid: string;
    address:string;
    token:string;

    constructor(uuid: string, address: string, token: string) {
        this.uuid = uuid;
        this.address = address;
        this.token = token;
    }
}