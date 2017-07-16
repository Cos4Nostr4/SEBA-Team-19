import {Component, Input, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import InsUserData from "../../../data-objects/ins-user-data";
import InsRecentMedia from "../../../data-objects/ins-recent-media";
declare var $: any;

@Component({
    selector: "score",
    templateUrl: "./score.component.html",
    styleUrls: ["./score.component.css"]
})
export class ScoreComponent implements OnInit, OnChanges {
    @Input()
    userData: InsUserData;
    @Input()
    recentMedias: InsRecentMedia[];
    private score: number;


    ngOnInit(): void {
        this.score = this.calculateInfluence(this.userData, this.recentMedias);
    }


    ngOnChanges(changes: SimpleChanges): void {
        this.score = this.calculateInfluence(this.userData, this.recentMedias);
    }

    private calculateInfluence(userData: InsUserData, recentMedias: InsRecentMedia[]) {
        if (userData && recentMedias) {
            let followerCount = +userData.followerCount;
            let postEfficiency = this.calculatePostEfficiency(followerCount, recentMedias);
            return Math.floor(postEfficiency * followerCount);
        } else {
            return 0;
        }
    }

    private calculatePostEfficiency(numberOfFollowers: number, recentMedias: InsRecentMedia[]): number {
        if (recentMedias.length == 0 || numberOfFollowers == 0) {
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