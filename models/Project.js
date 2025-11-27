import { BaseModel } from "./BaseModel.js";
import Tag from "./Tag.js";

export default class Project extends BaseModel {
  static get tableName() {
    return "projects";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["title"],

      properties: {
        id: { type: "integer" },
        title: { type: "string", minLength: 3, maxLength: 100 },
        description: { type: ["string", "null"] }
      }
    };
  }

  static get relationMappings() {
    return {
      tags: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: Tag,
        join: {
          from: "projects.id",
          through: {
            from: "project_tag.project_id",
            to: "project_tag.tag_id",
          },
          to: "tags.id",
        },
      },
    };
  }
}
