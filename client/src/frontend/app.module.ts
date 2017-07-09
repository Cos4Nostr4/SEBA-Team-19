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
import {CampanyDetailPageComponent} from "./parent/campany-detail-page/campany-detail-page.component";
import {CampanyPageModule} from './parent/campany-page/campany-page.module';
import {CampanyPageComponent} from './parent/campany-page/campany-page.component';
import {CampusDetailPageModule} from './parent/campus-detail-page/campus-detail-page.module';
import {CampusDetailPageComponent} from './parent/campus-detail-page/campus-detail-page.component';
import {CampusPageModule} from './parent/campus-page/campus-page.module';
import {CampusPageComponent} from './parent/campus-page/campus-page.component';
import {CompanyLoginPageModule} from './parent/company-login-page/company-login-page.module';
import {CompanyLoginPageComponent} from './parent/company-login-page/company-login-page.component';
import {CompanyRegisterPageModule} from './parent/company-register-page/company-register-page.module';
import {CompanyRegisterPageComponent} from './parent/company-register-page/company-register-page.component';
import {DefaultPageModule} from './parent/default-page/default-page.module';
import {DefaultPageComponent} from './parent/default-page/default-page.component';
import {InstaLoginPageModule} from './parent/insta-login-page/insta-login-page.module';
import {InstaLoginPageComponent} from './parent/insta-login-page/insta-login-page.component';
import {ProfileViewDropdownModule} from './parent/profile-view-dropdown/profile-view-dropdown.module';
import {ProfileViewDropdownComponent} from './parent/profile-view-dropdown/profile-view-dropdown.component';
import {StatusPageModule} from './parent/status-page/status-page.module';
import {StatusPageComponent} from './parent/status-page/status-page.component';
import {CampanyAddPageModule} from './parent/campany-add-page/campany-add-page.module';
import {CampanyAddPageComponent} from './parent/campany-add-page/campany-add-page.component';



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
        CampanyAddPageModule,
        ProfileViewDropdownModule,
        StatusPageModule,
        NgbModule.forRoot(),
        RouterModule.forRoot([
            {
                path: '',
                redirectTo: '/default-page',
                pathMatch: 'full'
            },
            {
                path: 'default-page',
                component: DefaultPageComponent
            },
            {
                path: 'dashboard',
                component: DashBoardComponent
            },
            {
                path: 'campaigns',
                redirectTo: '/offers',
                pathMatch: 'full'
            },
            {
                path: 'offers',
                component: OfferListComponent
            },
            {
                path: 'offer-detail',
                component: OfferDetailComponent
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
                path: 'app-campany-detail-page',
                component: CampanyDetailPageComponent
            },
            {
                path: 'app-campany-page',
                component: CampanyPageComponent
            },
            {
                path: 'app-campus-detail-page',
                component: CampusDetailPageComponent
            },
            {
                path: 'app-campus-page',
                component: CampusPageComponent
            },
            {
                path: 'app-company-login-page',
                component: CompanyLoginPageComponent
            },
            {
                path: 'app-company-register-page',
                component: CompanyRegisterPageComponent
            },
            {
                path: 'app-insta-login-page',
                component: InstaLoginPageComponent
            },
            {
                path: 'app-profile-view-dropdrown',
                component: ProfileViewDropdownComponent
            },
            {
                path: 'app-status-page',
                component: StatusPageComponent
            },
            {
                path: 'app-campany-add-page',
                component: CampanyAddPageComponent
            }
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
