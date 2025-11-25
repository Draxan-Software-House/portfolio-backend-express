import { BaseModel } from "./BaseModel.js";

export default class Permission extends BaseModel {
  static get tableName() {
    return "permissions";
  }
}