import {NgModule} from "@angular/core";
import {OfferDetailComponent} from "./offer-detail.component";
import {AppHeaderModule} from "../app-header/app-header.module";
import {MenuSliderModule} from "../menu-slider/menu-slider.module";

@NgModule({
    imports: [
      MenuSliderModule,
        AppHeaderModule
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