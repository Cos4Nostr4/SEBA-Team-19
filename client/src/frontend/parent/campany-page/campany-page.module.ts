import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CampanyPageComponent} from './campany-page.component';
import {OfferListElementModule} from "../../offer-list-view/offer-list-element/offer-list-element.module";
import {AppHeaderCompanyModule} from "../../app-header-company/app-header-company.module";


@NgModule ({
    imports: [
        CommonModule,
        OfferListElementModule,
        AppHeaderCompanyModule
    ],
    declarations: [
        CampanyPageComponent
    ],
    exports: [
        CampanyPageComponent
    ]
})

export class CampanyPageModule {}