import {Component} from "@angular/core";

@Component({
    selector: 'my-app',
    template: `
        <app-header></app-header>
        <menu-slider></menu-slider>
        <router-outlet></router-outlet>`
})
export class AppComponent {
}
