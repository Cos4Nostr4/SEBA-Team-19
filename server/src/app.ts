import {CampaignRouter} from "./backend/campaign/campaign-router";
import {Config} from "../../client/src/frontend/config/config";
import * as express from "express";
import * as bodyParser from "body-parser";
import {RequestRouter} from "./backend/request/request-router";
import {InfluencerRouter} from "./backend/influencer/influencer-router";
import {CompanyRouter} from "./backend/company/company-router";
import {CategoryRouter} from "./backend/categories/category-router";
import {InstagramRouter} from "./backend/instagram/instagram-router";

export class App {
    private _application: express.Application;
    private baseUrl: string;

    public static bootstrap(): express.Application {
        let app = new App();
        app.configure();
        app.registerRoutes();
        return app._application;
    }


    constructor() {
        this._application = express();
        this.baseUrl = Config.backend_base_url;
    }

    private configure() {
        this._application.use(bodyParser.json());
        this._application.use(bodyParser.urlencoded({
            extended: true
        }));
        this._application.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
            err.status = 404;
            next(err);
        });
        this._application.use(function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            res.header('Access-Control-Allow-Headers', 'Content-Type');

            next();
        })
    }

    private registerRoutes() {
        let router: express.Router = express.Router();

        //TODO: maybe remove this one or redirect
        router.route('/')
            .get(function (req, res) {
                res.end("Success!");
            });

        this._application.use('/media/images/', express.static(__dirname +'/media'));
        this._application.use(router);

        let campaignRouter: CampaignRouter = new CampaignRouter();
        campaignRouter.configureRoutes(this.baseUrl, this._application);

        let requestRouter: RequestRouter = new RequestRouter();
        requestRouter.configureRoutes(this.baseUrl, this._application);

        let influencerRouter: InfluencerRouter = new InfluencerRouter();
        influencerRouter.configureRoutes(this.baseUrl, this._application);

        let companyRouter: CompanyRouter = new CompanyRouter();
        companyRouter.configureRoutes(this.baseUrl, this._application);

        let categoryRouter = new CategoryRouter();
        categoryRouter.configureRoutes(this.baseUrl, this._application);

        let instagramRouter = new InstagramRouter();
        instagramRouter.configureRoutes(this.baseUrl, this._application);
    }


    public get application(): express.Application {
        return this._application;
    }
}