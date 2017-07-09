import {Component, OnInit} from '@angular/core'
import {ActivatedRoute, Params}   from '@angular/router';
import {Location}                 from '@angular/common';
import {CampaignService} from "../services/offer.service";
import {Campaign} from "../data-objects/campaign";
import 'rxjs/add/operator/switchMap';
import {Company} from "../data-objects/company";

@Component({
    selector: 'offer-detail',
    templateUrl: './offer-detail.component.html',
    styleUrls: ['./offer-detail.component.css'],
    providers: [CampaignService]
})

export class OfferDetailComponent implements OnInit{
    private offer:Campaign;

    constructor(private offerService: CampaignService, private route: ActivatedRoute, private location: Location) {
        let company = new Company("1", "PRada", "prada", "123","email", "...", "...", "...", "...", "...", true);
        this.offer = new Campaign("1", "Bibis Brom", "","",company, 1, 1, [], new Date(), new Date(), true);
    }


    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.offerService.getCampaignWithId(+params.id+""))
            .subscribe(offer => this.offer = offer);




        function getting() {
            var text = document.getElementById("productcontent");
            text.innerHTML="This watch is the latest edition of our new collection. It is bla bla ";
        }


        function giving() {
            var text = document.getElementById("productcontent");
            text.innerHTML="hashtags: #watch #watch #watch #watch #watch  ";
        }
    }
}