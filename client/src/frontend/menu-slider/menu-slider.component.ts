import {Component, OnInit} from "@angular/core";
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";
declare var jquery: any;
declare var $: any;


const NUMBER_OF_ELEMENTS_INITIALLY_SHOWN: number = 8;
const MINIMUM_WIDHT_OF_ELEMENTS: number = 200;

@Component({
    selector: 'menu-slider',
    templateUrl: './menu-slider.component.html',
    styleUrls: ['./menu-slider.component.css'],
    providers: [AuthenticationService]
})
export class MenuSliderComponent implements OnInit {
    private authenticationService: AuthenticationService;
    private waitingElements: any[];
    private router: Router;

    constructor(authenticationService: AuthenticationService, router: Router) {
        this.authenticationService = authenticationService;
        this.waitingElements = [];
        this.router = router;
    }

    ngOnInit(): void {
        "use strict";

        if (this.authenticationService.isLoggedIn()) {
            this.registerOnClickHandlerForMenuItems();
        }


        let numberOfElements = $('.menu-item').length;
        let numberOfElementsToHide = numberOfElements - NUMBER_OF_ELEMENTS_INITIALLY_SHOWN;
        this.removeNotShownElements(numberOfElementsToHide);

        $(window).bind('resize', () => {
            this.adaptNumberOfElementsShownToWindowSize();
        });

        if (this.authenticationService.isLoggedIn()) {
            this.registerOnLickHandlerForSliderButtons();
        }
    }

    private adaptNumberOfElementsShownToWindowSize() {
        let menuSliderWidth = $('#menu-slider-container').width();
        let numberOfElementsToShow = Math.floor(menuSliderWidth / MINIMUM_WIDHT_OF_ELEMENTS);
        let numberOfItems = $('.menu-item').length;

        if (numberOfElementsToShow < numberOfItems) {
            let numberOfElementsToRemove = numberOfItems - numberOfElementsToShow;
            this.removeNotShownElements(numberOfElementsToRemove);
        }

        if (numberOfElementsToShow > numberOfItems) {
            let numberOfElementsToAdd = numberOfElementsToShow - numberOfItems;
            this.addElementsToShow(numberOfElementsToAdd);
        }
    }

    private registerOnLickHandlerForSliderButtons() {
        $('#next').click(() => {
            $('.active-menu').removeClass('active-menu');
            this.slideLeft();
            $('.contentwrapper').eq(0).addClass('active-menu');
        });

        $('#last').click(() => {
            $('.active-menu').removeClass('active-menu');
            this.slideRight();
            $('.contentwrapper').eq(0).addClass('active-menu');
        });
    }

    private removeNotShownElements(numberOfElements: number) {
        for (let i = 0; i < numberOfElements; i++) {
            let waitingElement = $('.menu-item').last();
            waitingElement.detach();
            this.waitingElements.push(waitingElement);
        }
    }

    private addElementsToShow(numberOfElementsToAdd: number) {
        for (let i = 0; i < numberOfElementsToAdd; i++) {
            let elementToAddBehind = this.waitingElements.pop();
            $('#slider').append(elementToAddBehind);
        }
    }

    private slideRight() {
        let lastElement = $('.menu-item').last()
        lastElement.detach();
        this.waitingElements.push(lastElement);

        let elementToAddInFront = this.waitingElements.shift();
        $('#slider').prepend(elementToAddInFront);
    }

    private slideLeftTimes(times: number) {
        for (let i = 0; i < times; i++) {
            this.slideLeft();
        }
    }

    private slideLeft() {
        let firstElement = $('.menu-item').eq(0)
        firstElement.detach();
        this.waitingElements.unshift(firstElement);
        let elementToAddBehind = this.waitingElements.pop();
        $('#slider').append(elementToAddBehind);
    }

    private registerOnClickHandlerForMenuItems() {
        for (let i = 0; i < $('.menu-item').length; i++) {
            let clickedElement = $('.menu-item').eq(i);
            clickedElement.click(() => {
                let index = $('.menu-item').index(clickedElement);
                $('.active-menu').removeClass('active-menu');
                this.slideLeftTimes(index);
                $('.contentwrapper').eq(0).addClass('active-menu');

                this.router.navigateByUrl("categories/" + i);
            });
        }
    }
}
