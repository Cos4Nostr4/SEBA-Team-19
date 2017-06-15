import {Injectable} from "@angular/core";
import {ApiObject} from "../data-objects/api-object";

@Injectable()
export class ApiService {


   public getApiObject(): ApiObject {
        return new ApiObject(1, "Very important component");
    }

}