import {NgModule} from "@angular/core";
import {CampanyDetailPageComponent} from './campany-detail-page.component';
import {AppHeaderCompanyModule} from "../../app-header-company/app-header-company.module";
import {ApplicationModule} from "./application/application.module";
import {CommonModule} from "@angular/common";

@NgModule ({
    imports: [
        CommonModule,
        AppHeaderCompanyModule,
        ApplicationModule
    ],
    declarations: [
        CampanyDetailPageComponent
    ],
    exports: [
        CampanyDetailPageComponent
    ]
})

export class CampanyDetailPageModule {}