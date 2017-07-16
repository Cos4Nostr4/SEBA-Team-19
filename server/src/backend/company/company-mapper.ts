import {DBCompany} from "./db-company";
import {Company} from "../../../../client/src/frontend/data-objects/company";
export class CompanyMapper {

    public static mapAll(dbCompanies: DBCompany[]): Company[] {
        let companies = [];
        for (let dbCompany of dbCompanies) {
            companies.push(this.map(dbCompany))
        }
        return companies;
    }

    public static map(dbCompany: DBCompany): Company {
        return new Company(dbCompany.uuid, dbCompany.name, dbCompany.username, dbCompany.password, dbCompany.email, dbCompany.profilPicture,
            dbCompany.contact, dbCompany.address, dbCompany.paymentInformation, dbCompany.taxInformation, dbCompany.verified);
    }

    static mapToDbObject(company: Company): DBCompany {
        return new DBCompany(company.uuid, company.name, company.username, company.password, company.email, company.profilPicture, company.contact,
            company.address, company.paymentInformation, company.taxInformation, company.verified);
    }
}