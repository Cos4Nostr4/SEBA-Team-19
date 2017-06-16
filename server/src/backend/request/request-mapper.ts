import {DBRequest} from "./db-request";

import {Request} from "../../../../client/src/frontend/data-objects/request";
export class RequestMapper {

    public static mapAll(dbRequests: DBRequest[]): Request[] {
        let requests = [];
        for (let dbRequest of dbRequests) {
            let request = this.map(dbRequest);
            console.log("Map: "+JSON.stringify(request));
            console.log("  id: "+request.uuid);
            requests.push(request)
        }
        return requests;
    }

    public static map(dbRequest: DBRequest): Request {
        console.log("DBRequest: "+JSON.stringify(dbRequest));
        return new Request(dbRequest.uuid, dbRequest.offer);
    }
}