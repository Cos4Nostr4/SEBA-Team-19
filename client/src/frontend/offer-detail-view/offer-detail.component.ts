import {Component, OnInit} from '@angular/core'
import {ActivatedRoute, Params}   from '@angular/router';
import {Location}                 from '@angular/common';
import {CampaignService} from "../services/offer.service";
import {Campaign} from "../data-objects/campaign";
import 'rxjs/add/operator/switchMap';
import {Company} from "../data-objects/company";

declare var $:any;

@Component({
    selector: 'offer-detail',
    templateUrl: './offer-detail.component.html',
    styleUrls: ['./offer-detail.component.css'],
    providers: [CampaignService]
})

export class OfferDetailComponent implements OnInit{
    private offerService: CampaignService;
    private campaign: Campaign;


    constructor(offerService: CampaignService, private route: ActivatedRoute, private location: Location) {
        this.offerService = offerService;
    }

    ngOnInit(): void {
        /*this.route.params
            .switchMap((params: Params) => this.offerService.getCampaignWithId(+params.id+""))
            .subscribe(offer => this.offer = offer);*/


        let campaignId: string = "2";
        this.offerService.getCampaignWithId(campaignId).subscribe(
            campaign => {
                this.campaign = campaign;
                let imageUrl = "http://localhost:3010/media/images/"+this.campaign.image;
                $('#productPicture').attr('src', imageUrl);
            },
            error => {
                throw new Error(error);
            }
        );
    }
}