import {NameToIdStorage} from "./name-to-id-storage";
import {resetCompanyData} from "./company/company-reset";
import {resetInfluencerData} from "./influencer/influencer-reset";
import {resetCampaignData} from "./campaign/campaign-reset";
import {resetRequestData} from "./request/request-reset";

export async function resetDatabase(printLog?: any) {
    let companyIds: NameToIdStorage[] = [];
    await resetCompanyData(companyIds, printLog);

    let campaignIds: NameToIdStorage[] = [];
    await resetCampaignData(campaignIds, companyIds, printLog);

    let influencerIds: NameToIdStorage[] = [];
    await resetInfluencerData(influencerIds, printLog);

    await resetRequestData(campaignIds, influencerIds, printLog);
}

