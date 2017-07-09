import {Component, OnInit} from "@angular/core";
import {CampaignService} from "../../services/offer.service";
import {Campaign} from "../../data-objects/campaign";
import {isBuiltInAccessor} from "@angular/forms/src/directives/shared";
import {Element} from "@angular/compiler";
declare var jquery: any;
declare var $: any;

@Component ({
    selector: "app-campany-detail-page",
    templateUrl: "./campany-detail-page.component.html",
    styleUrls: ["./campany-detail-page.component.css"],
    providers: [CampaignService]
})


export class CampanyDetailPageComponent implements OnInit {
    offerService: CampaignService;
    campaign: Campaign;
    accepted: boolean = false;
    isActionTaken: boolean = false;
    // buttonClicked: any;

    private errorMessage: string;

    constructor(offerService: CampaignService) {
        this.offerService = offerService;
    }


    ngOnInit(): void {

        let campaignId: string = "2";

        this.offerService.getCampaignWithId(campaignId).subscribe(
            campaign => {
                this.campaign = campaign;
            },
            error => {
                this.errorMessage = error;
                throw new Error(error);
            }
        );


        $('.acceptButton').click((event: any) => {
            let acceptBtn = event.currentTarget;
            let index = $(".acceptButton").index(acceptBtn);
            let container = $("tr").get(index);
            container.style.background = "palegreen";
        });


        $('.rejectButton').click((event: any) => {
            let rejectBtn = event.currentTarget;
            let index = $(".rejectButton").index(rejectBtn);
            let container = $("tr").get(index);
            container.style.background = "lightpink";
        });

        /*$('.btn').click((event:any) => {
            let btn = event.currentTarget;
            let index = $(".btn").index(btn);
            console.log("Index:"+index);
        });*/
    }


    public buttonClicked (event :any) {
        /*let btn = event.currentTarget;
        console.log("!!!!!!!!!!!!!!"+ btn);

        if (btn.innerText.includes("Accept")) {
            this.container = $(".div").get(this.index - 1);
            this.container.style.background = "limegreen";
        }
        else if (btn.innerHTML.includes("Reject")) {
            this.container = $(".div").get(this.index - 2);
            this.container.style.background = "lightpink";
        }*/
    }


    /*private actionTaken (id: string) {
        this.buttonClicked = document.getElementById(id);
        this.isActionTaken = true;

        if (id.includes("accept")) {
            this.accepted = true;
        }
        else if (id.includes("reject")) {
            this.accepted = false;
        }

    }*/

   /*



   constructor(private campaignService: CampaignService) {
    this.campaignService = campaignService;
   }

   campaign: Observable <Campaign[]>;

   getInputs


   var campaignTitleNew = document.getElementById("campaign-edit-title");
   var numberOfFollowersNew = document.getElementById("campaign-edit-number-followers");
   var startDateNew = document.getElementById("campaign-edit-startapp");
   var endDateNew = document.getElementById("campaign-edit-enddate");
   var hashtagsNew = document.getElementById("campaign-edit-hashtags");


   //Get id from
   getCampaignTitle() {
        //let campaign: Campaign[] = this.campaignService.getCampaignById(id);
        this.campaign = this.campaignService.getCampaignById(id);
        this.campaign.subscribe;
        let campaignTitle: string = this.campaign.title;
        console.log(campaignTitle);

        return campaignTitle
   }

    */

}