import {NgModule} from "@angular/core";
import {AppHeaderComponent} from './app-header.component'
import {AppTitleModule} from './app-title/app-title.module'
import {LoginButtonModule} from './login-button/login-button.module'

@NgModule({
    imports: [
        AppTitleModule,
        LoginButtonModule
    ],
    declarations: [
        AppHeaderComponent
    ],
    exports: [
        AppHeaderComponent
    ]
})

export class AppHeaderModule {
}