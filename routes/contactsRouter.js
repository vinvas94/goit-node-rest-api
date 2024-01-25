const express = require("express");

const ctrl = require("../controllers/contactsControllers");

const validateBody = require("../middlewares/validateBody");

const schemas = require("../schemas/contactsSchemas");

const contactsRouter = express.Router();

contactsRouter.get("/", ctrl.getAllContacts);

contactsRouter.get("/:id", ctrl.getOneContact);

contactsRouter.delete("/:id", ctrl.deleteContact);

contactsRouter.post(
  "/",
  validateBody(schemas.createContactSchema),
  ctrl.createContact
);

contactsRouter.put(
  "/:id",
  validateBody(schemas.updateContactSchema),
  ctrl.updateContact
);

module.exports = contactsRouter;
