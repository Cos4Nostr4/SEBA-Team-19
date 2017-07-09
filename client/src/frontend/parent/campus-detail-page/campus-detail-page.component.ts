import {Component, OnInit} from '@angular/core'
import {ActivatedRoute, Params}   from '@angular/router';
import {Location}                 from '@angular/common';
import 'rxjs/add/operator/switchMap';
import {CampaignService} from "../../services/offer.service";
import {Campaign} from "../../data-objects/campaign";

declare var $:any;

@Component({
    selector: 'campus-detail',
    templateUrl: './campus-detail-page.component.html',
    styleUrls: ['./campus-detail-page.component.css'],
    providers: [CampaignService]
})

export class CampusDetailPageComponent implements OnInit{
    private campaignService: CampaignService;
    private campaign: Campaign;
    private route: ActivatedRoute;

    constructor(offerService: CampaignService, route: ActivatedRoute) {
        this.campaignService = offerService;
        this.route = route;
    }

    ngOnInit(): void {
        this.route.params
         .switchMap((params: Params) => this.campaignService.getCampaignWithId(+params.id+""))
         .subscribe(campaign => {
                 this.campaign = campaign;
                 let imageUrl = "http://localhost:3010/media/images/"+this.campaign.image;
                 $('#productPicture').attr('src', imageUrl);
             },
             error => {
                 throw new Error(error);
             });
    }
}