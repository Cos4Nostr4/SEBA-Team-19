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
        return new Company(dbCompany.uuid, dbCompany.name, dbCompany.username, dbCompany.password, dbCompany.profilPicture,
            dbCompany.contact, dbCompany.address, dbCompany.paymentInformation, dbCompany.taxInformation, dbCompany.verified);
    }
}