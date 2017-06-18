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

        let numberOfEelements = $('.col').length;
        let indexOfLastElement = numberOfEelements -1;

        $('#next').click(function(){
            let firstElement = $('.col').eq(0).detach();
            $('#slider').append(firstElement);
        });

        $('#last').click(function(){
            let firstElement = $('.col').eq(indexOfLastElement).detach();
            $('#slider').prepend(firstElement);
        });
    }

}
