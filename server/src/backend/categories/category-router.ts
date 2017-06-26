import * as express from "express";
import {Database} from "../database/database";
import {TransferObject} from "../transferobject/transfer-object";
import {Campaign} from "../../../../client/src/frontend/data-objects/campaign";
import {CategoryRepository} from "./category-repository";
import {DBCategory} from "./db-category";

export class CategoryRouter {
    private database: Database;
    private categoryRepository: CategoryRepository;

    constructor() {
        this.database = Database.connect();
        this.categoryRepository = this.database.accessCategoryRepository();
    }


    public configureRoutes(baseUrl: string, application: express.Application) {
        let router: express.Router = express.Router();
        router.route('/categories/:category')
            .get((req, res) => {

                let categoryAsString: string = req.params.category;
                let category: DBCategory = DBCategory[categoryAsString.toUpperCase()];
                this.categoryRepository.getAllCampaignsForCategory(category, function (campaigns: Campaign[]) {
                    let transferObject = TransferObject.aTransferObjectFor(campaigns);
                    res.json(transferObject);
                });
            });

        application.use(baseUrl, router);
    }
}