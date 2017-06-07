import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent}  from './app.component';
import {AppHeaderModule} from './app-header/app-header.module'
import {OfferListModule} from './offer/offer-list.module'
import {OfferListComponent} from './offer/offer-list.component'
import { RouterModule }   from '@angular/router';
import {DashBoardComponent} from './dashboard/dashboard.component';

@NgModule({
    imports: [
        BrowserModule,
        AppHeaderModule,
        OfferListModule,
        RouterModule.forRoot([
            {
                path: 'heroes',
                component: OfferListComponent
            },
            {
                path: 'dashboard',
                component: DashBoardComponent
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
        DashBoardComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
