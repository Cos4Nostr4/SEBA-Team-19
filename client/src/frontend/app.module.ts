import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {FormsModule} from "@angular/forms";
import {AppHeaderModule} from "./app-header/app-header.module";
import {AppHeaderCompanyModule} from "./app-header-company/app-header-company.module";
import {RouterModule} from "@angular/router";
import {HttpModule, JsonpModule} from "@angular/http";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {MenuSliderModule} from "./menu-slider/menu-slider.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CampanyDetailPageModule} from "./parent/campany-detail-page/campany-detail-page.module";
import {CampanyDetailPageComponent} from "./parent/campany-detail-page/campany-detail-page.component";
import {CampanyPageModule} from "./parent/campany-page/campany-page.module";
import {CampanyPageComponent} from "./parent/campany-page/campany-page.component";
import {CampusDetailPageModule} from "./parent/campus-detail-page/campus-detail-page.module";
import {CampusDetailPageComponent} from "./parent/campus-detail-page/campus-detail-page.component";
import {CampusPageModule} from "./parent/campus-page/campus-page.module";
import {CampusPageComponent} from "./parent/campus-page/campus-page.component";
import {CompanyLoginPageModule} from "./parent/company-login-page/company-login-page.module";
import {CompanyLoginPageComponent} from "./parent/company-login-page/company-login-page.component";
import {CompanyRegisterPageModule} from "./parent/company-register-page/company-register-page.module";
import {CompanyRegisterPageComponent} from "./parent/company-register-page/company-register-page.component";
import {DefaultPageModule} from "./parent/default-page/default-page.module";
import {DefaultPageComponent} from "./parent/default-page/default-page.component";
import {StatusPageModule} from "./parent/status-page/status-page.module";
import {StatusPageComponent} from "./parent/status-page/status-page.component";
import {AddCampanyPageModule} from "./parent/add-campany-page/add-campany-page.module";
import {AddCampanyComponent} from "./parent/add-campany-page/add-campany-page.component";
import {PageNotFoundModule} from "./parent/page-not-found/page-not-found.module";
import {PageNotFoundComponent} from "./parent/page-not-found/page-not-found.component";


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppHeaderModule,
        AppHeaderCompanyModule,
        MenuSliderModule,
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
        AddCampanyPageModule,
        StatusPageModule,
        PageNotFoundModule,
        NgbModule.forRoot(),
        RouterModule.forRoot([
            {
                path: '',
                redirectTo: '/default-page',
                pathMatch: 'full'
            },
            {
                path: 'default-page',
                component: DefaultPageComponent,
                data: {title: 'B2B'}
            },
            {
                path: 'categories/:categoryId',
                component: CampusPageComponent,
                data: {title: 'B2B Category'}
            },
            {
                path: 'campaign-detail/:id',
                component: CampusDetailPageComponent,
                data: {title: 'B2B Campaign'}
            },
            {
                path: 'campany-detail/:id',
                component: CampanyDetailPageComponent
            },
            {
                path: 'campany',
                component: CampanyPageComponent
            },
            {
                path: 'company-login',
                component: CompanyLoginPageComponent
            },
            {
                path: 'company-register',
                component: CompanyRegisterPageComponent
            },
            {
                path: 'status/:id',
                component: StatusPageComponent
            },
            {
                path: 'add-campany',
                component: AddCampanyComponent
            },
            {
                path: '**',
                component: PageNotFoundComponent,
                data: {title: 'B2B'}
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
