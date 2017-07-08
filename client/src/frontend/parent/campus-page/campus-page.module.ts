import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CampusPageComponent} from './campus-page.component';
import {OfferListElementModule} from "../../offer-list-view/offer-list-element/offer-list-element.module";

@NgModule ({
    imports: [
        CommonModule,
        OfferListElementModule
    ],
    declarations: [
        CampusPageComponent
    ],
    exports: [
        CampusPageComponent
    ]
})

export class CampusPageModule {}