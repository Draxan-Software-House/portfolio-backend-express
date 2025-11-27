import { BaseModel } from "./BaseModel.js";
import Product from "./Product.js";

export default class Category extends BaseModel {
  static get tableName() {
    return "categories";
  }

  static get jsonSchema(){
    return {
      type: "object",
      required: ["name"],

      properties: {
        id: { type: "integer" },
        name: { type: "string", minLength: 3, maxLength: 50 },
      }
    }
  }

  static get relationMappings() {
    return {
      products: {
        relation: BaseModel.HasManyRelation,
        modelClass: Product,
        join: {
          from: "categories.id",
          to: "products.category_id"
        }
      }
    };
  }
}
