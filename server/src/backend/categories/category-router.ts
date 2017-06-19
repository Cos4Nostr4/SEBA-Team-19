import * as express from "express";
import {Database} from "../database/database";
import {TransferObject} from "../transferobject/transfer-object";
import {Offer} from "../../../../client/src/frontend/data-objects/offer";
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
        let categoryRepository: CategoryRepository = this.categoryRepository;

        let router: express.Router = express.Router();
        router.route('/categories/:category')
            .get(function (req, res) {

                let categoryAsString: string = req.params.category;
                let category: DBCategory = DBCategory[categoryAsString.toUpperCase()];
                categoryRepository.getAllOffersForCategory(category, function (offers: Offer[]) {
                    let transferObject = TransferObject.aTransferObjectFor(offers);
                    res.json(transferObject);
                });
            });

        application.use(baseUrl, router);
    }
}