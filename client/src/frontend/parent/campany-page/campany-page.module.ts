import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CampanyPageComponent} from './campany-page.component';
import {OfferListElementModule} from "../../offer-list-view/offer-list-element/offer-list-element.module";

@NgModule ({
    imports: [
        CommonModule,
        OfferListElementModule
    ],
    declarations: [
        CampanyPageComponent
    ],
    exports: [
        CampanyPageComponent
    ]
})

export class CampanyPageModule {}