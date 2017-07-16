import {NgModule} from "@angular/core";
import {CampanyDetailPageComponent} from './campany-detail-page.component';
import {AppHeaderCompanyModule} from "../../app-header-company/app-header-company.module";
import {ApplicationModule} from "./application/application.module";
import {CommonModule} from "@angular/common";
import {AppFooterModule} from "../../app-footer/app-footer.module";

@NgModule ({
    imports: [
        CommonModule,
        AppHeaderCompanyModule,
        ApplicationModule,
        AppFooterModule
    ],
    declarations: [
        CampanyDetailPageComponent
    ],
    exports: [
        CampanyDetailPageComponent
    ]
})

export class CampanyDetailPageModule {}