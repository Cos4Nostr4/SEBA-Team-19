import {NgModule} from "@angular/core";
import {SampleObjectComponent} from "./sample-page.component";
@NgModule({
    declarations: [
        SampleObjectComponent
    ],
    exports: [
        SampleObjectComponent
    ]
})
export class SamplePageModule {
}