import {NgModule} from "@angular/core";
import {CategoriesComponent} from "./categories.component";

@NgModule({
    declarations: [
        CategoriesComponent
    ],
    exports: [
        CategoriesComponent
    ]
})

export class CategoriesModule {
}