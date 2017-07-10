import {Component, OnInit} from "@angular/core";
import {CampaignService} from "../../services/campaign.service";
import {Campaign} from "../../data-objects/campaign";
import {AuthenticationService} from "../../services/authentication.service";
import {ActivatedRoute, Params} from "@angular/router";
import {CookieHandler} from "../../services/cookie-handler";


@Component({
    selector: "app-campus-page",
    templateUrl: "./campus-page.component.html",
    styleUrls: ["./campus-page.component.css"],
    providers: [CampaignService, AuthenticationService]
})

export class CampusPageComponent implements OnInit {
    private authenticationService: AuthenticationService;
    private campaignService: CampaignService;
    private route: ActivatedRoute;
    private campaignList: Campaign[];

    constructor(campaignService: CampaignService, authenticationService: AuthenticationService, route: ActivatedRoute) {
        this.authenticationService = authenticationService;
        this.campaignService = campaignService;
        this.route = route;
    }


    ngOnInit(): void {
        let username = CookieHandler.getCookie("username");
        this.route.params
            .switchMap((params: Params) => this.campaignService.getCampaignsForCategory(+params.categoryId, username))
            .subscribe(campaigns => {
                this.campaignList = campaigns
                console.log("Updated campaignList with:"+campaigns.length);
            });
    }


}
