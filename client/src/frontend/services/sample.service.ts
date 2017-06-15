import {Injectable} from "@angular/core";
import {SampleObject} from "../data-objects/sample-object";

@Injectable()
export class SampleService {


    public getSampleObject(): SampleObject {
        return new SampleObject(1, "Very important component");
    }
}