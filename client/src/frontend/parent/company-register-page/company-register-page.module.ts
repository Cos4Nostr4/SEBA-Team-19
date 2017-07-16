import {NgModule} from "@angular/core";
import {CompanyRegisterPageComponent} from "./company-register-page.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AppHeaderModule} from "../../app-header/app-header.module";
import {AppFooterModule} from "../../app-footer/app-footer.module";


@NgModule({
    imports: [
        CommonModule,
        AppHeaderModule,
        FormsModule,
        AppFooterModule
    ],
    declarations: [
        CompanyRegisterPageComponent
    ],
    exports: [
        CompanyRegisterPageComponent
    ]
})

export class CompanyRegisterPageModule {
}