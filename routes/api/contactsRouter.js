const express = require("express");

const ctrl = require("../../controllers/contactsControllers");

const { validateBody, isValidId, authenticate } = require("../../middlewares");

const { schemas } = require("../../db/contact");

const contactsRouter = express.Router();

contactsRouter.get("/", authenticate, ctrl.getAllContacts);

contactsRouter.get("/:id", authenticate, isValidId, ctrl.getOneContact);

contactsRouter.delete("/:id", authenticate, isValidId, ctrl.deleteContact);

contactsRouter.post(
  "/",
  authenticate,
  validateBody(schemas.createContactSchema),
  ctrl.createContact
);

contactsRouter.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(schemas.updateContactSchema),
  ctrl.updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

module.exports = contactsRouter;
