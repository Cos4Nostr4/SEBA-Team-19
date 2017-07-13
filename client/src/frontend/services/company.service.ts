import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Company} from "../data-objects/company";
import {Config} from "../config/config";
import JsonExtractor from "./json-extractor";
import ServiceErrorHandler from "./service_error_handler";

@Injectable()
export class CompanyService {
    private static COMPANY_BASE_URL = Config.backend_address + ":" + Config.backend_port + Config.backend_base_url + "companies";
    private http: Http;

    constructor(http: Http) {
        this.http = http;
    }

    public getAllCompanies(): Observable<Company[]> {
        return this.http.get(CompanyService.COMPANY_BASE_URL)
            .map(JsonExtractor.extractData)
            .catch(ServiceErrorHandler.handleError);
    }

    public addCompany(company: Company):Observable<string> {
        let companyUuidObservable = this.http.post(CompanyService.COMPANY_BASE_URL, {data: company})
            .map(JsonExtractor.extractData)
            .catch(ServiceErrorHandler.handleError);
        return companyUuidObservable;
    }

}