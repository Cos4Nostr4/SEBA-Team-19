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
    private preparedHashTags: string;

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
        this.preparedHashTags = "";
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
                    this.preparedHashTags = this.prepareHashTags(campaign);

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
                    if (requestUuid == request.uuid) {
                        this.updateApplyButton(RequestState.PENDING, true);
                    } else {
                        throw new Error("Something went wrong while sending request")
                    }
                },
                error => {
                    throw new Error(error);
                }
            );
    }

    private updateApplyButton(requestState: RequestState, justCreated?: boolean) {
        let applyButton = $('#apply-button');
        if (requestState == RequestState.ACCEPTED) {
            applyButton.text("Accepted")
                .addClass("btn-accepted");

        }
        if (requestState == RequestState.PENDING) {
            if (justCreated) {
                applyButton.text("Already applied")
                    .addClass("btn-just-applied");
            } else {
                applyButton.text("Pending")
                    .addClass("btn-pending");
            }

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

    private prepareHashTags(campaign: Campaign): string {
        let enforcedHashTags = campaign.enforcedHashTags;
        let preparedHashTags = enforcedHashTags.map((hashtag) => "#" + hashtag)
            .join(' ');
        return preparedHashTags;
    }
}