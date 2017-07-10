import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import "rxjs/add/operator/switchMap";
import {CampaignService} from "../../services/campaign.service";
import {Campaign} from "../../data-objects/campaign";
import {Request} from "../../data-objects/request";
import {ImageService} from "../../services/image.service";
import {RequestService} from "../../services/request.service";
import UUID from "../../../../../server/src/backend/uuid/uuid";
import {InfluencerService} from "../../services/influencer.service";
import {CookieHandler} from "../../services/cookie-handler";
import {RequestState} from "../../../../../server/src/backend/request/db-request";
import {AuthenticationService} from "../../services/authentication.service";

declare var $: any;

@Component({
    selector: 'campus-detail',
    templateUrl: './campus-detail-page.component.html',
    styleUrls: ['./campus-detail-page.component.css'],
    providers: [CampaignService, ImageService, RequestService, InfluencerService]
})

export class CampusDetailPageComponent implements OnInit {
    private authenticationService: AuthenticationService;
    private campaignService: CampaignService;
    private imageService: ImageService;
    private requestService: RequestService;
    private influencerService: InfluencerService;
    private route: ActivatedRoute;
    private alreadyApplied: boolean;
    private campaign: Campaign;

    constructor(authenticationService: AuthenticationService, campaignService: CampaignService, imageService: ImageService,
                requestService: RequestService, influencerService: InfluencerService, route: ActivatedRoute) {
        this.campaignService = campaignService;
        this.imageService = imageService;
        this.requestService = requestService;
        this.influencerService = influencerService;
        this.route = route;

        this.campaign = null;
        this.alreadyApplied = false;
    }

    ngOnInit(): void {
        this.authenticationService.ensureLoggedIn();

        let username = CookieHandler.getCookie("username");

        this.route.params
            .switchMap((params: Params) => this.campaignService.getCampaignWithId(+params.id + ""))
            .subscribe(campaign => {
                    this.campaign = campaign;
                    let imageUrl = this.imageService.getImageUrlForName(campaign.image);
                    $('#productPicture').attr('src', imageUrl);

                    this.requestService.getRequestsForCampaign(campaign.uuid)
                        .subscribe(requests => {
                                let request = requests.find((request) => request.influencer.username == username);
                                if (request) {
                                    this.disableAppliedButton();
                                }
                            },
                            error => {
                                throw new Error(error);
                            });
                },
                error => {
                    throw new Error(error);
                });


        this.createApplyFormHandler();
    }

    private createApplyFormHandler() {
        $('#apply-button').click(() => {
            console.log("clicked");
            let username = CookieHandler.getCookie("username");
            this.influencerService.getInfluencerByName(username)
                .subscribe(
                    influencer => {
                        let uuid = UUID.createNew();
                        let request = new Request(uuid.asStringValue(), this.campaign, influencer, RequestState[RequestState.PENDING], false);
                        this.requestService.addRequest(request)
                            .subscribe(
                                requestUuid => {
                                    console.log("Requeqst done");
                                    if (requestUuid == request.uuid) {
                                        this.disableAppliedButton();
                                    } else {
                                        throw new Error("Something went wrong while sending request")
                                    }
                                },
                                error => {
                                    throw new Error(error);
                                }
                            );
                    },
                    error => {
                        throw new Error(error);
                    }
                );
        });
    }

    private disableAppliedButton() {
        $('#apply-button').text("Already applied")
            .prop('disabled', true)
            .addClass("disabled");
    }
}