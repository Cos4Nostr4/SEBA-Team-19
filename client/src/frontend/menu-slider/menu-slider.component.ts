import {Component} from "@angular/core";
declare var jquery: any;
declare var $: any;

@Component({
    selector: 'menu-slider',
    templateUrl: './menu-slider.component.html',
    styleUrls: ['./menu-slider.component.css']
})

export class MenuSliderComponent {

    ngOnInit(): void {
        "use strict";

        const numberOfElementsShown = 8;
        const waitingElements:any = [];

        let numberOfEelements = $('.menu-item').length;
        let indexOfLastElement = numberOfEelements - 1;

        for(let i =numberOfElementsShown; i<numberOfEelements; i++){
            let waitingElement = $('.menu-item').eq(numberOfElementsShown);
            waitingElement.detach();
            waitingElements.push(waitingElement);
            console.log("Removed element. Remaining: "+$('.menu-item').length +"; Waiting: "+waitingElements.length);
        }

        $('#next').click(function () {
            console.log("Direction left.Remaining: "+$('.menu-item').length +"; Waiting: "+waitingElements.length);

            $('.active-menu').removeClass('active-menu');
            let firstElement = $('.menu-item').eq(0).detach();
            waitingElements.unshift(firstElement);

            let elementToAddBehind = waitingElements.pop();
            $('#slider').append(elementToAddBehind);
            $('.menu-item').eq(0).addClass('active-menu');
        });

        $('#last').click(function () {
            console.log("Direction right.Remaining: "+$('.menu-item').length +"; Waiting: "+waitingElements.length);
            $('.active-menu').removeClass('active-menu');
            let lastElement = $('.menu-item').last().detach();
            waitingElements.push(lastElement);

            let elementToAddInFront = waitingElements.shift();
            $('#slider').prepend(elementToAddInFront);
            $('.menu-item').eq(0).addClass('active-menu');
        });
    }

}
