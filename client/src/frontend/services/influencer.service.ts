import {Injectable} from "@angular/core";
import {Config} from "../config/config";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Influencer} from "../data-objects/influencer";
import JsonExtractor from "./json-extractor";
import ServiceErrorHandler from "./service_error_handler";

const URL_INFLUENCERS_BASE_URL = Config.backend_address + ":" + Config.backend_port + Config.backend_base_url + 'influencers/';
const URL_INFLUENCERS_BY_NAME = Config.backend_address + ":" + Config.backend_port + Config.backend_base_url + 'influencersByName/';

@Injectable()
export class InfluencerService {
    private http: Http;

    constructor(http: Http) {
        this.http = http;
    }

    public getInfluencerById(influencerId: string): Observable<Influencer> {
        let url = URL_INFLUENCERS_BASE_URL + influencerId;
        let influencer: Observable<Influencer> = this.http.get(url)
            .map(JsonExtractor.extractData)
            .catch(ServiceErrorHandler.handleError);
        return influencer;
    }

    public getInfluencerByName(username: string): Observable<Influencer> {
        let url = URL_INFLUENCERS_BY_NAME + username;
        let influencer: Observable<Influencer> = this.http.get(url)
            .map(JsonExtractor.extractData)
            .catch(ServiceErrorHandler.handleError);
        return influencer;
    }

    public updateInfluencer(influencer: Influencer) {
        let url = URL_INFLUENCERS_BASE_URL + influencer.uuid;
        let updatedInfluencer: Observable<Influencer> = this.http.put(url, {data: influencer})
            .map(JsonExtractor.extractData)
            .catch(ServiceErrorHandler.handleError);
        return updatedInfluencer;
    }
}