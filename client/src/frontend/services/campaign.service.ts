import {Injectable} from "@angular/core";
import {Campaign} from "../data-objects/campaign";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import {Config} from "../config/config";
import {Categories, CategoryMapper} from "../data-objects/categories";
import {Request} from "../data-objects/request";
import JsonExtractor from "./json-extractor";
import ServiceErrorHandler from "./service_error_handler";

const URL_ALL_CAMPAIGNS = Config.backend_address + ":" + Config.backend_port + Config.backend_base_url + 'campaigns';
const URL_BASE_CATEGORY = Config.backend_address + ":" + Config.backend_port + Config.backend_base_url + 'categories/';
const URL_ALL_REQUESTS = Config.backend_address + ":" + Config.backend_port + Config.backend_base_url + "requests";

@Injectable()
export class CampaignService {
    private http: Http;

    constructor(http: Http) {
        this.http = http;
    }

    public getAllCampaigns(): Observable<Campaign[]> {
        let offers: Observable<Campaign[]> = this.http.get(URL_ALL_CAMPAIGNS)
            .map(JsonExtractor.extractData)
            .catch(ServiceErrorHandler.handleError);
        return offers;
    }


    public getCampaignWithId(id: string): Observable<Campaign> {
        return this.getAllCampaigns().map(
            offers => offers.find(offer => offer.uuid == id));
    }


    public getCampaignsForCategory(categoryId: number, username: string): Observable<Campaign[]> {
        let category: string = CategoryMapper.forId(categoryId);
        if (category == Categories[Categories.HEARTS]) {
            return this.getCampaignsWithHearts(username);
        } else {
            return this.getCampaignsForNormalCategory(category);
        }
    }

    public addCampaign(campaign:Campaign): Observable<string> {
        let campaignUuidObservable = this.http.post(URL_ALL_CAMPAIGNS, {data: campaign})
            .map(JsonExtractor.extractData)
            .catch(ServiceErrorHandler.handleError);
        return campaignUuidObservable;
    }

    private getCampaignsForNormalCategory(category: string): Observable<Campaign[]> {
        let campaigns: Observable<Campaign[]> = this.http.get(URL_BASE_CATEGORY + category)
            .map(JsonExtractor.extractData)
            .catch(ServiceErrorHandler.handleError);

        return campaigns;
    }

    private getCampaignsWithHearts(username: string): Observable<Campaign[]> {
        let campaignsWithHearts = this.http.get(URL_ALL_REQUESTS)
            .map(JsonExtractor.extractData)
            .map((requests) => requests.filter((request: Request) => request.influencer.username == username))
            .map((requests) => requests.map((request: Request) => request.campaign))
            .catch(ServiceErrorHandler.handleError);

        return campaignsWithHearts;
    }

    public deleteCampaign(campaign:Campaign): Observable<string> {
        let url = URL_ALL_CAMPAIGNS+"/"+campaign.uuid;
        let campaignUuidObservable = this.http.delete(url)
            .map(JsonExtractor.extractData)
            .catch(ServiceErrorHandler.handleError);
        return campaignUuidObservable;
    }
}