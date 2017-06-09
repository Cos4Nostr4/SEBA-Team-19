import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent}  from './app.component';
import {AppHeaderModule} from './app-header/app-header.module'
import {OfferListModule} from './offer-list-view/offer-list.module'
import {OfferListComponent} from './offer-list-view/offer-list.component'
import { RouterModule }   from '@angular/router';
import {DashBoardComponent} from './dashboard/dashboard.component';
import {OfferDetailComponent} from './offer-detail-view/offer-detail.component'
import {HttpModule, JsonpModule} from "@angular/http";
import {OfferListElementModule} from "./offer-list-view/offer-list-element/offer-list-element.module";

@NgModule({
    imports: [
        BrowserModule,
        AppHeaderModule,
        OfferListModule,
        OfferListElementModule,
        HttpModule,
        JsonpModule,
        RouterModule.forRoot([
            {
                path: 'offers',
                component: OfferListComponent
            },
            {
                path: 'dashboard',
                component: DashBoardComponent
            },
            {
                path: 'offer-detail/:id',
                component: OfferDetailComponent
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
        DashBoardComponent,
        OfferDetailComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
