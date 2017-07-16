import {Component, Input, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import InsUserData from "../../../data-objects/ins-user-data";
import InsRecentMedia from "../../../data-objects/ins-recent-media";
declare var $: any;

@Component({
    selector: "costs",
    templateUrl: "./costs.component.html",
    styleUrls: ["./costs.component.css"]
})
export class CostsComponent implements OnInit, OnChanges {
    @Input()
    userData: InsUserData;
    @Input()
    recentMedias: InsRecentMedia[];
    private costs: string;


    ngOnInit(): void {
        this.costs = this.calculateCosts(this.userData, this.recentMedias);
    }


    ngOnChanges(changes: SimpleChanges): void {
        this.costs = this.calculateCosts(this.userData, this.recentMedias);
    }

    private calculateCosts(userData: InsUserData, recentMedias: InsRecentMedia[]): string {
        if (userData && recentMedias) {
            let postEfficiency = this.calculatePostEfficiency(+userData.followerCount, recentMedias);
            let costs = Math.floor(postEfficiency * (+userData.followerCount) / 1000);
            return "$" +costs + ".00";
        } else {
            return "Calculating...";
        }
    }

    private calculatePostEfficiency(numberOfFollowers: number, recentMedias: InsRecentMedia[]):number {
        if(recentMedias.length == 0 || numberOfFollowers == 0){
            return 0;
        }

        let likesOverAllMedia = 0;
        recentMedias.forEach((recentMedias) => {
            likesOverAllMedia += recentMedias.numberOfLikes;
        });
        let averageLikesPerPicture = likesOverAllMedia / recentMedias.length;
        let postEfficiency = averageLikesPerPicture / numberOfFollowers;
        return postEfficiency;
    }
}