import {Component, Input, OnInit} from "@angular/core";
import {Request} from "../../../data-objects/request";
import {InstagrammDataService} from "../../../services/instagramm-data.service";
import {RequestService} from "../../../services/request.service";
import {Router} from "@angular/router";
import {RequestState} from "../../../../../../server/src/backend/request/db-request";

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
    private influencerImage:string;
    private showAcceptBtn:boolean;
    private showRejectBtn:boolean;
    private isAccepted:boolean;
    private isRejected:boolean;
    private isPending:boolean;


    constructor(instagrammDataService: InstagrammDataService, requestService: RequestService, router:Router) {
        this.instagrammDataService = instagrammDataService;
        this.requestService = requestService;
        this.router = router;
        this.influencerImage="";
    }

    public ngOnInit(): void {
        this.instagrammDataService.getUserData(this.request.influencer.username)
            .subscribe(
                selfData => {
                    this.influencerImage = selfData.profilePictureUrl;
                }
            );

        this.updateUi();
    }

    private checkAccept() {
        if (this.productIsInStock()) {
            this.acceptRequest();
        } else {
            alert("Product not in stock anymore");
        }
    }

    private denyRequest() {
        this.request.status = RequestState[RequestState.REJECTED];
        this.requestService.updatRequest(this.request)
            .subscribe(
                updatedRequest => {
                    this.request = updatedRequest;
                    this.updateUi();
                },
                error => {
                    throw new Error(error);
                }
            );
    }

    private selectInfluencer() {
        this.router.navigate(['status', this.request.influencer.uuid]);
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
        this.request.status = RequestState[RequestState.ACCEPTED];
        this.requestService.updatRequest(this.request)
            .subscribe(
                updatedRequest => {
                    this.request = updatedRequest;
                    this.updateUi();
                },
                error => {
                    throw new Error(error);
                }
            );
    }

    private updateUi() {
        this.showAcceptBtn = this.request.status != RequestState[RequestState.ACCEPTED];
        this.showRejectBtn = this.request.status != RequestState[RequestState.REJECTED];
        this.isAccepted = this.request.status == RequestState[RequestState.ACCEPTED];
        this.isRejected = this.request.status == RequestState[RequestState.REJECTED];
        this.isPending = this.request.status == RequestState[RequestState.PENDING]
    }
}