import {IOffer} from "./offer";
import { Document } from "mongoose";

export interface IOfferRepository extends IOffer, Document{

}