import * as mongoose from "mongoose";
import {DatabaseConnection} from "../../backend/database/database-connection";
import {NameToIdStorage} from "../name-to-id-storage";
import {companySchema} from "../../backend/company/company-schema";

const sampleCompanies = require('./sample-companies.json');

let connection: mongoose.Connection = mongoose.createConnection(DatabaseConnection.defaultConnection());
let Company: any = connection.model("Company", companySchema);

export async function deleteCompanyData(printLog?: any) {
    const companyDeletePromise = new Promise(resolve => Company.remove(function (err: any) {
        if (err) {
            console.log(err);
        } else {
            if (printLog) {
                console.log("Cleared Company database");
            }
            resolve(true);
        }
    }));
    await companyDeletePromise;
}


export async function resetCompanyData(companyIds: NameToIdStorage[], printLog?: any) {
    await deleteCompanyData(printLog);

    let i = 0;
    const companyPromise = new Promise(resolve => {
        for (let companyData of sampleCompanies) {
            let company = new Company(companyData);
            company.save(function (err: any) {
                if (err) {
                    console.log(err);
                } else {
                    companyIds.push({name: company.name, id: company._id});
                }

                if (++i == sampleCompanies.length) {
                    if (printLog) {
                        console.log("Stored " + i + " companies");
                    }
                    resolve(true);
                }
            })
        }
    });
    await  companyPromise;
}