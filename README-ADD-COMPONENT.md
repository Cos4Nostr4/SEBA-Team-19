----------------------------------------------------------------------------------------------
##SHORT SUMMATION OF WHOLE COMMAND LIST:

#CREATE folder sample-page IN frontend
#CREATE file, sample-page.component.ts IN frontend/sample-page
#CREATE file, sample-page.component.html IN frontend/sample-page
#CREATE file, sample-page.component.css IN frontend/sample-page
#CREATE file, sample-page.module.ts (fancy way for private / public) IN frontend/sample-page
#GO TO frontend/services and CREATE file sample.service (Can become EDIT instead of CREATE)
#GO TO frontend/app.module.ts and EDIT the imports and add the path
#GO TO frontend/data-objects CREATE sample-objects.ts
----------------------------------------------------------------------------------------------




----------------------------------------------------------------------------------------------
##MORE DETAILED EXPLANATION OF THE WORKFLOW:


----------------------------------------
#CREATE folder sample-page IN frontend


----------------------------------------
#CREATE file, sample-page.component.ts IN frontend/sample-page :

import {Component} from "@angular/core";
import {SampleObject} from "../data-objects/sample-object";
import {SampleService} from "../services/sample.service";

@Component({
    selector: 'sample-page',
    templateUrl: './sample-page.component.html',
    styleUrls: ['./sample-page.component.css'],
    providers: [SampleService]
})
export class SampleObjectComponent {
    private sampleObject: SampleObject;

   constructor() {
        this.sampleObject = new SampleObject(1, "Very important content");
    }
}


----------------------------------------
#CREATE file, sample-page.component.html IN frontend/sample-page :

<h1> This page is working and is called sample-page </h1>


----------------------------------------
#CREATE sample-page.component.css IN frontend/sample-page


----------------------------------------
#CREATE sample-page.module.ts (fancy way for private / public) IN frontend/sample-page :

import {NgModule} from "@angular/core";
import {SampleObjectComponent} from "./sample-page.component";
@NgModule({
    declarations: [
        SampleObjectComponent
    ],
    exports: [
        SampleObjectComponent
    ]
})
export class SamplePageModule {
}


----------------------------------------
#GO TO frontend/services and CREATE sample.service.ts :

import {Injectable} from "@angular/core";
import {SampleObject} from "../data-objects/sample-object";

@Injectable()
export class SampleService {


   public getSampleObject(): SampleObject {
        return new SampleObject(1, "Very important component");
    }
}


----------------------------------------
#GO TO frontend/app.module.ts and EDIT the imports and add the path :

@NgModule({
    imports: [
        BrowserModule,
        AppHeaderModule,
        OfferListModule,
        OfferListElementModule,
        OfferDetailModule,
        SamplePageModule,
        DashBoardModule,
        HttpModule,
        JsonpModule,
        RouterModule.forRoot([
            {
                path: 'offers',
                component: OfferListComponent
            },
            {
                path: 'dashboard',
                component: DashBoardComponent
            },
            {
                path: 'offer-detail/:id',
                component: OfferDetailComponent
            },

           {
                path: 'sample-page',
                component: SampleObjectComponent
            },
            {
                path: '',
                redirectTo: '/dashboard',
                pathMatch: 'full'
            },
        ])
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [
        AppComponent
    ]
})


----------------------------------------------
#GO TO frontend/data-objects CREATE sample-objects.ts


export class SampleObject{
    private _id: Number;
    private _content: String;


    constructor(id: Number, content: String) {
        this._id = id;
        this._content = content;
    }


    get id(): Number {
        return this._id;
    }

    get content(): String {
        return this._content;
    }
}


----------------------------------------------------------------------------------------------
