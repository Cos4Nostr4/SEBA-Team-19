import {Component, OnInit} from "@angular/core";
import {Campaign} from "../../data-objects/campaign";
import {CampaignService} from "../../services/offer.service";

@Component ({
    selector: "app-campany-page",
    templateUrl: "./campany-page.component.html",
    styleUrls: ["./campany-page.component.css"],
    providers: [CampaignService]
})


export class CampanyPageComponent implements OnInit {
    offerService: CampaignService;
    offerList: Campaign[];

    private errorMessage: string;

    constructor (offerService: CampaignService) {
        this.offerService = offerService;
    }


    ngOnInit(): void {

        let companyUuid: string = "2";

        this.offerService.getAllCampaigns().subscribe(
            campaigns => {
                this.offerList = campaigns.filter((campaign) => {
                    return campaign.company.uuid == companyUuid;
                });
            },
            error => {
                this.errorMessage = error;
                throw new Error(error)
            }
            );


    }

    // Id von aktueller Company mit uuids aus offers vergleichen

/*    private checkCompanyId(companyId: string) {
        let j: number[];
        for(let i: number = 0; i =< this.offerList.length; i++)
        {
            if this.offerList.uuid == companyId {
                j[j.length] = i;
            }
        }

        return  j;
    }*/

}