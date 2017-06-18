import * as express from "express";
import {Database} from "../database/database";
import {RequestRepository} from "./request-repository";
import {TransferObject} from "../transferobject/transfer-object";

export class RequestRouter {
    private database: Database;
    private requestRepository: RequestRepository;

    constructor() {
        this.database = Database.connect();
        this.requestRepository = this.database.accessRequestRepository();
    }


    public configureRoutes(baseUrl: string, application: express.Application) {
        let requestRepository: RequestRepository = this.requestRepository;

        let router: express.Router = express.Router();
        router.route('/requests')
            .get(function (req:any, res:any) {
                requestRepository.getAllRequests(function (request: Request[]) {
                    let transferObject = TransferObject.aTransferObjectFor(request);
                    res.json(transferObject);
                });
            });

        router.route('/requests/:id')
            .get(function (req:any, res:any) {
                let requestUuid = req.params.id;
                requestRepository.getRequestWithId(requestUuid, function (request: Request) {
                    let transferObject = TransferObject.aTransferObjectFor(request);
                    res.json(transferObject);
                });
            });

        application.use(baseUrl, router);
    }
}