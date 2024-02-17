const express = require("express");

const ctrl = require("../../controllers/users");

const { validateBody, authenticate, upload } = require("../../middlewares");

const { schemas } = require("../../db/users");

const contactsRouter = express.Router();

contactsRouter.post(
  "/register",
  validateBody(schemas.registerSchema),
  ctrl.register
);
contactsRouter.get("/verify/:verificationToken", ctrl.verifyEmail);

contactsRouter.get(
  "/verify",
  validateBody(schemas.emailSchema),
  ctrl.resendVerifyEmail
);

contactsRouter.post("/login", validateBody(schemas.loginSchema), ctrl.login);

contactsRouter.get("/current", authenticate, ctrl.getCurrent);

contactsRouter.post("/logout", authenticate, ctrl.logout);

contactsRouter.patch("/", authenticate, ctrl.updateSubscription);

contactsRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = contactsRouter;
