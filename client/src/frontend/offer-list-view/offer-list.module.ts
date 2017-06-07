import {NgModule}      from '@angular/core';
import {OfferListComponent} from './offer-list.component'
import {CommonModule} from "@angular/common";
import {OfferListElementComponent} from "./offer-list-element.component";

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        OfferListComponent,
        OfferListElementComponent
    ],
    exports: [
        OfferListComponent
    ]
})
export class OfferListModule {
}
