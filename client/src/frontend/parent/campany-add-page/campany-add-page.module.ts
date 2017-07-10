import {NgModule} from "@angular/core";
import {Component, OnInit} from "@angular/core";
import {CampanyAddPageComponent} from "./campany-add-page.component"
import {AppHeaderCompanyModule} from "../../app-header-company/app-header-company.module";



@NgModule({

    imports: [
        AppHeaderCompanyModule
    ],

    declarations: [
        CampanyAddPageComponent
    ],
    exports: [
        CampanyAddPageComponent
        ]

})

export class CampanyAddPageModule {


}
