const Projects = require("../projects/projects-model");
const Actions = require("../actions/actions-model");

async function validateProjectId(req, res, next) {
  try {
    const project = await Projects.get(req.params.id);
    if (!project) {
      res.status(404).json({
        message: "Project not found.",
      });
    } else {
      req.project = project;
      next();
    }
  } catch (err) {
    next(err);
  }
}

async function validateActionId(req, res, next) {
  try {
    const action = await Actions.get(req.params.id);
    if (!action) {
      res.status(404).json({
        message: "Action not found.",
      });
    } else {
      req.action = action;
      next();
    }
  } catch (err) {
    next(err);
  }
}

// validateProject
function validateProject(req, res, next) {
  if (!req.body) {
    res.status(400).json({
      message: "missing project data",
    });
  } else if (!req.body.name || !req.body.description || !req.body.completed) {
    res.status(400).json({
      message: "missing required fields.",
    });
  } else {
    next();
  }
}

// VALIDATING ACTIONS
async function validateAction(req, res, next) {
  const project = await Projects.get(req.body.project_id);
  if (!project) {
    res.status(400).json({
      message: "project with that ID doesn't exist",
    });
  } else {
    if (!req.body) {
      res.status(400).json({
        message: "missing action data",
      });
    } else if (
      !req.body.project_id ||
      !req.body.description ||
      !req.body.notes
    ) {
      res.status(400).json({
        message:
          "missing required fields. (need project_id, description, notes, and completed)",
      });
    } else {
      next();
    }
  }
}

module.exports = {
  validateProjectId,
  validateActionId,
  validateProject,
  validateAction,
};
