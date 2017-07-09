import {NgModule} from "@angular/core";
import {OfferDetailComponent} from "./offer-detail.component";
import {MenuSliderModule} from "../menu-slider/menu-slider.module";

@NgModule({
    imports: [
      MenuSliderModule
    ],
    declarations: [
        OfferDetailComponent
    ],
    exports: [
        OfferDetailComponent
    ]
})
export class OfferDetailModule {
}