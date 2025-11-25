import {BaseModel} from './BaseModel.js';
import Permission from "./Permission.js";
import User from './User.js';
 
export default class Role extends BaseModel {
  static get tableName() {
    return "roles";
  }

  static get relationMappings(){
    return {
      permissions:{
        relation: BaseModel.ManyToManyRelation,
        modelClass: Permission,
        join: {
          from: "roles.id",
          through: {
            from: "permission_role.role_id",
            to: "permission_role.permission_id",
          },
          to: "permissions.id"
        }
      },
      users:{
        relation: BaseModel.ManyToManyRelation,
        modelClass: User,
        join: {
          from: "roles.id",
          through: {
            from: "user_role.role_id",
            to: "user_role.user_id",
          },
          to: "users.id"
        }
      },
      
    }
  }
}