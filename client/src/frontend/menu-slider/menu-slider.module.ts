import {NgModule} from "@angular/core";
import {MenuSliderComponent} from "./menu-slider.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {DropDownModule} from "./dropdown/drop-down.module";


@NgModule({
    imports: [
        NgbModule,
        DropDownModule
    ],
    declarations: [
        MenuSliderComponent
    ],
    exports: [
        MenuSliderComponent
    ]
})

export class MenuSliderModule {

}
