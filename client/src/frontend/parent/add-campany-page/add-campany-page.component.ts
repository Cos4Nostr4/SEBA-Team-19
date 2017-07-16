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
import {FileItem, FileUploader} from "ng2-file-upload";

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
    private upload: FileUploader = new FileUploader({url: "http://localhost:3010/api/upload"});
    private company: Company;
    private selectableCategories: string[];
    private formData: any;
    private errorMessage: string;


    constructor(companyService: CompanyService, campaignService: CampaignService,
                companyAuthenticationService: CompanyAuthenticationService, router: Router) {
        this.companyService = companyService;
        this.campaignService = campaignService;
        this.companyAuthenticationService = companyAuthenticationService;
        this.upload.onBeforeUploadItem = (item) => {
            item.withCredentials = false;
        };
        this.router = router;
        this.selectableCategories = getUserSelectableCategories();
        this.errorMessage = null;
        this.formData = {
            title: "",
            followers: "",
            amount: "",
            description: "",
            endDate: "",
            hashTags: [],
            categories: []
        };
    }

    ngOnInit(): void {
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
        if (this.allDataInserted()) {
            let campaignPicture = this.determinePictureName();
            let endDate = new Date();
            let hashTags = this.extractHashTags();
            let categories = this.extractCategories();
            let createdCampaign = new Campaign(UUID.createNew().asStringValue(), this.formData.title, this.formData.description, campaignPicture,
                this.company, this.formData.amount, this.formData.followers, hashTags, new Date(), endDate, categories, true);

            this.campaignService.addCampaign(createdCampaign)
                .subscribe(
                    uuid => {
                        this.router.navigate(['/campany/']);
                    },
                    error => {
                        throw new Error(error)
                    }
                );
            this.uploadImage(campaignPicture);
        }
    }

    private ensureOnlySingleUpload() {
        let queue = this.upload.queue;
        let queueLength = queue.length;
        if (queueLength > 1) {
            for (let i = 0; i < queueLength - 1; i++) {
                queue[0].remove();
            }
        }

        if (queueLength <= 0) {
            throw new Error("No picture for upload selected");
        }
    }

    private determinePictureName(): string {
        this.ensureOnlySingleUpload();
        let item = this.upload.queue[0];
        let fileName = item.file.name;
        let startFileEnding = fileName.lastIndexOf(".");
        let fileEnding = fileName.substr(startFileEnding);
        let newFileName = UUID.createNew().asStringValue();
        return newFileName + fileEnding;
    }

    private uploadImage(fileName: string) {
        this.ensureOnlySingleUpload();
        let item: FileItem = this.upload.queue[0];
        item.file.name = fileName;
        this.upload.uploadItem(item);
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

    private allDataInserted() {
        let queueLength = this.upload.queue.length;
        if (queueLength < 1) {
            this.errorMessage = "Please provide a picture for the campaign";
            return false;
        }

        return true;
    }
}