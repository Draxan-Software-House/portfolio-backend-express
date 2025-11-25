import {BaseModel} from './BaseModel.js';
 
export default class Role extends BaseModel {
  static get tableName() {
    return "roles";
  }

  static get relationMappings(){
    return {
      permissions:{
        relation: BaseModel.ManyToManyRelation,
        modelClass: "./Permission.js",
        join: {
          from: "roles.id",
          through: {
            from: "permission_role.role_id",
            to: "permission_role.permission_id",
          },
          to: "permissions.id"
        }
      }
    }
  }
}