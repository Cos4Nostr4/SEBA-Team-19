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

            // manual carousel controls
        $('.next').click(function(){ $('.carousel').carousel('next');return false; });
        $('.prev').click(function(){ $('.carousel').carousel('prev');return false; });
        $('#nextButton').click(function(){ $('.carousel').carousel('next');return false; });
        $('#lastButton').click(function(){ $('.carousel').carousel('prev');return false; });

    }
}