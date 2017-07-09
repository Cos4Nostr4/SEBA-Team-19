import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import "rxjs/add/operator/switchMap";
import {CampaignService} from "../../services/offer.service";
import {Campaign} from "../../data-objects/campaign";
import {ImageService} from "../../services/image.service";

declare var $: any;

@Component({
    selector: 'campus-detail',
    templateUrl: './campus-detail-page.component.html',
    styleUrls: ['./campus-detail-page.component.css'],
    providers: [CampaignService, ImageService]
})

export class CampusDetailPageComponent implements OnInit {
    private campaignService: CampaignService;
    private campaign: Campaign;
    private route: ActivatedRoute;
    private imageService: ImageService;

    constructor(offerService: CampaignService, imageService: ImageService, route: ActivatedRoute) {
        this.campaignService = offerService;
        this.imageService = imageService;
        this.route = route;
    }

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.campaignService.getCampaignWithId(+params.id + ""))
            .subscribe(campaign => {
                    this.campaign = campaign;
                    let imageUrl = this.imageService.getImageUrlForName(campaign.image);
                    $('#productPicture').attr('src', imageUrl);
                },
                error => {
                    throw new Error(error);
                });
    }
}