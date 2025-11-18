import { BaseModel } from "./BaseModel.js";

export default class Category extends BaseModel {
  static get tableName() {
    return "categories";
  }

  static get relationMappings() {
    return {
      products: {
        relation: BaseModel.HasManyRelation,
        modelClass: "./Product.js",
        join: {
          from: "categories.id",
          to: "products.category_id"
        }
      }
    };
  }
}
