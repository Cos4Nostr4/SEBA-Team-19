import {Component, OnInit} from "@angular/core";
import {Campaign} from "../../data-objects/campaign";
import UUID from "../../../../../server/src/backend/uuid/uuid";
import {CompanyService} from "../../services/company.service";
import {CompanyAuthenticationService} from "../../services/company-authentication.service";
import {Company} from "../../data-objects/company";
import {getUserSelectableCategories} from "../../data-objects/categories";
import {CampaignService} from "../../services/campaign.service";
import {Router} from "@angular/router";
import {CookieHandler} from "../../services/cookie-handler";


@Component({

    selector: "add-campany",
    templateUrl: "./add-campany-page.component.html",
    styleUrls: ["./add-campany-page.component.css"],
    providers: [CompanyService, CampaignService, CompanyAuthenticationService]

})
export class AddCampanyComponent implements OnInit {
    private companyService: CompanyService;
    private campaignService: CampaignService;
    private companyAuthenticationService: CompanyAuthenticationService;
    private router: Router;
    private company: Company;
    private selectableCategories: string[];
    private formData: any;


    constructor(companyService: CompanyService, campaignService: CampaignService,
                companyAuthenticationService: CompanyAuthenticationService, router: Router) {
        this.companyService = companyService;
        this.campaignService = campaignService;
        this.companyAuthenticationService = companyAuthenticationService;
        this.router = router;
        this.selectableCategories = getUserSelectableCategories();
    }

    ngOnInit(): void {
        this.companyAuthenticationService.ensureIsLoggedIn();

        this.formData = {
            title: "",
            followers: "",
            amount: "",
            description: "",
            endDate: "",
            hashTags: [],
            categories: []
        };

        let companyUuid = CookieHandler.getCookie(CompanyAuthenticationService.COOKIE_ID);
        this.companyService.getCompanyForId(companyUuid)
            .subscribe(company => {
                    this.company = company;
                },
                error => {
                    throw new Error(error);
                });
    }

    public createCampaign(): void {
        let campaignPicture = "creatin.jpg";
        let endDate = new Date(this.formData.endDate);
        let hashTags = this.extractHashTags();
        let categories = this.extractCategories();
        let createdCampaign = new Campaign(UUID.createNew().asStringValue(), this.formData.title, this.formData.description, campaignPicture,
            this.company, this.formData.amount, this.formData.followers, hashTags, new Date(), endDate, categories, true);
        console.log("FORM: " + JSON.stringify(createdCampaign));

        this.campaignService.addCampaign(createdCampaign)
            .subscribe(
                uuid => {
                    this.router.navigate(['/campany/']);
                },
                error => {
                    throw new Error(error)
                }
            )
    }

    private extractHashTags(): string[] {
        if (!this.formData.hashTags || this.formData.hashTags.length == 0) {
            return [];
        }

        let hashTagsString: string = this.formData.hashTags;
        let cleanedHastTagString = hashTagsString.replace(new RegExp("(,|;|\\.)", 'g'), " ");
        let hashTags = cleanedHastTagString.split(" ")
            .map((hashTagWithWithspace) => hashTagWithWithspace.trim())
            .filter((possibleEmptyHashTag) => possibleEmptyHashTag.length > 0);
        return hashTags;
    }

    private extractCategories(): string[] {
        let categories: string[] = this.formData.categories;
        if (categories && categories.length > 0) {
            let uppercaseCategories = categories
                .map((category) => category.toUpperCase());
            uppercaseCategories.unshift("NEW");
            return uppercaseCategories;
        } else {
            return ["OTHERS"];
        }
    }
}