import {DBCompany} from "./db-company";
import {Document, Model} from "mongoose";
import * as mongoose from "mongoose";
import {companySchema} from "./company-schema";
import {Company} from "../../../../client/src/frontend/data-objects/company";
import {CompanyMapper} from "./company-mapper";

export interface ICompanyRepository extends DBCompany, Document {

}

export class CompanyRepository {
    private model: Model<ICompanyRepository>;


    private constructor(model: Model<ICompanyRepository>) {
        this.model = model;
    }

    public static createNewInstance(connection: mongoose.Connection): CompanyRepository {
        let model: Model<ICompanyRepository> = connection.model<ICompanyRepository>("Company", companySchema);
        return new CompanyRepository(model);
    }

    public getAllCompanies(func: Function) {
        this.model.find(function (err: any, dbCompanies: DBCompany[]) {
            let companies: Company[] = CompanyMapper.mapAll(dbCompanies);
            func(companies);
        });
    }

    public getCompanyWithId(companyUuid:string, func: Function) {
        this.model.findOne({'uuid':companyUuid}, function (err: any, dbCompany: DBCompany) {
            let company: Company = CompanyMapper.map(dbCompany);
            func(company);
        });
    }
}