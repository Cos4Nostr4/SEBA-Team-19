import {NgModule} from "@angular/core";
import {AuthenticationComponent} from "./api-test-area.component";
@NgModule({
    declarations: [
        AuthenticationComponent
    ],
    exports: [
        AuthenticationComponent
    ]
})
export class AuthenticationModule {
}