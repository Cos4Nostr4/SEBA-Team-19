import {NgModule} from "@angular/core";
import {OfferListComponent} from "./offer-list.component";
import {CommonModule} from "@angular/common";
import {OfferListElementModule} from "./offer-list-element/offer-list-element.module";



@NgModule({
    imports: [
        CommonModule,
        OfferListElementModule,
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
