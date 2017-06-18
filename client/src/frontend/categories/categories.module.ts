import {NgModule} from "@angular/core";
import {CategoriesComponent} from "./categories.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
    imports: [
        NgbModule
    ],
    declarations: [
        CategoriesComponent
    ],
    exports: [
        CategoriesComponent
    ]
})

export class CategoriesModule {
}