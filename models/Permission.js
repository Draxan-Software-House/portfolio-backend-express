import { BaseModel } from "./BaseModel.js";
import User from './User.js';
import Role from "./Role.js";
export default class Permission extends BaseModel {
  static get tableName() {
    return "permissions";
  }

  static get jsonSchema(){
    return {
      type: "object",
      required: ["name"],

      properties: {
        id: {type: "integer"},
        name: { type: "string", minLength: 3, maxLength: 100 }
      }
    }
  }

  static get relationMappings(){
    return {
      roles:
      {
        relation: BaseModel.ManyToManyRelation,
        modelClass: Role,
        join: {
          from: "role_permission.permission_id",
          to: "role_permission.role_id"
        },
        to: "roles.id",
      },
      users:{
        relation: BaseModel.ManyToManyRelation,
        modelClass: User,
        join: {
          from: "roles.id",
          through: {
            from: "user_permission.permission_id",
            to: "user_permission.user_id",
          },
          to: "users.id"
        }
      },
    };
  }
}