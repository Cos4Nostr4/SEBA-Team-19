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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CampanyDetailPageModule} from './parent/campany-detail-page/campany-detail-page.module';
import {CampanyPageModule} from './parent/campany-page/campany-page.module';
import {CampusDetailPageModule} from './parent/campus-detail-page/campus-detail-page.module';
import {CampusPageModule} from './parent/campus-page/campus-page.module';
import {CompanyLoginPageModule} from './parent/company-login-page/company-login-page.module';
import {CompanyRegisterPageModule} from './parent/company-register-page/company-register-page.module';
import {DefaultPageModule} from './parent/default-page/default-page.module';
import {InstaLoginPageModule} from './parent/insta-login-page/insta-login-page.module';
import {ProfileViewDropdownModule} from './parent/profile-view-dropdown/profile-view-dropdown.module';
import {StatusPageModule} from './parent/status-page/status-page.module';



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
        BrowserAnimationsModule,
        CampanyDetailPageModule,
        CampanyPageModule,
        CampusDetailPageModule,
        CampusPageModule,
        CompanyLoginPageModule,
        CompanyRegisterPageModule,
        DefaultPageModule,
        InstaLoginPageModule,
        ProfileViewDropdownModule,
        StatusPageModule,
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
                path: 'offer-detail/:id',
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
        AppComponent,
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
