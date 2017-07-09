import {Component, OnInit} from "@angular/core";
import {CampaignService} from "../../services/offer.service";
import {Campaign} from "../../data-objects/campaign";
import {RequestService} from "../../services/request.service";
import {Request} from "../../data-objects/request";
declare var $: any;

@Component ({
    selector: "app-campany-detail-page",
    templateUrl: "./campany-detail-page.component.html",
    styleUrls: ["./campany-detail-page.component.css"],
    providers: [CampaignService]
})


export class CampanyDetailPageComponent implements OnInit {
    offerService: CampaignService;
    campaign: Campaign;

    requestService: RequestService;
    requests: Request[];

    private errorMessage: string;


    constructor(offerService: CampaignService, requestService: RequestService) {
        this.offerService = offerService;
        this.requestService = requestService;
    }


    ngOnInit(): void {

        let campaignId: string = "2";

        this.offerService.getCampaignWithId(campaignId).subscribe(
            campaign => {
                this.campaign = campaign;
            },
            error => {
                this.errorMessage = error;
                throw new Error(error);
            }
        );


        this.requestService.getRequestsForCampaign(campaignId).subscribe(
            requests => {
                this.requests = requests;
                console.log(requests);
            },
            error => {
                this.errorMessage = error;
                throw new Error(error);
            }
        );


        $('.acceptButton').click((event: any) => {
            let acceptBtn = event.currentTarget;
            let index = $(".acceptButton").index(acceptBtn);
            let container = $("tr").get(index);
            container.style.background = "palegreen";
        });


        $('.rejectButton').click((event: any) => {
            let rejectBtn = event.currentTarget;
            let index = $(".rejectButton").index(rejectBtn);
            let container = $("tr").get(index);
            container.style.background = "lightpink";
        });

    }

}