import {Component, Input, OnInit} from "@angular/core";
import {ImageService} from "../../../services/image.service";
import {Campaign} from "../../../data-objects/campaign";
import {Router} from "@angular/router";

@Component({
    selector: 'campany-list-element',
    templateUrl: './campany-list-element.component.html',
    styleUrls: ['./campany-list-element.component.css'],
    providers: [ImageService]
})

export class CampanyListElementComponent implements OnInit {
    @Input()
    campaign: Campaign;
    private imageSrc: string;
    private imageService: ImageService;
    private router: Router;

    constructor(imageService: ImageService, router: Router) {
        this.imageService = imageService;
        this.router = router;
    }

    ngOnInit(): void {
        let imageName = this.campaign.image;
        let imageUrl = this.imageService.getImageUrlForProductName(imageName);
        this.imageSrc = imageUrl;
    }


    public selectCampaign() {
        this.router.navigate(['/campany-detail/', this.campaign.uuid]);
    }

}