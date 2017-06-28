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
        let router: express.Router = express.Router();
        router.route('/requests')
            .get((req: any, res: any) => {
                this.requestRepository.getAllRequests(function (requests: Request[], error: String) {
                    if (error) {
                        res.status(400);
                        let transferObject = TransferObject.aTransferObjectForError(error);
                        res.json(transferObject);
                    } else {
                        let transferObject = TransferObject.aTransferObjectFor(requests);
                        res.json(transferObject);
                    }
                });
            });

        router.route('/requests/:id')
            .get((req: any, res: any) => {
                let requestUuid = req.params.id;
                this.requestRepository.getRequestWithId(requestUuid, function (request: Request, error: String) {
                    if (error) {
                        res.status(400);
                        let transferObject = TransferObject.aTransferObjectForError(error);
                        res.json(transferObject);
                    } else {
                        let transferObject = TransferObject.aTransferObjectFor(request);
                        res.json(transferObject);
                    }
                });
            });

        application.use(baseUrl, router);
    }
}