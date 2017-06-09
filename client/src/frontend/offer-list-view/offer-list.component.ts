import {Component, OnInit} from "@angular/core";
import {OfferService} from "../services/offer.service";
import {Offer} from "../data-objects/offer";


@Component({
    selector: 'offer-list',
    templateUrl: './offer-list.component.html',
    providers: [OfferService]
})
export class OfferListComponent implements OnInit {
    offerService: OfferService;
    offerList: Offer[];
    private errorMessage: string;

    constructor(offerService: OfferService) {
        this.offerService = offerService;
    }

    ngOnInit(): void {
        this.offerService.getAllOffers().subscribe(
            offers => {
                this.offerList = offers
            },
            error => {
                this.errorMessage = error;
                throw new Error(error)
            }
        );
    }
}
