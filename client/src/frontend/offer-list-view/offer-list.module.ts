import {NgModule} from "@angular/core";
import {OfferListComponent} from "./offer-list.component";
import {CommonModule} from "@angular/common";
import {OfferListElementModule} from "./offer-list-element/offer-list-element.module";
import {AppHeaderModule} from "../app-header/app-header.module";
import {MenuSliderModule} from "../menu-slider/menu-slider.module";



@NgModule({
    imports: [
        CommonModule,
        OfferListElementModule,
        AppHeaderModule,
        MenuSliderModule
    ],
    declarations: [
        OfferListComponent,
    ],
    exports: [
        OfferListComponent
    ]
})
export class OfferListModule {
}
