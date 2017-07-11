import {Component, OnInit} from "@angular/core";
import {InfluencerService} from "../../services/influencer.service";
import {InstagrammDataService} from "../../services/instagramm-data.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Influencer} from "../../data-objects/influencer";
import InsRecentMedia from "../../data-objects/ins-recent-media";
import InsUserData from "../../data-objects/ins-self-data";

declare var $:any;

@Component({
    selector: "app-status-page",
    templateUrl: "./status-page.component.html",
    styleUrls: ["./status-page.component.css"],
    providers: [InfluencerService, InstagrammDataService]
})

export class StatusPageComponent implements OnInit {
    private influencerService: InfluencerService;
    private instagrammDataService: InstagrammDataService;
    private route: ActivatedRoute;
    private influencer: Influencer;
    private recentMedias: InsRecentMedia[];
    private userData: InsUserData;


    constructor(influencerService: InfluencerService, instagrammDataService: InstagrammDataService, route: ActivatedRoute) {
        this.influencerService = influencerService;
        this.instagrammDataService = instagrammDataService;
        this.route = route;
    }


    public ngOnInit(): void {
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
                                console.log("UserData:"+JSON.stringify(userData));
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