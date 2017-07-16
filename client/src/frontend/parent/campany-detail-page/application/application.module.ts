import {ApplicationComponent} from "./application.component";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

@NgModule ({
    imports: [
        CommonModule
    ],
    declarations: [
        ApplicationComponent
    ],
    exports: [
        ApplicationComponent
    ]
})

export class ApplicationModule {}