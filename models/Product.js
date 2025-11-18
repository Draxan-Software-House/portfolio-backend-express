import { BaseModel } from "./BaseModel.js";

export default class Product extends BaseModel {
  static get tableName() {
    return "products";
  }

  static get relationMappings() {
    return {
      category: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: "./Category.js",
        join: {
          from: "products.category_id",
          to: "categories.id"
        }
      }
    };
  }
}
