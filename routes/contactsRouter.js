const express = require("express");

const ctrl = require("../controllers/contactsControllers");

const { validateBody, isValidId } = require("../middlewares");

const { schemas } = require("../db/contact");

const contactsRouter = express.Router();

contactsRouter.get("/", ctrl.getAllContacts);

contactsRouter.get("/:id", isValidId, ctrl.getOneContact);

contactsRouter.delete("/:id", isValidId, ctrl.deleteContact);

contactsRouter.post(
  "/",
  validateBody(schemas.createContactSchema),
  ctrl.createContact
);

contactsRouter.put(
  "/:id",
  isValidId,
  validateBody(schemas.updateContactSchema),
  ctrl.updateContact
);
contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = contactsRouter;
