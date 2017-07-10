import {Routes} from "@angular/router";
import {DefaultPageComponent} from "./parent/default-page/default-page.component";
import {CampusPageComponent} from "./parent/campus-page/campus-page.component";
import {CampusDetailPageComponent} from "./parent/campus-detail-page/campus-detail-page.component";
import {PageNotFoundComponent} from "./parent/page-not-found/page-not-found.component";

export const APP_ROUTES: Routes = [
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
        path: '**',
        component: PageNotFoundComponent,
        data: {title: 'B2B'}
    }
];