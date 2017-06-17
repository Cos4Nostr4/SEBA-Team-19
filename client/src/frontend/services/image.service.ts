import {Injectable} from "@angular/core";
import {Config} from "../config/config";

@Injectable()
export class ImageService {
    private imageBaseUrl: string;

    constructor() {
        this.imageBaseUrl = Config.backend_address + ":" + Config.backend_port + "/media/images/";
    }

    public getOfferPreviewUrlFor(imageName: string):string{
        return this.imageBaseUrl + imageName;
    }
}