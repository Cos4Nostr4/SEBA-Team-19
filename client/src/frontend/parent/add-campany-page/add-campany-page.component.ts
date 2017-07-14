import {Component, OnInit} from "@angular/core";
import {Campaign} from "../../data-objects/campaign";
import UUID from "../../../../../server/src/backend/uuid/uuid";
import {CompanyService} from "../../services/company.service";
import {CompanyAuthenticationService} from "../../services/company-authentication.service";
import {Company} from "../../data-objects/company";
import {getUserSelectableCategories} from "../../data-objects/categories";


@Component({

    selector: "add-campany",
    templateUrl: "./add-campany-page.component.html",
    styleUrls: ["./add-campany-page.component.css"],
    providers: [CompanyService, CompanyAuthenticationService]

})
export class AddCampanyPageComponent implements OnInit {
    private companyService: CompanyService;
    private companyAuthenticationService: CompanyAuthenticationService;
    private company: Company;
    private selectableCategories:string[];
    private formData: any;


    constructor(companyService: CompanyService, companyAuthenticationService: CompanyAuthenticationService) {
        this.companyService = companyService;
        this.companyAuthenticationService = companyAuthenticationService;
        this.selectableCategories = getUserSelectableCategories();
    }

    ngOnInit(): void {
        this.formData = {
            title: "",
            followers: "",
            amount: "",
            description: "",
            endDate: "",
            hashTags: [],
            categories: []
        };

        let companyUUid = "1";
        this.companyService.getCompanyForId(companyUUid)
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
        let createdCampaign = new Campaign(UUID.createNew().asStringValue(), this.formData.title, this.formData.description, campaignPicture,
            this.company, this.formData.amount, this.formData.followers, hashTags, new Date(), endDate, true);
        console.log("FORM: " + JSON.stringify(createdCampaign));
        console.log("Categories:"+this.formData.categories);
    }

    private extractHashTags(): string[] {
        if(!this.formData.hashTags || this.formData.hashTags.length == 0){
            return [];
        }

        let hashTagsString:string = this.formData.hashTags;
        let cleanedHastTagString = hashTagsString.replace(new RegExp("(,|;|\\.)", 'g'), " ");
        console.log("CLEANED:" +cleanedHastTagString);
        let hashTags = cleanedHastTagString.split(" ")
            .map((hashTagWithWithspace) => hashTagWithWithspace.trim())
            .filter((possibleEmptyHashTag) => possibleEmptyHashTag.length > 0);
        return hashTags;
    }
}