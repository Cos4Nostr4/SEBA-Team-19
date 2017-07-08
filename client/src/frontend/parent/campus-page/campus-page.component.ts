import {Component, OnInit} from "@angular/core";
import {CampaignService} from "../../services/offer.service";
import {Campaign} from "../../data-objects/campaign";


@Component({
    selector: "app-campus-page",
    templateUrl: "./campus-page.component.html",
    styleUrls: ["./campus-page.component.css"],
    providers: [CampaignService]
})

export class CampusPageComponent {
    offerService: CampaignService;
    offerList: Campaign[];

    private errorMessage: string;

    constructor (offerService: CampaignService) {
        this.offerService = offerService;
    }






    /*    ngOnInit(): void {
     if (document.location.href.includes("categories")) {
     this.route.params
     .switchMap((params: Params) => this.offerService.getCampaignForCategory(+params.categoryId))
     .subscribe(offer => this.offerList = offer);
     } else {
     this.offerService.getAllCampaigns().subscribe(
     offers => {
     this.offerList = offers
     },
     error => {
     this.errorMessage = error;
     throw new Error(error)
     }
     );
     }
     }*/



}
