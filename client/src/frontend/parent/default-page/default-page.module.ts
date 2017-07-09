import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DefaultPageComponent} from "./default-page.component";
import {AppHeaderModule} from "../../app-header/app-header.module";
import {MenuSliderModule} from "../../menu-slider/menu-slider.module";
import {CampaignListElementModule} from "../campaign-list-element/campaign-list-element.module";

@NgModule({
    imports: [
        CommonModule,
        AppHeaderModule,
        MenuSliderModule,
        CampaignListElementModule
    ],
    declarations: [
        DefaultPageComponent
    ],
    exports: [
        DefaultPageComponent
    ]
})

export class DefaultPageModule {
}