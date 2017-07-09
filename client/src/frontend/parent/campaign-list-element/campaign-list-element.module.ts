import {CampaignListElementComponent} from "./campaign-list-element.component";
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        CampaignListElementComponent
    ],
    exports: [
        CampaignListElementComponent
    ]
})
export class CampaignListElementModule {
}