import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CampanyPageComponent} from "./campany-page.component";
import {AppHeaderCompanyModule} from "../../app-header-company/app-header-company.module";
import {AddCampanyListElementModule} from "./add-campany-list-element/add-campany-list-element.module";
import {CampanyListElementModule} from "./campany-list-element/campany-list-element.module";
import {AppFooterModule} from "../../app-footer/app-footer.module";


@NgModule({
    imports: [
        CommonModule,
        CampanyListElementModule,
        AddCampanyListElementModule,
        AppHeaderCompanyModule,
        AppFooterModule
    ],
    declarations: [
        CampanyPageComponent
    ],
    exports: [
        CampanyPageComponent
    ]
})

export class CampanyPageModule {
}