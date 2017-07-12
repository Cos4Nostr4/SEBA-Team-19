import {NgModule} from "@angular/core";
import {CompanyRegisterPageComponent} from './company-register-page.component';
import {CommonModule} from "@angular/common";
import {FormsModule}   from '@angular/forms';

@NgModule ({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        CompanyRegisterPageComponent
    ],
    exports: [
        CompanyRegisterPageComponent
    ]
})

export class CompanyRegisterPageModule {}