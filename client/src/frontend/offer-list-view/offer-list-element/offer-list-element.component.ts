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
        let imageUrl = this.imageService.getOfferPreviewUrlFor(imageName);
        this.imageSrc= imageUrl;
    }

    myFunction() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
    }

    selectCampaing(){
        this.router.navigate(['/campaign-detail/', this.offer.uuid]);
    }

    toggle_visibility() {
        var popup = document.getElementById("popupBoxOnePosition");
        popup.classList.toggle("show");
        if(popup.style.display == "block"){
            popup.style.display = "none";
        }
        else{
            popup.style.display = "block";
        }
    }


}
