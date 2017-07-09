import {Response} from "@angular/http";

export default class JsonExtractor {

    public static extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }
}