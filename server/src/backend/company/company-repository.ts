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
        this.model.find()
            .sort('uuid')
            .exec(function (err: any, dbCompanies: DBCompany[]) {
            let companies: Company[] = CompanyMapper.mapAll(dbCompanies);
            func(companies, null);
        });
    }

    public getCompanyWithId(companyUuid:string, func: Function) {
        this.model.findOne({'uuid':companyUuid}, function (err: any, dbCompany: DBCompany) {
            if(dbCompany) {
                let company: Company = CompanyMapper.map(dbCompany);
                func(company, null);
            }else{
                let errorMessage = "Cannot find Company for id '"+companyUuid+"'";
                func(null, errorMessage);
            }
        });
    }

    public addCompany(company: Company, func: Function){
        let companyId = company.uuid;
        this.model.findOne({'uuid':companyId}, (err: any, dbCompany: DBCompany)=> {
            if(dbCompany) {
                let errorMessage = "Company for id '"+companyId+"' already exists.";
                func(null, errorMessage);
            }else{
                let dbCompany:DBCompany = CompanyMapper.mapToDbObject(company);
                let companyModel = new this.model(dbCompany);
                companyModel.save((err: any) =>{
                    if(err) {
                        func(null, err);
                    }else{
                        func(companyModel, null);
                    }
                })
            }
        });
    }
}