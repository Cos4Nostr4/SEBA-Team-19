import {Component, Input, OnInit} from "@angular/core";
import {Campaign} from "../../data-objects/campaign";
import {ImageService} from "../../services/image.service";
import {Router} from "@angular/router";

@Component({
    selector: 'campaign-list-element',
    templateUrl: './campaign-list-element.component.html',
    styleUrls: ['./campaign-list-element.component.css'],
    providers: [ImageService]
})

export class CampaignListElementComponent implements OnInit{
    @Input() campaign: Campaign;
    private imageSrc: string;
    private imageService: ImageService;
    private router: Router;

    constructor(imageService: ImageService, router: Router) {
        this.imageService = imageService;
        this.router = router;
    }

    ngOnInit(): void {
        let imageName = this.campaign.image;
        let imageUrl = this.imageService.getImageUrlForName(imageName);
        this.imageSrc= imageUrl;
    }


    selectCampaign(){
        this.router.navigate(['/campaign-detail/', this.campaign.uuid]);
    }

}
