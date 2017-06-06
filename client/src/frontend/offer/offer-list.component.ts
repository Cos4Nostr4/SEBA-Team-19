import {Component} from '@angular/core';
import {OfferService} from "./offer.service";
import {Offer} from "./offer";



@Component({
    selector: 'offer-list',
    templateUrl: './offer-list.component.html',
    providers: [OfferService]
})
export class OfferListComponent {
    offerList: Offer[];

    constructor(offerService: OfferService){
        this.offerList = offerService.getAllOffers();
    }
}
