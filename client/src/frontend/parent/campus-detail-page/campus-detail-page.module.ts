import {NgModule} from "@angular/core";
import {MenuSliderModule} from "../../menu-slider/menu-slider.module";
import {AppHeaderModule} from "../../app-header/app-header.module";
import {CampusDetailPageComponent} from "./campus-detail-page.component";


@NgModule({
    imports: [
        MenuSliderModule,
        AppHeaderModule
    ],
    declarations: [
        CampusDetailPageComponent
    ],
    exports: [
        CampusDetailPageComponent
    ]
})
export class CampusDetailPageModule {

}