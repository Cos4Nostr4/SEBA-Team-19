import {Component, Input} from '@angular/core';
import {Offer} from "../../data-objects/offer";

@Component({
    selector: 'offer-list-element',
    templateUrl: './offer-list-element.component.html',
    styleUrls: ['./offer-list-element.component.css']
})

export class OfferListElementComponent {
    @Input() offer: Offer;

}
