
import {Offer} from "./offer";
export class Request{
    public uuid: string;
    public offer: Offer;


    constructor(uuid: string, offer: Offer) {
        console.log("Constructor: "+uuid+","+offer);
        this.uuid = uuid;
        this.offer = offer;
    }
}