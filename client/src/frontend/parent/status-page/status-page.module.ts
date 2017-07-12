import {NgModule} from "@angular/core";
import {StatusPageComponent} from './status-page.component';
import {CommonModule} from "@angular/common";
import {RecentMediaModule} from "./recent-media/recent-media.module";

@NgModule ({
    imports: [
        CommonModule,
        RecentMediaModule
    ],
    declarations: [
        StatusPageComponent
    ],
    exports: [
        StatusPageComponent
    ]
})

export class StatusPageModule {}