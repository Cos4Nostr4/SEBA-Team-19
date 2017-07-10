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

        let styleOverLayDiv = "width:" + windowWidth + "px; height:" + windowHeight + "px; background-color: rgba(216, 216,216, 0.7); position:fixed; top:0;left:0";
        let overlayDiv = $("<div id='overlay-div' style='" + styleOverLayDiv + "'></div>").appendTo(parent);

        let styleWhiteBox = "background-color:#3D4551; width:450px; height:170px; margin:auto; position:fixed; margin: 30%; auto; border-radius:12px";
        let whiteBox = $("<div style='" + styleWhiteBox + "'></div>").appendTo(overlayDiv);

        let styleTitleTop = "font-family: \"Cherry Swash\",cursive; color: white ;font-size:32px; font-weight:400; padding: 20px 0 0 70px";
        $("<div style='" + styleTitleTop + "'><i>Get Stuff For Free!</i></div>").appendTo(whiteBox);

        let styleButtonDiv = "text-align: center; background-color: #00519A; color:white; border:1px; border-radius: 5px; margin: 45px auto 0; width: 273px; height:38px; cursor: pointer";
        let buttonDiv = $("<div style='" + styleButtonDiv + "'></div>").appendTo(whiteBox);

        let styleInstagramLogo = "font-size: 35px; margin: 1px 8px 0 3px; padding-left: 2px;float:left";
        $("<i class='fa fa-instagram' aria-hidden='true' style='" + styleInstagramLogo + "'></i>").appendTo(buttonDiv);

        let styleButtonText = " padding-top:2px ;font-family: \"Roboto\",;display:block; letter-spacing: 0.5px;font-size:22px; font-weight: 400";
        $("<span style='" + styleButtonText + "'>Login with Instagram</span>").appendTo(buttonDiv);

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
