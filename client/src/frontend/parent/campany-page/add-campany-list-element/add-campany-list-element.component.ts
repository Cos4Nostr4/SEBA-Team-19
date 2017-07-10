import {Component} from "@angular/core";
import {ImageService} from "../../../services/image.service";
import {Router} from "@angular/router";

@Component({
    selector: 'add-campany-list-element',
    templateUrl: './add-campany-list-element.component.html',
    styleUrls: ['./add-campany-list-element.component.css'],
    providers: [ImageService]
})

export class AddCampanyListElementComponent {
    private router: Router;

    constructor(router: Router) {
        this.router = router;
    }

    addCampaign() {
        this.router.navigate(['/add-campany-detail/']);
    }

}