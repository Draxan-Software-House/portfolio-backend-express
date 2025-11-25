// ./validators/validate.js
import db from "../config/db.js";

export default async function validate(data, rules) {
  const errors = {};

  for (const field in rules) {
    const value = data[field];
    const fieldRules = rules[field].split("|");

    for (const rule of fieldRules) {
      // required
      if (rule === "required") {
        if (value === undefined || value === null || value === "") {
          errors[field] = `${field} is required`;
          continue;
        }
      }

      // string
      if (rule === "string" && value && typeof value !== "string") {
        errors[field] = `${field} must be a string`;
      }

      // integer
      if (rule === "integer" && value && isNaN(Number(value))) {
        errors[field] = `${field} must be an integer`;
      }

      // email
      if (rule === "email" && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          errors[field] = `${field} must be a valid email address`;
        }
      }

      // min:x
      if (rule.startsWith("min:")) {
        const minVal = Number(rule.split(":")[1]);
        if (value && value.length < minVal) {
          errors[field] = `${field} must be at least ${minVal} characters`;
        }
      }

      // max:x
      if (rule.startsWith("max:")) {
        const maxVal = Number(rule.split(":")[1]);
        if (value && value.length > maxVal) {
          errors[field] = `${field} may not be greater than ${maxVal} characters`;
        }
      }

      // exists:table,column
      if (rule.startsWith("exists:")) {
        const [table, column] = rule.replace("exists:", "").split(",");
        if (value) {
          const record = await db(table).where(column, value).first();
          if (!record) {
            errors[field] = `${field} does not exist in ${table}`;
          }
        }
      }
    }
  }

  return errors;
}
