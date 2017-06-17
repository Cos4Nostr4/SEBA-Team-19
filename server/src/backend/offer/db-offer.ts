import {DBCompany} from "../company/db-company";
import {Category} from "../categories/db-category";
export interface DBOffer {
    uuid: string;
    title: string;
    description: string
    image: string
    company: DBCompany,
    amount: number
    requiredNumberOfFollowers: number
    enforcedHashTags: Array<string>
    startDate: Date
    endDate: Date
    categories:[Category]
    stillRunning: boolean
}