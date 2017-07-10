import {Component, OnInit} from "@angular/core";
import {Campaign} from "../../data-objects/campaign";
import {CampaignService} from "../../services/campaign.service";

@Component({
    selector: "app-campany-page",
    templateUrl: "./campany-page.component.html",
    styleUrls: ["./campany-page.component.css"],
    providers: [CampaignService]
})


export class CampanyPageComponent implements OnInit {
    campaignService: CampaignService;
    campaignList: Campaign[];

    private errorMessage: string;

    constructor(offerService: CampaignService) {
        this.campaignService = offerService;
    }


    ngOnInit(): void {

        let companyUuid: string = "2";

        this.campaignService.getAllCampaigns().subscribe(
            campaigns => {
                this.campaignList = campaigns.filter((campaign) => {
                    return campaign.company.uuid == companyUuid;
                });
            },
            error => {
                this.errorMessage = error;
                throw new Error(error)
            });


    }
}