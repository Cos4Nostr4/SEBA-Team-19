import {Component, OnInit} from '@angular/core';
import {OfferService} from "./offer.service";
import {Offer} from "./offer";



@Component({
    selector: 'offer-list',
    templateUrl: './offer-list.component.html',
    providers: [OfferService]
})
export class OfferListComponent implements OnInit{
    offerService: OfferService;
    offerList: Offer[];

    constructor(offerService: OfferService){
        this.offerService = offerService;
    }

    ngOnInit(): void {
        this.offerService.getAllOffers().then(offers => this.offerList = offers);
    }
}
