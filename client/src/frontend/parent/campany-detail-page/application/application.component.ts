import {Component, Input, OnInit} from "@angular/core";
import {Request} from "../../../data-objects/request";
import {InstagrammDataService} from "../../../services/instagramm-data.service";
import {RequestService} from "../../../services/request.service";
import {Router} from "@angular/router";

declare var $: any;

@Component({
    selector: 'application',
    templateUrl: './application.component.html',
    styleUrls: ['./application.component.css'],
    providers: [InstagrammDataService, RequestService]
})
export class ApplicationComponent implements OnInit {
    @Input() request: Request;
    private instagrammDataService: InstagrammDataService;
    private requestService: RequestService;
    private router: Router;

    constructor(instagrammDataService: InstagrammDataService, requestService: RequestService, router:Router) {
        this.instagrammDataService = instagrammDataService;
        this.requestService = requestService;
        this.router = router;
    }

    public ngOnInit(): void {
        this.instagrammDataService.getUserData(this.request.influencer.username)
            .subscribe(
                selfData => {
                    $('#applicant-picture').attr('src', selfData.profilePictureUrl);
                }
            );

        this.registerApplicationButtonHandler();
        this.updateUi();
    }

    private registerApplicationButtonHandler() {
        $('#accept-button').click(() => {
            if (this.productIsInStock()) {
                this.acceptRequest();
            } else {
                alert("Product not in stock anymore");
            }
        });

        $('#reject-button').click(() => {
            this.denyRequest();
        });

        $('#applicant-picture').click(() => {
            this.router.navigate(['status', this.request.influencer.uuid]);
        });
    }

    private async productIsInStock() {
        let productsAlreadyAssigned = 0;
        await this.requestService.getRequestsForCampaign(this.request.campaign.uuid)
            .subscribe(
                requests => {
                    productsAlreadyAssigned = requests.length;
                },
                error => {
                    throw new Error(error);
                }
            );
        return this.request.campaign.amount > productsAlreadyAssigned;
    }

    private acceptRequest() {
        this.request.status = "ACCEPTED";
        this.requestService.updatRequest(this.request)
            .subscribe(
                updatedRequest => {
                    this.request = updatedRequest;
                    this.updateUi();
                    console.log("Request accepted: " + JSON.stringify(this.request));
                },
                error => {
                    throw new Error(error);
                }
            );
    }

    private updateUi() {
        $('#accept-button').show();
        $('#reject-button').show();
        $('#application-container').removeClass("application-accepted")
            .removeClass("application-rejected");


        if (this.request.status == "ACCEPTED") {
            $('#application-container').addClass("application-accepted");
            $('#accept-button').hide();
            $('#reject-button').show();
        } else if (this.request.status == "REJECTED") {
            $('#application-container').addClass("application-rejected");
            $('#accept-button').show();
            $('#reject-button').hide();
        }

    }

    private denyRequest() {
        this.request.status = "REJECTED";
        this.requestService.updatRequest(this.request)
            .subscribe(
                updatedRequest => {
                    this.request = updatedRequest;
                    this.updateUi();
                    console.log("Request accepted: " + JSON.stringify(this.request));
                },
                error => {
                    throw new Error(error);
                }
            );
    }
}