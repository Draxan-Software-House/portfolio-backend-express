import { BaseModel } from "./BaseModel.js";
import Project from "./Project.js";

export default class Tag extends BaseModel {
  static get tableName() {
    return "tags";
  }

  static get relationMappings() {
    return {
      projects: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: Project,
        join: {
          from: "tags.id",
          through: {
            from: "project_tag.tag_id",
            to: "project_tag.project_id",
          },
          to: "projects.id",
        },
      },
    };
  }
}
