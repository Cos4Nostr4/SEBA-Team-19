import {DBCompany} from "../company/db-company";
import {DBCategory} from "../categories/db-category";
export interface DBCampaign {
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
    categories:[DBCategory]
    stillRunning: boolean
}