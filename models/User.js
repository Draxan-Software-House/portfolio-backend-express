import { BaseModel } from "./BaseModel.js";

export default class User extends BaseModel {
  static get tableName() {
    return "users";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["email", "password"],

      properties: {
        id: { type: "integer" },
        email: { type: "string" },
        password: { type: "string" },
        name: { type: "string" },
        email_verified_at: { type: ["string", "null"] }
      }
    };
  }
}
