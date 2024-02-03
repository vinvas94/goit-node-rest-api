const { Contact } = require("../db/contact");

const { HttpError, ctrlWrapper } = require("../helpers");

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  const filter = { owner };
  if (favorite !== undefined) {
    filter.favorite = favorite === "true";
  }
  const result = await Contact.find(filter, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "email phone");
  res.json(result);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findOne({ _id: id });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const createContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "Delete success",
  });
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  if (Object.keys(updateData).length === 0) {
    return res
      .status(400)
      .json({ message: "Body must have at least one field" });
  }
  const result = await Contact.findByIdAndUpdate(id, updateData, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  if (Object.keys(updateData).length === 0) {
    return res
      .status(400)
      .json({ message: "Body must have at least one field" });
  }
  const result = await Contact.findByIdAndUpdate(id, updateData, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
