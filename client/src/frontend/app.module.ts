import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent}  from './app.component';
import {AppHeaderModule} from './app-header/app-header.module'

@NgModule({
    imports: [
        BrowserModule,
        AppHeaderModule
    ],
    declarations: [
        AppComponent,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
