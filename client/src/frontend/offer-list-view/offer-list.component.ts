import {Component, OnInit} from "@angular/core";
import {CampaignService} from "../services/campaign.service";
import {Campaign} from "../data-objects/campaign";
import {AuthenticationService} from "../services/authentication.service";
import {ActivatedRoute, Params} from "@angular/router";
import {InstagrammDataService} from "../services/instagramm-data.service";
import {CookieHandler} from "../services/cookie-handler";

declare var jquery: any;
declare var $: any;


@Component({
    selector: 'offer-list',
    templateUrl: './offer-list.component.html',
    styleUrls: ['./offer-list.component.css'],
    providers: [CampaignService, AuthenticationService, InstagrammDataService]
})
export class OfferListComponent implements OnInit {
    offerService: CampaignService;
    offerList: Campaign[];
    private errorMessage: string;
    private authenticationService: AuthenticationService;
    private instagrammDataService: InstagrammDataService;

    constructor(offerService: CampaignService, authenticationService: AuthenticationService,
                instagrammDataService: InstagrammDataService, private route: ActivatedRoute) {
        this.offerService = offerService;
        this.authenticationService = authenticationService;
        this.instagrammDataService = instagrammDataService;
    }

    ngOnInit(): void {
        let username = CookieHandler.getCookie("username");
        if (document.location.href.includes("categories")) {
            this.route.params
                .switchMap((params: Params) => this.offerService.getCampaignsForCategory(+params.categoryId, username))
                .subscribe(offer => this.offerList = offer);
        } else {
            this.offerService.getAllCampaigns().subscribe(
                offers => {
                    this.offerList = offers;
                },
                error => {
                    this.errorMessage = error;
                    throw new Error(error)
                }
            );
        }

        if (this.authenticationService.isLoggedIn()) {
            console.log("Logged in");
            /*this.instagrammDataService.getSelfData()
                .subscribe(
                    selfDate => {
                        console.log("SelfData:"+JSON.stringify(selfDate));
                    },
                    error => {
                        console.log("Error when retrieving selfData: "+error);
                    }
                )*/
        } else {
            console.log("not logged in");
            this.disableComponent();
        }

    }


    private disableComponent() {
        let parent = $('#campaign-list-container').parent();
        let windowHeight = $(window).height();
        let windowWidth = $(window).width();

        let styleOverLayDiv = "width:" + windowWidth + "px; height:" + windowHeight + "px; background-color: rgba(216, 216,216, 0.7); position:fixed; top:0;left:0";
        let overlayDiv = $("<div style='" + styleOverLayDiv + "'></div>").appendTo(parent);

        let styleWhiteBox = "background-color:white; width:500px; height:180px; margin:auto; position:fixed; top:30%; left:37%; border-radius:12px";
        let whiteBox = $("<div style='" + styleWhiteBox + "'></div>").appendTo(overlayDiv);

        let styleTitleTop = "font-family: \"Lobster Two\", cursive;font-size:32px; font-weight:600; padding: 20px 0 0 70px";
        $("<div style='" + styleTitleTop + "'><i>Get Stuff For Free On BeeTooBee</i></div>").appendTo(whiteBox);

        let styleButtonDiv = "background-color: #534d4d; color:white; border:1px; border-radius: 5px; margin: 45px auto 0; width: 315px; height:38px; cursor: pointer";
        let buttonDiv = $("<div style='" + styleButtonDiv + "'></div>").appendTo(whiteBox);

        let styleInstagramLogo = "font-size: 35px; margin: 1px 8px 0 3px; float:left";
        $("<i class='fa fa-instagram' aria-hidden='true' style='" + styleInstagramLogo + "'></i>").appendTo(buttonDiv);

        let styleButtonText = "display:block;  font-size:22px; font-weight: 600";
        $("<span style='" + styleButtonText + "'>Login with Instagram</span>").appendTo(buttonDiv);

        $(buttonDiv).click(() => {
            this.authenticationService.login();
        });

    }
}
