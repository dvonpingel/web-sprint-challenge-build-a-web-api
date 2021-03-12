// Write your "actions" router here!
const express = require("express");

const Actions = require("./actions-model");

const {
  validateActionId,
  validateAction,
} = require("../middleware/middleware");

const router = express.Router();

router.get("/", (req, res, next) => {
  Actions.get()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch(next);
});

router.get("/:id", validateActionId, (req, res, next) => {
  Actions.get(req.params.id)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch(next);
});

router.post("/", validateAction, (req, res, next) => {
  Actions.insert(req.body)
    .then(() => {
      res.status(201).json(req.body);
    })
    .catch(next);
});

router.put("/:id", validateAction, validateActionId, (req, res, next) => {
  Actions.update(req.params.id, req.body)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch(next);
});

router.delete("/:id", validateActionId, (req, res, next) => {
  Actions.remove(req.params.id)
    .then(() => {
      res.status(200).json("Action Deleted");
    })
    .catch(next);
});

router.use((err, req, res, next) /* eslint-disable-line */ => {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
    custom: "Something is off...",
  });
});

module.exports = router;
