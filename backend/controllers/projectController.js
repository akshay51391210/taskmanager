const Project = require('../models/Project');

// Get all open projects
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ status: 'open' }).sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Post a new project (client)
const addProject = async (req, res) => {
  const { title, description, skills, budgetMin, budgetMax } = req.body;
  try {
    const project = await Project.create({
      clientId: req.user.id,
      title,
      description,
      skills,
      budgetMin,
      budgetMax
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update project (only client who created it)
const updateProject = async (req, res) => {
  const { title, description, skills, budgetMin, budgetMax, status } = req.body;
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    if (project.clientId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    project.title = title || project.title;
    project.description = description || project.description;
    project.skills = skills || project.skills;
    project.budgetMin = budgetMin ?? project.budgetMin;
    project.budgetMax = budgetMax ?? project.budgetMax;
    project.status = status || project.status;

    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete project (only client who created it)
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    if (project.clientId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await project.remove();
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProjects, addProject, updateProject, deleteProject };
