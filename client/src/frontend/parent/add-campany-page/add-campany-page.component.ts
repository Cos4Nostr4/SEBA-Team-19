import {Component,OnInit} from '@angular/core';



@Component({

    selector: "add-campany",
    templateUrl: "./add-campany-page.component.html",
    styleUrls: ["./add-campany-page.component.css"]

})
export class AddCampanyPageComponent implements OnInit{

    private formData: {title:"", followers:"", amount:"", description:"", endData:"", hashTags:string[], categories:string[]};

    ngOnInit(): void {
    }
}