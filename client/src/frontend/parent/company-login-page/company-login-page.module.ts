import {NgModule} from "@angular/core";
import {CompanyLoginPageComponent} from "./company-login-page.component";
import {CommonModule} from "@angular/common";

@NgModule ({
    imports: [
        CommonModule
    ],
    declarations: [
        CompanyLoginPageComponent
    ],
    exports: [
        CompanyLoginPageComponent
    ]
})

export class CompanyLoginPageModule {}