import * as express from "express"
import * as bodyParser from "body-parser";


export class App{
    public application: express.Application;

    public static bootstrap(): express.Application {
        return new App().application;
    }


    constructor() {
        this.application = express();

        this.configure();
        this.registerRoutes();
    }

    private configure() {
        this.application.use(bodyParser.json());
        this.application.use(bodyParser.urlencoded({
            extended:true
        }));
        this.application.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
            err.status = 404;
            next(err);
        });
    }

    private registerRoutes() {
        let router: express.Router = express.Router();

        router.route('/')
            .get(function (req, res) {
                res.end("Success!");
            });

        this.application.use(router);
    }
}