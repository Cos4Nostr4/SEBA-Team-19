import {Component, Input, OnInit} from "@angular/core";
import {Offer} from "../../data-objects/offer";

@Component({
    selector: 'offer-list-element',
    templateUrl: './offer-list-element.component.html',
    styleUrls: ['./offer-list-element.component.css']
})

export class OfferListElementComponent implements OnInit{
    @Input() offer: Offer;

    private imageSrc: string;

    ngOnInit(): void {
        this.imageSrc="http://localhost:3010/media/images/"+ this.offer.image;
    }


}
