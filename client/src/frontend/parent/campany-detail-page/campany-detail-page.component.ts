import {Component, OnInit} from "@angular/core";
import {CampaignService} from "../../services/campaign.service";
import {Campaign} from "../../data-objects/campaign";
import {RequestService} from "../../services/request.service";
import {Request} from "../../data-objects/request";
import {ActivatedRoute, Params, Router} from "@angular/router";
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
    private router:Router;
    private route: ActivatedRoute;
    private campaign: Campaign;
    private requests: Request[];
    private productPicture:string;

    constructor(offerService: CampaignService, requestService: RequestService, imageService: ImageService,
                router:Router, route: ActivatedRoute) {
        this.campaignService = offerService;
        this.requestService = requestService;
        this.imageService = imageService;
        this.router = router;
        this.route = route;
        this.campaign = new Campaign("", "", "", "", null, 0, 0, [], new Date(), new Date(), [], true);
        this.requests = [];
        this.productPicture = "";
    }


    public ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.campaignService.getCampaignWithId(params.id))
            .subscribe(
                campaign => {
                    this.campaign = campaign;
                    let imageUrl = this.imageService.getImageUrlForProductName(campaign.image);
                    this.productPicture = imageUrl;
                },
                error => {
                    throw new Error(error);
                }
            );

        this.route.params
            .switchMap((params: Params) => this.requestService.getRequestsForCampaign(params.id))
            .subscribe(
                requests => {
                    this.requests = requests;
                },
                error => {
                    throw new Error(error);
                }
            );


    }

    public deleteCampaign(){
        this.campaignService.deleteCampaign(this.campaign)
            .subscribe(
                campaignUuid => {
                        this.router.navigate(["/campany/"]);
                },
                error =>{
                    throw new Error(error);
                }
            )
    }
}