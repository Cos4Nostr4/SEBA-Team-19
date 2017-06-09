import * as mongoose from "mongoose";
import {OfferRepository} from "./offer/offer-repository";

export class Database {
    private static instance: Database;
    private offerRepository: OfferRepository;

    private constructor() {
        let connection: mongoose.Connection = mongoose.createConnection("mongodb://localhost:27017/beetoobee");
        this.offerRepository = OfferRepository.createNewInstance(connection);
    }

    public static connect(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    public accessOfferRepository() {
        return this.offerRepository;
    }
}