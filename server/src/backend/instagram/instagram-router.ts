import * as express from "express";
import {TransferObject} from "../transferobject/transfer-object";
import {InstagramRepository} from "./instagram-repository";
import InsSelfData from "../../../../client/src/frontend/data-objects/ins-self-data";


const BASE_PATH = "/instagram/";

const accessToken = '2373977626.1083168.2649465661074f9797367524727b92d9';
export class InstagramRouter {
    private instagramRepository: InstagramRepository;

    constructor() {
        this.instagramRepository = new InstagramRepository();
    }


    public configureRoutes(baseUrl: string, application: express.Application) {
        let router: express.Router = express.Router();

        router.route(BASE_PATH + 'login')
            .get((req, res) => {
                //let accessToken: any = req.body.data;
                this.instagramRepository.login(accessToken,(error: any, selfData: InsSelfData) => {
                    if (error) {
                        res.status(400);
                        let transferObject = TransferObject.aTransferObjectForError(error);
                        res.json(transferObject);
                    } else {
                        let transferObject = TransferObject.aTransferObjectFor(selfData);
                        res.json(transferObject)
                    }
                });
            });

        router.route(BASE_PATH + 'self')
            .get((req, res) => {
                this.instagramRepository.getSelfData(accessToken, (error: any, selfData: InsSelfData) => {
                    if (error) {
                        res.status(400);
                        let transferObject = TransferObject.aTransferObjectForError(error);
                        res.json(transferObject);
                    } else {
                        let transferObject = TransferObject.aTransferObjectFor(selfData);
                        res.json(transferObject)
                    }
                });
            });

        application.use(baseUrl, router);
    }

}