import {Component, Input, OnInit} from "@angular/core";
import {Campaign} from "../../data-objects/campaign";
import {ImageService} from "../../services/image.service";
import {Router} from "@angular/router";

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
    private router: Router;

    constructor(imageService: ImageService, router: Router) {
        this.imageService = imageService;
        this.router = router;
    }

    ngOnInit(): void {
        let imageName = this.offer.image;
        let imageUrl = this.imageService.getImageUrlForProductName(imageName);
        this.imageSrc= imageUrl;
    }


    selectCampaing(){
        this.router.navigate(['/campaign-detail/', this.offer.uuid]);
    }

}
