import {Component} from "@angular/core";
import {CampaignService} from "../../services/offer.service";
import {Campaign} from "../../data-objects/campaign";
import {AuthenticationService} from "../../services/authentication.service";
import {InstagrammDataService} from "../../services/instagramm-data.service";


@Component({
    selector: "app-campus-page",
    templateUrl: "./campus-page.component.html",
    styleUrls: ["./campus-page.component.css"],
    providers: [CampaignService]
})

export class CampusPageComponent {
    private campaignService: CampaignService;
    private authenticationService: AuthenticationService;
    private instagrammDataService: InstagrammDataService;
    offerList: Campaign[];


    constructor(campaignService: CampaignService, authenticationService: AuthenticationService,
                instagrammDataService: InstagrammDataService) {
        this.campaignService = campaignService;
        this.authenticationService = authenticationService;
        this.instagrammDataService = instagrammDataService;
    }


    ngOnInit(): void {

        /*if(this.authenticationService.isLoggedIn()){

        }*/

        /*if (document.location.href.includes("categories")) {
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
        }*/
    }


}
