import {DBCompany} from "../company/db-company";
export interface DBOffer {
    uuid: string;
    title: string;
    description: string
    image: string
    company: string,
    amount: number
    requiredNumberOfFollowers: number
    enforcedHashTags: Array<string>
    startDate: Date
    endDate: Date
    stillRunning: boolean
}