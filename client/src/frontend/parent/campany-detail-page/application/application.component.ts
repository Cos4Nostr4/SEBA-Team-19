import {Component, Input, OnInit} from "@angular/core";
import {Request} from "../../../data-objects/request";
import {InstagrammDataService} from "../../../services/instagramm-data.service";

declare var $:any;

@Component({
    selector: 'application',
    templateUrl: './application.component.html',
    styleUrls: ['./application.component.css'],
    providers: [InstagrammDataService]
})
export class ApplicationComponent implements OnInit{
    @Input() request: Request;
    private instagrammDataService: InstagrammDataService;


    constructor(instagrammDataService: InstagrammDataService) {
        this.instagrammDataService = instagrammDataService;
    }

    public ngOnInit(): void {
        this.instagrammDataService.getSelfData()
            .subscribe(
                selfData => {
                    $('#applicant-picture').attr('src', selfData.profilePictureUrl);
                }
            );

    }
}