import {NgModule} from "@angular/core";
import {AddCampanyComponent} from "./add-campany-page.component";
import {AppHeaderCompanyModule} from "../../app-header-company/app-header-company.module";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {FileDropDirective, FileSelectDirective, FileUploadModule} from "ng2-file-upload";
import {AppFooterModule} from "../../app-footer/app-footer.module";


@NgModule({
    imports: [
        AppHeaderCompanyModule,
        CommonModule,
        FormsModule,
        FileUploadModule,
        AppFooterModule
    ],

    declarations: [
        AddCampanyComponent
    ],
    exports: [
        AddCampanyComponent,
        FileSelectDirective,
        FileDropDirective,
        FormsModule,
        FileUploadModule
    ]

})

export class AddCampanyPageModule {
}
