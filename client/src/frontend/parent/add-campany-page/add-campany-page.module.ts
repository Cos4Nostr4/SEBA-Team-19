import {NgModule} from "@angular/core";
import {AddCampanyPageComponent} from "./add-campany-page.component";
import {AppHeaderCompanyModule} from "../../app-header-company/app-header-company.module";


@NgModule({

    imports: [
        AppHeaderCompanyModule
    ],

    declarations: [
        AddCampanyPageComponent
    ],
    exports: [
        AddCampanyPageComponent
    ]

})

export class AddCampanyPageModule {}
