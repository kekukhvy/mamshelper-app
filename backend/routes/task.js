const express = require("express");
const router = express.Router();
const Task = require("../models/task");

router.get("", (req, res, next) => {
  Task.find().then((documents) => {
    res.status(200).json({tasks: documents});
  });
});

router.get("/date/:date", (req, res, next) => {
  Task.find({
    startDate: {$lte: new Date(req.params.date)},
    endDate: {$gte: new Date(req.params.date)},
  }).then((documents) => {
    res.status(200).json({tasks: documents});
  });
});

router.get("/month/:date", (req, res, next) => {
  const date = new Date(req.params.date);
  const firstDate = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  Task.find({
    $or: [
      {
        startDate: {$lte: firstDate},
        endDate: {$gte: firstDate},
      },
      {
        startDate: {$lte: lastDate, $gte: firstDate},
      },
    ],
  }).then((documents) => {
    res.status(200).json({tasks: documents});
  });
});

router.post("", (req, res, next) => {
  const task = new Task({
    name: req.body.name,
    description: req.body.description,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    time: req.body.time,
    repeatability: req.body.repeatability,
    category: req.body.category,
  });
  task.save().then((createdTask) => {
    res.status(201).json({taskId: createdTask._id});
  });
});

router.put("", (req, res, next) => {
  const task = new Task({
    _id: req.body.id,
    name: req.body.name,
    description: req.body.description,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    time: req.body.time,
    repeatability: req.body.repeatability,
    category: req.body.category,
  });
  Task.updateOne({_id: req.body.id}, task).then((createdTask) => {
    res.status(200).json({message: "Task was updated"});
  });
});

router.delete("/:id", (req, res, next) => {
  Task.deleteOne({_id: req.params.id}).then((result) => {
    res.status(200).json({message: "Task was deleted"});
  });
});

module.exports = router;
