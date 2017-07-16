import {NgModule} from "@angular/core";
import {StatusPageComponent} from './status-page.component';
import {CommonModule} from "@angular/common";
import {RecentMediaModule} from "./recent-media/recent-media.module";
import {AppHeaderCompanyModule} from "../../app-header-company/app-header-company.module";
import {ScoreModule} from "./score/score.module";

@NgModule ({
    imports: [
        CommonModule,
        RecentMediaModule,
        AppHeaderCompanyModule,
        ScoreModule
    ],
    declarations: [
        StatusPageComponent
    ],
    exports: [
        StatusPageComponent
    ]
})

export class StatusPageModule {}