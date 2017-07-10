import {Component, OnInit} from "@angular/core";
import {AuthenticationService} from "../../services/authentication.service";
import {InfluencerService} from "../../services/influencer.service";
import {Influencer} from "../../data-objects/influencer";
import {CookieHandler} from "../../services/cookie-handler";

declare var $: any;

@Component({
    selector: 'drop-down',
    templateUrl: './drop-down.component.html',
    styleUrls: ['./drop-down.component.css'],
    providers: [AuthenticationService, InfluencerService]
})

export class DropDownComponent implements OnInit {
    private authenticationService: AuthenticationService;
    private influencerService: InfluencerService;
    private influencer: Influencer;
    private userDataChanged: boolean;

    constructor(authenticationService: AuthenticationService, influencerService: InfluencerService) {
        this.authenticationService = authenticationService;
        this.influencerService = influencerService;
        this.influencer = null;
        this.userDataChanged = false;
    }

    ngOnInit(): void {

        if (this.authenticationService.isLoggedIn()) {
            let username = CookieHandler.getCookie("username");
            this.influencerService.getInfluencerByName(username)
                .subscribe(
                    influencer => {
                        this.influencer = influencer;
                        $('#name').val(influencer.username);
                        $('#email').val(influencer.email);
                        $('#address').val(influencer.address);
                        console.log("Influencer:" + JSON.stringify(influencer));
                    },
                    error => {
                        throw new Error(error);
                    }
                );

            this.registerDropdownInteractions();
        }
    }

    private registerDropdownInteractions() {
        $('#email').on('input', () => {
            this.influencer.email = $('#email').val() + "";
            this.userDataChanged = true;
        });

        $('#address').on('input', () => {
            this.influencer.address = $('#address').val() + "";
            this.userDataChanged = true;
        });

        $('#dropdown-form').submit((event: any) => {
            if (this.userDataChanged) {
                this.influencerService.updateInfluencer(this.influencer)
                    .subscribe(
                        influencer => {
                            this.influencer = influencer;
                        },
                        error => {
                            throw new Error(error);
                        });
                this.userDataChanged = false;
            }
            event.preventDefault();
        });
    }
}