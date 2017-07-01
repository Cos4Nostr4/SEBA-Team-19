import {NameToIdStorage} from "./name-to-id-storage";
import {resetCompanyData} from "./company/company-reset";
import {resetInfluencerData} from "./influencer/influencer-reset";
import {resetCampaignData} from "./campaign/campaign-reset";
import {resetRequestData} from "./request/request-reset";

(async function () {
    let companyIds: NameToIdStorage[] = [];
    await resetCompanyData(companyIds, {log: true});

    let campaignIds: NameToIdStorage[] = [];
    await resetCampaignData(campaignIds, companyIds, {log: true});

    let influencerIds: NameToIdStorage[] = [];
    await resetInfluencerData(influencerIds, {log: true});

    await resetRequestData(campaignIds, influencerIds, {log: true});
    process.exit(0);
}());

