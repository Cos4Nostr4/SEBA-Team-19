import {Component, OnInit} from "@angular/core";
import {CampaignService} from "../../services/campaign.service";
import {Campaign} from "../../data-objects/campaign";
import {RequestService} from "../../services/request.service";
import {Request} from "../../data-objects/request";
import {ActivatedRoute, Params} from "@angular/router";
import {ImageService} from "../../services/image.service";
declare var $: any;

@Component({
    selector: "app-campany-detail-page",
    templateUrl: "./campany-detail-page.component.html",
    styleUrls: ["./campany-detail-page.component.css"],
    providers: [CampaignService, RequestService, ImageService]
})


export class CampanyDetailPageComponent implements OnInit {
    private campaignService: CampaignService;
    private requestService: RequestService;
    private imageService: ImageService;

    private route: ActivatedRoute;
    private campaign: Campaign;
    private requests: Request[];

    constructor(offerService: CampaignService, requestService: RequestService, imageService: ImageService, route: ActivatedRoute) {
        this.campaignService = offerService;
        this.requestService = requestService;
        this.imageService = imageService;
        this.route = route;

        this.campaign = new Campaign("", "", "", "", null, 0, 0, [], new Date(), new Date(), true);
        this.requests = [];
    }


    public ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.campaignService.getCampaignWithId(+params.id + ""))
            .subscribe(
                campaign => {
                    this.campaign = campaign;
                    let imageUrl = this.imageService.getImageUrlForName(campaign.image);
                    $('#productPicture').attr('src', imageUrl);
                },
                error => {
                    throw new Error(error);
                }
            );

        this.route.params
            .switchMap((params: Params) => this.requestService.getRequestsForCampaign(+params.id + ""))
            .subscribe(
                requests => {
                    this.requests = requests;
                    console.log(requests);
                },
                error => {
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