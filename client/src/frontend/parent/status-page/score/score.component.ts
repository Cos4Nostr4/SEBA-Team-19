

import {Component, Input, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import InsUserData from "../../../data-objects/ins-user-data";
import InsRecentMedia from "../../../data-objects/ins-recent-media";
declare var $:any;

@Component({
    selector: "score",
    templateUrl: "./score.component.html",
    styleUrls: ["./score.component.css"]
})
export class ScoreComponent implements OnInit, OnChanges{
    @Input()
    userData: InsUserData;
    @Input()
    recentMedias:InsRecentMedia[];
    private score: number;


    ngOnInit(): void {
        this.score = this.calculateScore(this.userData, this.recentMedias);
        console.log("calculatedScore: "+this.score);
    }


    ngOnChanges(changes: SimpleChanges): void {
        this.score = this.calculateScore(this.userData, this.recentMedias);
    }

    private calculateScore(userData: InsUserData, recentMedias: InsRecentMedia[]) {
        if(userData && recentMedias) {
            let scoreByFollower = this.calculateScoreByFollower(+userData.followerCount);
            let scoreByPostEfficiency = this.calculateScoreByPostEfficiency(+userData.followerCount, recentMedias);
            return Math.max(scoreByFollower, scoreByPostEfficiency);
        }else{
            return 1;
        }
    }

    private calculateScoreByFollower(followerCount: number) {
        if(followerCount > 1000000){
            return 5;
        }
        if(followerCount > 100000){
            return 4;
        }
        if(followerCount > 1000){
            return 3;
        }
        if(followerCount > 100){
            return 2;
        }
        return 1;
    }

    private calculateScoreByPostEfficiency(numberOfFollowers:number, recentMedias: InsRecentMedia[]) {
        let followersOverAllMedia = 0;
        recentMedias.forEach((recentMedias)=>{
            followersOverAllMedia += recentMedias.numberOfLikes;
        });
        let averageLikesPerPicture = followersOverAllMedia/recentMedias.length;
        let postEfficency = averageLikesPerPicture/numberOfFollowers;

        if(postEfficency > 0.5){
            return 5;
        }
        if(postEfficency > 0.4){
            return 4;
        }
        if(postEfficency > 0.3){
            return 3;
        }
        if(postEfficency > 0.2){
            return 2;
        }
        return 1;
    }
}