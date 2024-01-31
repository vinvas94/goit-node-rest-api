const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const nameRequired = [true, "Set name for contact"];

const contactSchemas = new Schema(
  {
    name: {
      type: String,
      required: nameRequired,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchemas.post("save", handleMongooseError);

const createContactSchema = Joi.object({
  name: Joi.string().required(...nameRequired),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  createContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
};

const Contact = model("contact", contactSchemas);

module.exports = {
  Contact,
  schemas,
};
