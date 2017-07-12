import {NgModule} from "@angular/core";
import {StatusPageComponent} from './status-page.component';
import {CommonModule} from "@angular/common";
import {RecentMediaModule} from "./recent-media/recent-media.module";
import {ScoreModule} from "./score/score.module";

@NgModule ({
    imports: [
        CommonModule,
        RecentMediaModule,
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