import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DefaultPageComponent} from './default-page.component';
import {OfferListElementModule} from "../../offer-list-view/offer-list-element/offer-list-element.module";

@NgModule ({
    imports: [
    	CommonModule,
        OfferListElementModule
    ],
    declarations: [
        DefaultPageComponent
    ],
    exports: [
        DefaultPageComponent
    ]
})

export class DefaultPageModule {}