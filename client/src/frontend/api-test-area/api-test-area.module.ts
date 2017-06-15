import {NgModule} from "@angular/core";
import {InstagramAuthenticationCallbackComponent} from "./api-test-area.component";

@NgModule({
    declarations: [
        InstagramAuthenticationCallbackComponent
    ],
    exports: [
        InstagramAuthenticationCallbackComponent
    ]
})
export class ApiModule {
}