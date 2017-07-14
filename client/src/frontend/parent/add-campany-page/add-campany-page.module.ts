import {NgModule} from "@angular/core";
import {AddCampanyPageComponent} from "./add-campany-page.component";
import {AppHeaderCompanyModule} from "../../app-header-company/app-header-company.module";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";


@NgModule({
    imports: [
        AppHeaderCompanyModule,
        CommonModule,
        FormsModule
    ],

    declarations: [
        AddCampanyPageComponent
    ],
    exports: [
        AddCampanyPageComponent
    ]

})

export class AddCampanyPageModule {}
