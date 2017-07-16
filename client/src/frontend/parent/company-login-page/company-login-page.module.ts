import {NgModule} from "@angular/core";
import {CompanyLoginPageComponent} from "./company-login-page.component";
import {AppHeaderModule} from "../../app-header/app-header.module";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        AppHeaderModule,
        FormsModule
    ],
    declarations: [
        CompanyLoginPageComponent
    ],
    exports: [
        CompanyLoginPageComponent
    ]
})

export class CompanyLoginPageModule {
}