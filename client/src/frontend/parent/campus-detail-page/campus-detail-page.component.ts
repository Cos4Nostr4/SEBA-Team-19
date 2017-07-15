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
import {Influencer} from "../../data-objects/influencer";
import {DropDownComponent} from "../../menu-slider/dropdown/drop-down.component";

declare var $: any;

@Component({
    selector: 'campus-detail',
    templateUrl: './campus-detail-page.component.html',
    styleUrls: ['./campus-detail-page.component.css'],
    providers: [AuthenticationService, CampaignService, ImageService, RequestService, InfluencerService]
})

export class CampusDetailPageComponent implements OnInit {
    private authenticationService: AuthenticationService;
    private campaignService: CampaignService;
    private imageService: ImageService;
    private requestService: RequestService;
    private influencerService: InfluencerService;
    private route: ActivatedRoute;
    private campaign: Campaign;
    private alreadyApplied: boolean;

    constructor(authenticationService: AuthenticationService, campaignService: CampaignService, imageService: ImageService,
                requestService: RequestService, influencerService: InfluencerService, route: ActivatedRoute) {
        this.authenticationService = authenticationService;
        this.campaignService = campaignService;
        this.imageService = imageService;
        this.requestService = requestService;
        this.influencerService = influencerService;
        this.route = route;

        this.campaign = new Campaign("", "", "", "", null, 0, 0, [], new Date(), new Date(), [], true);
        this.alreadyApplied = false;
    }

    ngOnInit(): void {
        this.authenticationService.ensureLoggedIn();

        let username = CookieHandler.getCookie("username");

        this.route.params
            .switchMap((params: Params) => this.campaignService.getCampaignWithId(params.id))
            .subscribe(campaign => {
                    this.campaign = campaign;
                    let imageUrl = this.imageService.getImageUrlForProductName(campaign.image);
                    $('#productPicture').attr('src', imageUrl);
                    console.log("LOADED:"+JSON.stringify(this.campaign));
                    console.log("IMAGE:"+JSON.stringify(imageUrl));

                    this.requestService.getRequestsForCampaign(campaign.uuid)
                        .subscribe(requests => {
                                let request = requests.find((request) => request.influencer.username == username);
                                if (request) {
                                    let requestState = RequestState[request.status];
                                    this.updateApplyButton(requestState);
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
            let username = CookieHandler.getCookie("username");
            this.influencerService.getInfluencerByName(username)
                .subscribe(
                    influencer => {
                        console.log("Application of user: "+JSON.stringify(influencer));
                        if (this.influencerHasEmailAndAddressSet(influencer)) {
                            this.createApplyRequest(influencer);
                        } else {
                            this.showDropDownMenu();
                        }
                    },
                    error => {
                        throw new Error(error);
                    }
                );
        });
    }

    private createApplyRequest(influencer: Influencer) {
        let uuid = UUID.createNew();
        let request = new Request(uuid.asStringValue(), this.campaign, influencer, RequestState[RequestState.PENDING], false);
        this.requestService.addRequest(request)
            .subscribe(
                requestUuid => {
                    console.log("Request done: "+JSON.stringify(request));
                    if (requestUuid == request.uuid) {
                        this.updateApplyButton(RequestState.PENDING);
                    } else {
                        throw new Error("Something went wrong while sending request")
                    }
                },
                error => {
                    throw new Error(error);
                }
            );
    }

    private updateApplyButton(requestState: RequestState) {
        let applyButton = $('#apply-button');
        if (requestState == RequestState.ACCEPTED) {
            applyButton.text("Accepted")
                .addClass("btn-accepted");

        }
        if (requestState == RequestState.PENDING) {
            applyButton.text("Already applied")
                .addClass("btn-pending");

        }
        if (requestState == RequestState.REJECTED) {
            applyButton.text("Rejected")
                .addClass("btn-rejected");

        }
        applyButton.prop('disabled', true)
    }

    private influencerHasEmailAndAddressSet(influencer: Influencer): boolean {
        let emailSet = (influencer.email && influencer.email.length > 0);
        let addressSet = (influencer.address && influencer.address.length > 0);
        return emailSet && addressSet;
    }

    private showDropDownMenu() {
        DropDownComponent.showMissingInfoForApplication();
    }
}