import {Component, OnInit} from "@angular/core";
import {Campaign} from "../../data-objects/campaign";
import {CampaignService} from "../../services/campaign.service";
import {CookieHandler} from "../../services/cookie-handler";
import {CompanyAuthenticationService} from "../../services/company-authentication.service";

@Component({
    selector: "campany-page",
    templateUrl: "./campany-page.component.html",
    styleUrls: ["./campany-page.component.css"],
    providers: [CampaignService, CompanyAuthenticationService]
})


export class CampanyPageComponent implements OnInit {
    private campaignService: CampaignService;
    private companyAuthenticationService: CompanyAuthenticationService;
    private campaignList: Campaign[];

    constructor(offerService: CampaignService, companyAuthenticationService: CompanyAuthenticationService) {
        this.campaignService = offerService;
        this.companyAuthenticationService = companyAuthenticationService;
        this.campaignList = [];
    }

    ngOnInit(): void {
        this.companyAuthenticationService.ensureIsLoggedIn();

        let companyUuid: string = CookieHandler.getCookie(CompanyAuthenticationService.COOKIE_ID);
        this.campaignService.getAllCampaigns().subscribe(
            campaigns => {
                this.campaignList = campaigns.filter((campaign) => {
                    return campaign.company.uuid == companyUuid;
                });
            },
            error => {
                throw new Error(error)
            });
    }
}