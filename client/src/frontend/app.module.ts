import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {AppHeaderModule} from "./app-header/app-header.module";
import {OfferListModule} from "./offer-list-view/offer-list.module";
import {OfferListComponent} from "./offer-list-view/offer-list.component";
import {RouterModule} from "@angular/router";
import {DashBoardComponent} from "./dashboard/dashboard.component";
import {OfferDetailComponent} from "./offer-detail-view/offer-detail.component";
import {HttpModule, JsonpModule} from "@angular/http";
import {OfferListElementModule} from "./offer-list-view/offer-list-element/offer-list-element.module";
import {OfferDetailModule} from "./offer-detail-view/offer-detail.module";
import {DashBoardModule} from "./dashboard/dashboard.module";
import {SamplePageModule} from "./sample-page/sample-page.module";
import {SampleObjectComponent} from "./sample-page/sample-page.component";
import {AuthenticationModule} from "./api-test-area/api-test-area.module";
import {AuthenticationComponent} from "./api-test-area/api-test-area.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MenuSliderModule} from "./menu-slider/menu-slider.module";



@NgModule({
    imports: [
        BrowserModule,
        AppHeaderModule,
        OfferListModule,
        OfferListElementModule,
        OfferDetailModule,
        SamplePageModule,
        MenuSliderModule,
        AuthenticationModule,
        DashBoardModule,
        HttpModule,
        JsonpModule,
        NgbModule.forRoot(),
        RouterModule.forRoot([
            {
                path: 'dashboard',
                component: DashBoardComponent
            },
            {
                path: 'offers',
                component: OfferListComponent
            },
            {
                path: 'categories/:categoryId',
                component: OfferListComponent
            },
            {
                path: 'campaign-detail/:id',
                component: OfferDetailComponent
            },

            {
                path: 'sample-page',
                component: SampleObjectComponent
            },
            {
                path:'api-test-area',
                component: AuthenticationComponent
            },
            {
                path: 'menu-slider-page',
                component: SampleObjectComponent
            },
            {
                path: '',
                redirectTo: '/dashboard',
                pathMatch: 'full'
            },
        ])
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
