import {Component} from '@angular/core'

@Component({
    selector: 'dashboard',
    template: `Welcome to BeeTooBee
    <a routerLink="/offers">All Offers</a>
    <a routerLink="/offer-detail/1">First Offer</a>`
})

export class DashBoardComponent {
}