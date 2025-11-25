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

  static get relationMappings(){
    return {
      roles:
      {
        relation: BaseModel.ManyToManyRelation,
        modelClass: "./Role.js",
        join: {
          from: "user_role.user_id",
          to: "user_role.role_id"
        },
        to: "roles.id",
      },
      permissions: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: "./Permission.js",
        join: {
          from: "users.id",
          through: {
            from: "user_permission.user_id",
            to: "user_permission.permission_id",
          },
          to: "permissions.id",
        },
      },
    };
  };
}
