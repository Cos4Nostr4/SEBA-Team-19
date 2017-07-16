import {Injectable} from "@angular/core";
import {Config} from "../config/config";

@Injectable()
export class ImageService {
    private imageBaseUrl: string;

    constructor() {
        this.imageBaseUrl = Config.backend_address + ":" + Config.backend_port + Config.backend_media_url;
    }

    public getImageUrlForName(imageName: string): string {
        return this.imageBaseUrl + "/" + imageName;
    }

    public getImageUrlForProductName(imageName: string): string {
        return this.imageBaseUrl + "/products/" + imageName;
    }
}