import {Component, OnInit} from "@angular/core";
import {CampaignService} from "../../services/campaign.service";
import {Campaign} from "../../data-objects/campaign";
import {AuthenticationService} from "../../services/authentication.service";
import {ActivatedRoute} from "@angular/router";

declare var $: any;

@Component({
    selector: "app-default-page",
    templateUrl: "./default-page.component.html",
    styleUrls: ["./default-page.component.css"],
    providers: [CampaignService, AuthenticationService]
})
export class DefaultPageComponent implements OnInit {
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
        this.campaignService.getAllCampaigns()
            .subscribe(
                campaigns => {
                    this.campaignList = campaigns
                },
                error => {
                    throw new Error(error)
                }
            );


        if (this.authenticationService.isLoggedIn()) {
            console.log("Logged in");
        } else {
            console.log("not logged in");
            this.disableComponent();
        }
    }

    private disableComponent() {
        let parent = $('#campaign-list-container').parent();
        let windowHeight = $(window).height();
        let windowWidth = $(window).width();


        let styleOverLayDiv = "width:" + windowWidth + "px; height:" + windowHeight + "px; background-color: rgba(216, 216,216, 0.7); z-index: 99; position:fixed; top:0;left:0";
        let overlayDiv = $("<div id='overlay-div' style='" + styleOverLayDiv + "'></div>").appendTo(parent);

        let styleWhiteBox = "background-color:#3D4551; width:450px; height:180px; margin:auto; position:fixed; display: inline-block; z-index: 100; margin: auto; position: absolute; top: 0; left: 0; bottom: 0; right: 0; auto; border-radius:12px";
        let whiteBox = $("<div class='text-center' style='" + styleWhiteBox + "'></div>").appendTo(overlayDiv);

        let styleTitleTop = "font-family: \"Roboto\",cursive; color: white ;font-size:32px; font-weight:700; padding:15px 0px 0px;";
        $("<div style='" + styleTitleTop + "'><i>Get Stuff For Free!</i></div>").appendTo(whiteBox);

        let styleButtonDiv = "text-align: center; background-color: #00519A; color:white; border:1px; border-radius: 5px; margin: 29px auto 0; margin-bottom: 16px; width: 273px; height:38px; cursor: pointer";
        let buttonDiv = $("<div style='" + styleButtonDiv + "'></div>").appendTo(whiteBox);

        let styleInstagramLogo = "font-size: 35px; margin: 1px 8px 0 3px; padding: 1px 0 0 2px;float:left";
        $("<i class='fa fa-instagram' aria-hidden='true' style='" + styleInstagramLogo + "'></i>").appendTo(buttonDiv);

        let styleButtonText = " padding-top:2px ;font-family: \"Roboto\",;display:block; letter-spacing: 0.5px;font-size:22px; font-weight: 400";
        $("<span style='" + styleButtonText + "'>Login with Instagram</span>").appendTo(buttonDiv);

        let styleCompany = "font-family: \"Roboto\"; color: #8196a9; font-size:14px; font-weight:400; padding: 0px 0px 5px;";
        $("<a href='/company-login' style='" + styleCompany + "'>Go to Company Login</a>").appendTo(whiteBox);

        $(buttonDiv).click(() => {
            this.authenticationService.login();
        });

        $(window).resize(() => {
            let windowHeight = $(window).height();
            let windowWidth = $(window).width();

            $('#overlay-div').css("height", windowHeight);
            $('#overlay-div').css("width", windowWidth);
        });
    }
}
