const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRequired = [true, "Set password for user"];
const emailRequired = [true, "Email is required"];
const subscriptionRequired = ["starter", "pro", "business"];
const tokenRequired = [true, "Verify token is required"];

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: passwordRequired,
      minlength: 6,
    },
    email: {
      type: String,
      required: emailRequired,
      unique: true,
      match: emailRegexp,
    },
    subscription: {
      type: String,
      enum: subscriptionRequired,
      default: "starter",
    },
    token: {
      type: String,
      default: "",
    },
    avatarURL: {
      type: String,
    },

    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: tokenRequired,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

const schemas = {
  registerSchema,
  loginSchema,
  emailSchema,
};

const User = model("user", userSchema);

module.exports = { User, schemas };
