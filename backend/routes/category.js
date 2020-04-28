const express = require("express");
const router = express.Router();
const Category = require("../models/category");

router.get("", (req, res, next) => {
  Category.find().then((documents) => {
    res.status(200).json({ categories: documents });
  });
});

router.post("", (req, resp, next) => {
  const category = new Category({
    name: req.body.name,
    color: req.body.color,
    checked: req.body.checked,
    isHidden: req.body.isHidden,
  });

  category.save().then((createdCategory) => {
    resp.status(201).json({
      message: "Category added successfully",
      categoryId: createdCategory._id,
    });
  });
});

router.put("/:id", (req, res, next) => {
  const category = new Category({
    _id: req.body.id,
    name: req.body.name,
    color: req.body.color,
    checked: req.body.checked,
    isHidden: req.body.isHidden,
  });
  Category.updateOne({ _id: req.params.id }, category).then((result) => {
    res.status(200).json({ message: "Updated successfully" });
  });
});

router.delete("/:id", (req, res, next) => {
  Category.deleteOne({ _id: req.params.id }).then((result) => {
    res.status(200).json({
      message: "Category was deleted",
    });
  });
});

module.exports = router;
