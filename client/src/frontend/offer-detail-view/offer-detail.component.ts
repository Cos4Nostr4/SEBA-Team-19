import {Component, OnInit} from '@angular/core'
import {ActivatedRoute, Params}   from '@angular/router';
import {Location}                 from '@angular/common';
import {OfferService} from "../services/offer.service";
import {Offer} from "../data-objects/offer";
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
        this.offer = new Offer("1", "Bibis Brom", "","","", 1, 1, [], new Date(), new Date(), true);
    }


    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.offerService.getOfferWithId(+params.id+""))
            .subscribe(offer => this.offer = offer);
    }
}