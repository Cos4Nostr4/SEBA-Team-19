import {NgModule} from "@angular/core";
import {MenuSliderComponent} from './menu-slider.component'
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
    imports: [
        NgbModule
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
