import {NgModule} from "@angular/core";
import {StatusPageComponent} from "./status-page.component";
import {CommonModule} from "@angular/common";
import {AppHeaderCompanyModule} from "../../app-header-company/app-header-company.module";
import {ScoreModule} from "./score/score.module";
import {CostsModule} from "./costs/costs.module";

@NgModule({
    imports: [
        CommonModule,
        AppHeaderCompanyModule,
        CostsModule,
        ScoreModule
    ],
    declarations: [
        StatusPageComponent
    ],
    exports: [
        StatusPageComponent
    ]
})

export class StatusPageModule {
}