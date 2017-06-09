import {OfferListElementComponent} from "./offer-list-element.component";
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        OfferListElementComponent
    ],
    exports: [
        OfferListElementComponent
    ]
})
export class OfferListElementModule {
}