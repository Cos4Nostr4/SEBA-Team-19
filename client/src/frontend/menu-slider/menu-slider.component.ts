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

        const numberOfElementsShownInitially: number = 8;
        const waitingElements: any = [];
        const minimumWidhtOfElementsInPixel: number = 200;

        let numberOfEelements = $('.menu-item').length;

        removeNotShownElements(numberOfEelements - numberOfElementsShownInitially);

        $('#next').click(function () {
            console.log("Direction left.Remaining: " + $('.menu-item').length + "; Waiting: " + waitingElements.length);

            $('.active-menu').removeClass('active-menu');
            slideLeft();
            $('.contentwrapper').eq(0).addClass('active-menu');
        });

        $('#last').click(function () {
            console.log("Direction right.Remaining: " + $('.menu-item').length + "; Waiting: " + waitingElements.length);
            $('.active-menu').removeClass('active-menu');
            slideRight();
            $('.contentwrapper').eq(0).addClass('active-menu');
        });

        $(window).bind('resize', function (e: any) {
            let menuSliderWidth = $('#menu-slider-container').width();
            console.log("Div resized to width of :" + menuSliderWidth);

            let numberOfElementsToShow = Math.floor(menuSliderWidth / minimumWidhtOfElementsInPixel);

            let numbeOfItems = $('.menu-item').length;
            if(numberOfElementsToShow < numbeOfItems) {
                let numberOfElementsToRemove = numbeOfItems - numberOfElementsToShow;
                removeNotShownElements(numberOfElementsToRemove);
            }

            if(numberOfElementsToShow > numbeOfItems) {
                addElementsToShow(numberOfElementsToShow - numbeOfItems);
            }
        });

        function removeNotShownElements(numberOfElements: number) {
            for (let i = 0; i < numberOfElements; i++) {
                let waitingElement = $('.menu-item').last();
                waitingElement.detach();
                waitingElements.push(waitingElement);
                console.log("Removed element. Remaining: " + $('.menu-item').length + "; Waiting: " + waitingElements.length);
            }
        }

        function addElementsToShow(numberOfElementsToAdd: number) {
            for(let i = 0; i < numberOfElementsToAdd; i++){
                let elementToAddBehind = waitingElements.pop();
                $('#slider').append(elementToAddBehind);
            }
        }

        function slideRight() {
            let lastElement = $('.menu-item').last().detach();
            waitingElements.push(lastElement);

            let elementToAddInFront = waitingElements.shift();
            $('#slider').prepend(elementToAddInFront);
        }

        function slideLeft() {
            let firstElement = $('.menu-item').eq(0).detach();
            waitingElements.unshift(firstElement);

            let elementToAddBehind = waitingElements.pop();
            $('#slider').append(elementToAddBehind);
        }
    }

}
