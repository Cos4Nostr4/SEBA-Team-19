import mongoose = require("mongoose");
import {Config} from "../../../../client/src/frontend/config/config";

mongoose.Promise = global.Promise;

export class DatabaseConnection {
    private static MONGO_DB_PREFIX: string = "mongodb://";
    private value: string;


    private constructor() {
        this.value = DatabaseConnection.MONGO_DB_PREFIX + Config.database_url+":"+Config.database_port+"/"+Config.database_name;
    }

    public static defaultConnection(): string{
        return new DatabaseConnection().value;
    }
}