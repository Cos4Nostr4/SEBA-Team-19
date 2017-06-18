import {Component, OnInit} from '@angular/core'
declare var jquery:any;
declare var $ :any;

@Component({
    selector: 'categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.css']
})

export class CategoriesComponent implements OnInit {


    ngOnInit(): void {
            "use strict";

        $('#carouselExample').on('slide.bs.carousel', function (e:any) {

            var $e = $(e.relatedTarget);
            var idx = $e.index();
            var itemsPerSlide = 3;
            var totalItems = $('.carousel-item').length;

            if (idx >= totalItems-(itemsPerSlide-1)) {
                var it = itemsPerSlide - (totalItems - idx);
                for (var i=0; i<it; i++) {
                    // append slides to end
                    if (e.direction=="left") {
                        $('.carousel-item').eq(i).appendTo('.carousel-inner');
                    }
                    else {
                        $('.carousel-item').eq(0).appendTo('.carousel-inner');
                    }
                }
            }
        });

    }
}