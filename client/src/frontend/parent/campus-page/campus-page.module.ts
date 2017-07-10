import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CampusPageComponent} from "./campus-page.component";
import {MenuSliderModule} from "../../menu-slider/menu-slider.module";
import {AppHeaderModule} from "../../app-header/app-header.module";
import {CampaignListElementModule} from "../campaign-list-element/campaign-list-element.module";

@NgModule({
    imports: [
        CommonModule,
        AppHeaderModule,
        MenuSliderModule,
        CampaignListElementModule
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