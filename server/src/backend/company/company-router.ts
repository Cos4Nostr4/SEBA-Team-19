import {Database} from "../database/database";
import {CompanyRepository} from "./company-repository";
import * as express from "express";
import {TransferObject} from "../transferobject/transfer-object";
import {Company} from "../../../../client/src/frontend/data-objects/company";

export class CompanyRouter {
    private database: Database;
    private companyRepository: CompanyRepository;

    constructor() {
        this.database = Database.connect();
        this.companyRepository = this.database.accessCompanyRepository();
    }


    public configureRoutes(baseUrl: string, application: express.Application) {
        let companyRepository: CompanyRepository = this.companyRepository;

        let router: express.Router = express.Router();
        router.route('/companies')
            .get(function (req, res) {
                companyRepository.getAllCompanies(function (companies: Company[], error: any) {
                    if (error) {
                        res.status(400);
                        let transferObject = TransferObject.aTransferObjectForError(error);
                        res.json(transferObject);
                    } else {
                        let transferObject = TransferObject.aTransferObjectFor(companies);
                        res.json(transferObject);
                    }
                });
            });

        router.route('/companies/:id')
            .get(function (req, res) {
                let companyUuid = req.params.id;
                companyRepository.getCompanyWithId(companyUuid, function (company: Company, error: any) {
                    if (error) {
                        res.status(400);
                        let transferObject = TransferObject.aTransferObjectForError(error);
                        res.json(transferObject);
                    } else {
                        let transferObject = TransferObject.aTransferObjectFor(company);
                        res.json(transferObject);
                    }
                });
            });

        application.use(baseUrl, router);
    }
}