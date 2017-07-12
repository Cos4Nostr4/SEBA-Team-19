import * as express from "express";
import {TransferObject} from "../transferobject/transfer-object";
import {InstagramRepository} from "./instagram-repository";
import InsSelfData from "../../../../client/src/frontend/data-objects/ins-user-data";
import InsUserData from "../../../../client/src/frontend/data-objects/ins-user-data";
import InsRecentMedia from "../../../../client/src/frontend/data-objects/ins-recent-media";


const BASE_PATH = "/instagram/";

export class InstagramRouter {
    private instagramRepository: InstagramRepository;

    constructor() {
        this.instagramRepository = new InstagramRepository();
    }


    public configureRoutes(baseUrl: string, application: express.Application) {
        let router: express.Router = express.Router();

        router.route(BASE_PATH + 'login/:access_token')
            .get((req, res) => {
                let accessToken = req.params.access_token;
                this.instagramRepository.login(accessToken, (error: any, userData: InsUserData) => {
                    if (error) {
                        res.status(400);
                        let transferObject = TransferObject.aTransferObjectForError(error);
                        res.json(transferObject);
                    } else {
                        let transferObject = TransferObject.aTransferObjectFor(userData);
                        res.json(transferObject)
                    }
                });
            });

        router.route(BASE_PATH + 'self/:access_token')
            .get((req, res) => {
                let accessToken = req.params.access_token;
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

        router.route(BASE_PATH + 'user/:username')
            .get((req, res) => {
                let username = req.params.username;
                this.instagramRepository.getUserData(username, (error: any, selfData: InsSelfData) => {
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

        router.route(BASE_PATH + 'media/:username')
            .get((req, res) => {
                let username = req.params.username;
                this.instagramRepository.getMostRecentMedia(username, (error: any, recentMedias: InsRecentMedia[]) => {
                    if (error) {
                        res.status(400);
                        let transferObject = TransferObject.aTransferObjectForError(error);
                        res.json(transferObject);
                    } else {
                        let transferObject = TransferObject.aTransferObjectFor(recentMedias);
                        res.json(transferObject)
                    }
                });
            });

        application.use(baseUrl, router);
    }

}