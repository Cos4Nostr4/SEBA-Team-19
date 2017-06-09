import {NgModule} from "@angular/core";
import {DashBoardComponent} from "./dashboard.component";
import {RouterModule} from "@angular/router";
@NgModule({
    imports: [
        RouterModule
    ],
    declarations: [
        DashBoardComponent
    ],
    exports: [
        DashBoardComponent
    ]
})
export class DashBoardModule {
}