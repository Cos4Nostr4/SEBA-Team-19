
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CampanyListElementComponent} from "./campany-list-element.component";
@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        CampanyListElementComponent
    ],
    exports: [
        CampanyListElementComponent
    ]
})
export class CampanyListElementModule {
}