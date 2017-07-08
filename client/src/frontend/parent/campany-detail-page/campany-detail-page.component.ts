import {Component} from "@angular/core";
import {CampaignService} from "../../services/offer.service";
import {Campaign} from "../../data-objects/campaign";
import {Observable} from "rxjs/Observable";


@Component ({
    selector: "app-campany-detail-page",
    templateUrl: "./campany-detail-page.component.html",
    styleUrls: ["./campany-detail-page.component.css"]
})

export class CampanyDetailPageComponent {


   /*

   static URL_ALL_OFFERS = Config.backend_address + ":" + Config.backend_port + Config.backend_base_ur + 'offers';

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