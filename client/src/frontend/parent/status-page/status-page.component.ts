import {Component, OnInit} from "@angular/core";
import {InfluencerService} from "../../services/influencer.service";
import {InstagrammDataService} from "../../services/instagramm-data.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Influencer} from "../../data-objects/influencer";
import InsRecentMedia from "../../data-objects/ins-recent-media";
import InsUserData from "../../data-objects/ins-user-data";
import {CompanyAuthenticationService} from "../../services/company-authentication.service";

declare var $: any;

@Component({
    selector: "app-status-page",
    templateUrl: "./status-page.component.html",
    styleUrls: ["./status-page.component.css"],
    providers: [InfluencerService, InstagrammDataService, CompanyAuthenticationService]
})

export class StatusPageComponent implements OnInit {
    private influencerService: InfluencerService;
    private instagrammDataService: InstagrammDataService;
    private companyAuthenticationService: CompanyAuthenticationService;
    private route: ActivatedRoute;
    private influencer: Influencer;
    private recentMedias: InsRecentMedia[];
    private userData: InsUserData;


    constructor(influencerService: InfluencerService, instagrammDataService: InstagrammDataService,
                companyAuthenticationService: CompanyAuthenticationService, route: ActivatedRoute) {
        this.influencerService = influencerService;
        this.instagrammDataService = instagrammDataService;
        this.companyAuthenticationService = companyAuthenticationService;
        this.route = route;
        this.recentMedias = [];
        this.userData = null;
    }


    public ngOnInit(): void {
        this.companyAuthenticationService.ensureIsLoggedIn();

        this.route.params
            .switchMap((params: Params) => this.influencerService.getInfluencerById(params.id))
            .subscribe(influencer => {
                    this.influencer = influencer;
                    this.instagrammDataService.getRecentMedia(influencer.username)
                        .subscribe(recentMedias => {
                                this.recentMedias = recentMedias;
                            },
                            error => {
                                throw new Error(error);
                            });
                    this.instagrammDataService.getUserData(influencer.username)
                        .subscribe(userData => {
                                this.userData = userData;
                                console.log("UserData:" + JSON.stringify(userData));
                                $("#influencerPicture").attr("src", userData.profilePictureUrl);
                            },
                            error => {
                                throw new Error(error);
                            })
                },
                error => {
                    throw new Error(error);
                });
    }
}