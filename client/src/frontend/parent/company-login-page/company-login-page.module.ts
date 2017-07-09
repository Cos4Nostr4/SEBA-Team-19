import {NgModule} from "@angular/core";
import {CompanyLoginPageComponent} from "./company-login-page.component";
import {CommonModule} from "@angular/common";
import {FormsModule}   from '@angular/forms';

@NgModule ({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        CompanyLoginPageComponent
    ],
    exports: [
        CompanyLoginPageComponent
    ]
})

export class CompanyLoginPageModule {}