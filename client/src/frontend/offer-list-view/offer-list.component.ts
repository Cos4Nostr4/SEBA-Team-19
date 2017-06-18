import {Component, Inject, OnInit} from "@angular/core";
import {OfferService} from "../services/offer.service";
import {Offer} from "../data-objects/offer";
import {AuthenticationService} from "../services/authentication.service";
import {DOCUMENT} from "@angular/platform-browser";

declare var jquery: any;
declare var $: any;


@Component({
    selector: 'offer-list',
    templateUrl: './offer-list.component.html',
    styleUrls:['./offer-list.component.css'],
    providers: [OfferService, AuthenticationService]
})
export class OfferListComponent implements OnInit {
    offerService: OfferService;
    offerList: Offer[];
    private errorMessage: string;
    private authenticationService: AuthenticationService;
    private document: any;

    constructor(@Inject(DOCUMENT) document: any, offerService: OfferService, authenticationService: AuthenticationService) {
        this.document = document;
        this.offerService = offerService;
        this.authenticationService = authenticationService;
    }

    ngOnInit(): void {
        this.offerService.getAllOffers().subscribe(
            offers => {
                this.offerList = offers
            },
            error => {
                this.errorMessage = error;
                throw new Error(error)
            }
        );

        if(this.authenticationService.isLoggedIn()){
            console.log("Logged in");
        }else{
            console.log("not logged in");
            let parent = $('#offer-list-container').parent();
            let windowHeight = $(window).height();
            let windowWidth = $(window).width();
            let style = "'width:"+windowWidth+"px; height:"+windowHeight+"px; background-color: rgba(216, 216,216, 0.7); position:absolute; top:0;left:0'";
            let overlayDiv = $("<div style="+style+"></div>").appendTo(parent);
            let whiteBox = $("<div style='background-color:white; width:500px; height:250px; margin:auto; position:absolute; top:50%; left:35%'></div>").appendTo(overlayDiv);

            $("<div style='font-family: \"Cookie\";font-size:30px; font-weight:600; padding: 25px 0 0 97px'>Get Stuff For Free On BeeTooBee</div>").appendTo(whiteBox);

            $("<button style='background-color: #534d4d; color:white; border:1px'><i class='fa fa-instagram' aria-hidden='true'></i>Login with Instagram</button>").appendTo(whiteBox);

            //this.authenticationService.ensureLoggedIn(document);
        }
    }
}
