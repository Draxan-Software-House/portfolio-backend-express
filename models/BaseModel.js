import { Model } from "objection";
import { db } from "../db/knex.js";

Model.knex(db);

export class BaseModel extends Model {};