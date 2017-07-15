import * as express from "express";
import * as multer from "multer";
import {TransferObject} from "../transferobject/transfer-object";

const MAX_IMAGE_SIZE_IN_MB = 50;

export class ImageRouter {

    constructor() {
    }


    public configureRoutes(baseUrl: string, application: express.Application, uploadUrl: string) {
        let router: express.Router = express.Router();

        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, uploadUrl);
            },
            filename: function (req, file, cb) {
                cb(null, file.originalname);
            }
        });

        const upload = multer({storage: storage});

        router.post('/upload', upload.single('picture'), async (req, res) => {
            let file = req.file;
            let imageVerification: { isValid: boolean, error: string } = this.verifyImage(file);
            if (imageVerification.isValid) {
                let transferObject = TransferObject.aTransferObjectFor(file.filename);
                res.json(transferObject);
            } else {
                res.status(400);
                let transferObject = TransferObject.aTransferObjectForError(imageVerification.error);
                res.json(transferObject);
            }
        });
        application.use(baseUrl, router);
    }

    public verifyImage( file: any): { isValid: boolean, error: string } {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return {isValid:false, error: "Only image files are allowed!"}
        }

        let fileSize = +file.size;
        if (fileSize > MAX_IMAGE_SIZE_IN_MB*1024*1024) {
            return {isValid:false, error: "Image should be smaller than "+MAX_IMAGE_SIZE_IN_MB+"mb"};
        }

        return {isValid:true, error:null};
    }
}