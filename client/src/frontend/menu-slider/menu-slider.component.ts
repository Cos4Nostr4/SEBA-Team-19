import {Component} from '@angular/core'
declare var jquery:any;
declare var $ :any;

@Component({
    selector: 'menu-slider',
    templateUrl: './menu-slider.component.html',
    styleUrls: [ './menu-slider.component.css' ]
})

export class MenuSliderComponent {

    ngOnInit(): void {
        "use strict";


        // manual carousel controls
        $('.carousel').carousel({
            interval: false
        });
        $('.next').click(function () {
            $('.carousel').carousel('next');
            return false;
        });
        $('.prev').click(function () {
            $('.carousel').carousel('prev');
            return false;
        });
    }

}
