import {Component} from "@angular/core";
import {Router} from "@angular/router";

@Component({
    selector: 'add-campany-list-element',
    templateUrl: './add-campany-list-element.component.html',
    styleUrls: ['./add-campany-list-element.component.css'],
})

export class AddCampanyListElementComponent {
    private router: Router;

    constructor(router: Router) {
        this.router = router;
    }

    public addCampaign() {
        this.router.navigate(['/add-campany/']);
    }

}