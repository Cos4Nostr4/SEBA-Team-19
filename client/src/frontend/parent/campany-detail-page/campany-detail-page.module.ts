import {NgModule} from "@angular/core";
import {CampanyDetailPageComponent} from './campany-detail-page.component';
import {AppHeaderCompanyModule} from "../../app-header-company/app-header-company.module";

@NgModule ({
    imports: [
        AppHeaderCompanyModule

    ],
    declarations: [
        CampanyDetailPageComponent
    ],
    exports: [
        CampanyDetailPageComponent
    ]
})

export class CampanyDetailPageModule {}