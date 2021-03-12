// Write your "projects" router here!
const express = require("express");

const Projects = require("./projects-model");

const {
  validateProjectId,
  validateProject,
} = require("../middleware/middleware");

const router = express.Router();

router.get("/", (req, res, next) => {
  Projects.get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch(next);
});

router.get("/:id", validateProjectId, (req, res, next) => {
  Projects.get(req.params.id)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch(next);
});

router.post("/", validateProject, (req, res, next) => {
  Projects.insert(req.body)
    .then(() => {
      res.status(201).json(req.body);
    })
    .catch(next);
});

router.put("/:id", validateProjectId, validateProject, (req, res, next) => {
  Projects.update(req.params.id, req.body)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch(next);
});

router.delete("/:id", validateProjectId, (req, res, next) => {
  Projects.remove(req.params.id)
    .then(() => {
      res.status(200).json("Deleted Successfully");
    })
    .catch(next);
});

router.get("/:id/actions", validateProjectId, (req, res, next) => {
  Projects.getProjectActions(req.params.id)
    .then((actions) => {
      res.status(200).json(actions);
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
