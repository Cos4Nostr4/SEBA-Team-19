import {Component, Input, OnInit} from "@angular/core";
import InsRecentMedia from "../../../data-objects/ins-recent-media";

declare var $:any;

@Component({
    selector: "recent-media",
    templateUrl: "./recent-media.component.html",
    styleUrls: ["./recent-media.component.css"]
})
export class RecentMediaComponent implements OnInit {
    @Input()
    recentMedia: InsRecentMedia;


    ngOnInit(): void {

    }
}