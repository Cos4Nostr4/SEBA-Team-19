import * as mongoose from "mongoose";
import {CampaignRepository} from "../campaign/campaign-repository";
import {DatabaseConnection} from "./database-connection";
import {RequestRepository} from "../request/request-repository";
import {InfluencerRepository} from "../influencer/influencer-repository";
import {CompanyRepository} from "../company/company-repository";
import {CategoryRepository} from "../categories/category-repository";

export class Database {
    private static instance: Database;
    private campaignRepository: CampaignRepository;
    private requestRepository: RequestRepository;
    private inluencerRepository: InfluencerRepository;
    private companyRepository: CompanyRepository;
    private categoryRepository: CategoryRepository;

    private constructor() {
        let connection: mongoose.Connection = mongoose.createConnection(DatabaseConnection.defaultConnection());
        this.campaignRepository = CampaignRepository.createNewInstance(connection);
        this.requestRepository = RequestRepository.createNewInstance(connection);
        this.companyRepository = CompanyRepository.createNewInstance(connection);
        this.inluencerRepository = InfluencerRepository.createNewInstance(connection);
        this.categoryRepository = CategoryRepository.createNewInstance(connection);
    }

    public static connect(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    public accessCampaignRepository() {
        return this.campaignRepository;
    }

    public accessRequestRepository(): RequestRepository {
        return this.requestRepository;
    }

    public accessInfluencerRepository(): InfluencerRepository {
        return this.inluencerRepository;
    }

    public accessCompanyRepository(): CompanyRepository {
        return this.companyRepository;
    }

    public accessCategoryRepository(): CategoryRepository {
        return this.categoryRepository;
    }
}