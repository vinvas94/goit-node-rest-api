const express = require("express");

const ctrl = require("../../controllers/auth");

const { validateBody, authenticate } = require("../../middlewares");

const { schemas } = require("../../db/user");

const contactsRouter = express.Router();

contactsRouter.post(
  "/register",
  validateBody(schemas.registerSchema),
  ctrl.register
);

contactsRouter.post("/login", validateBody(schemas.loginSchema), ctrl.login);

contactsRouter.get("/current", authenticate, ctrl.getCurrent);

contactsRouter.post("/logout", authenticate, ctrl.logout);

contactsRouter.patch("/", authenticate, ctrl.updateSubscription);

module.exports = contactsRouter;
