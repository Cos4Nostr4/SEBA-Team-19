import {Component, OnInit} from '@angular/core'
import {ActivatedRoute, Params}   from '@angular/router';
import {Location}                 from '@angular/common';
import {OfferService} from "../offer-list-view/offer.service";
import {Offer} from "../offer-list-view/offer";
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'offer-detail',
    templateUrl: './offer-detail.component.html',
    styleUrls: ['./offer-detail.component.css'],
    providers: [OfferService]
})

export class OfferDetailComponent implements OnInit{
    private offer:Offer;

    constructor(private offerService: OfferService, private route: ActivatedRoute, private location: Location) {
        this.offer = {id:1, title:'fuck you'};
    }


    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.offerService.getOfferWithId(+params.id))
            .subscribe(offer => this.offer = offer);
    }
}