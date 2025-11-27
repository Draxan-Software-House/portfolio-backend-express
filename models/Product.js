import { BaseModel } from "./BaseModel.js";
import Category from "./Category.js";

export default class Product extends BaseModel {
  static get tableName() {
    return "products";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "price", "stock", "category_id"],

      properties: {
        id: { type: "integer" },
        name: { type: "string", minLength: 3, maxLength: 100 },
        price: { type: "integer" },
        stock: { type: "integer" },
        category_id: { type: "integer" }
      }
    };
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
