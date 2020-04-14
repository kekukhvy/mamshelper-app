const express = require("express");
const router = express.Router();
const Category = require("../models/category");

router.post("", (req, resp, next) => {
  const category = new Category({
    name: req.body.name,
    color: req.body.color,
    checked: req.body.checked,
    isHidden: req.body.isHidden,
  });

  console.log(category);
  category.save().then((createdCategory) => {
    resp.status(201).json({
      message: "Category added successfully",
      categoryId: createdCategory._id,
    });
  });
});

router.get("", (req, res, next) => {
  Category.find().then((documents) => {
    res.status(200).json(documents);
  });
});

module.exports = router;
