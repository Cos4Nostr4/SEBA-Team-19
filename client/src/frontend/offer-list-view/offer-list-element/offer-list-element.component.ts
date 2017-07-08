import {Component, Input, OnInit} from "@angular/core";
import {Campaign} from "../../data-objects/campaign";
import {ImageService} from "../../services/image.service";

@Component({
    selector: 'offer-list-element',
    templateUrl: './offer-list-element.component.html',
    styleUrls: ['./offer-list-element.component.css'],
    providers: [ImageService]
})

export class OfferListElementComponent implements OnInit{
    @Input() offer: Campaign;
    private imageSrc: string;
    private imageService: ImageService;

    constructor(imageService: ImageService) {
        this.imageService = imageService;

    }

    ngOnInit(): void {
        let imageName = this.offer.image;
        let imageUrl = this.imageService.getOfferPreviewUrlFor( imageName);
        this.imageSrc= imageUrl;
    }

    public toggle_visibility(id: any) {
        var e = document.getElementById(id);
        if(e.style.display == 'block')
            e.style.display = 'none';
        else
            e.style.display = 'block';
    }


}
