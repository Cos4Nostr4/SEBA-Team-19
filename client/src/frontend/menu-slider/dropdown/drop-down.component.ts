import {Component, OnInit} from "@angular/core";
import {AuthenticationService} from "../../services/authentication.service";
import {InfluencerService} from "../../services/influencer.service";
import {Influencer} from "../../data-objects/influencer";
import {CookieHandler} from "../../services/cookie-handler";
import {InstagrammDataService} from "../../services/instagramm-data.service";

declare var $: any;

@Component({
    selector: 'drop-down',
    templateUrl: './drop-down.component.html',
    styleUrls: ['./drop-down.component.css'],
    providers: [AuthenticationService, InfluencerService, InstagrammDataService]
})

export class DropDownComponent implements OnInit {
    private authenticationService: AuthenticationService;
    private influencerService: InfluencerService;
    private instagramDataService: InstagrammDataService;
    private influencer: Influencer;
    private userDataChanged: boolean;


    constructor(authenticationService: AuthenticationService, influencerService: InfluencerService,
                instagramDataService: InstagrammDataService) {
        this.authenticationService = authenticationService;
        this.influencerService = influencerService;
        this.instagramDataService = instagramDataService;
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
                    },
                    error => {
                        throw new Error(error);
                    }
                );
            this.instagramDataService.getUserData(username)
                .subscribe(
                    userData => {
                        console.log("Load userdata");
                        $('#influncerProfilPictureDropDown').attr("src", userData.profilePictureUrl);
                    },
                    error => {
                        throw new Error(error);
                    }
                )
            ;

            this.registerDropdownInteractions();
        }
    }

    public static showMissingInfoForApplication() {
        $('#dropdownLink').click();
        if (!this.isValueSet("email")) {
            this.markFieldAsMissing("email");
        }
        if (!this.isValueSet("address")) {
            this.markFieldAsMissing("address");
        }
    }

    private registerDropdownInteractions() {
        $('#email').on('input', () => {
            this.influencer.email = DropDownComponent.getValueForInput('email');
            this.userDataChanged = true;
        });

        $('#address').on('input', () => {
            this.influencer.address = DropDownComponent.getValueForInput('address');
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
            DropDownComponent.resetAllFieldsToNormal();
            $('#dropdownLink').click();
            event.preventDefault();
        });
    }

    private static getValueForInput(name: string): string {
        return $('#' + name).val() + "";
    }

    private static isValueSet(name: string): boolean {
        let value = this.getValueForInput(name);
        return (value && value.length > 0);
    }

    private static markFieldAsMissing(name: string) {
        $('#' + name).addClass('missing');
    }

    private static resetField(name: string) {
        $('#' + name).removeClass('missing');
    }

    private static resetAllFieldsToNormal() {
        DropDownComponent.resetField("email");
        DropDownComponent.resetField("address");
    }
}