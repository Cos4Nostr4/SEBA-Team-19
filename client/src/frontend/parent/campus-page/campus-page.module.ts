import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CampusPageComponent} from "./campus-page.component";
import {OfferListElementModule} from "../../offer-list-view/offer-list-element/offer-list-element.module";
import {MenuSliderModule} from "../../menu-slider/menu-slider.module";
import {AppHeaderModule} from "../../app-header/app-header.module";

@NgModule({
    imports: [
        CommonModule,
        AppHeaderModule,
        MenuSliderModule,
        OfferListElementModule
    ],
    declarations: [
        CampusPageComponent
    ],
    exports: [
        CampusPageComponent
    ]
})

export class CampusPageModule {
}