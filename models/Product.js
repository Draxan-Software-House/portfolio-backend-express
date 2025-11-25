import { BaseModel } from "./BaseModel.js";
import Category from "./Category.js";

export default class Product extends BaseModel {
  static get tableName() {
    return "products";
  }

  static get relationMappings() {
    return {
      category: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Category,
        join: {
          from: "products.category_id",
          to: "categories.id"
        }
      }
    };
  }
}
