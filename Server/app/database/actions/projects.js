import mongoose from "mongoose";

// * User
import UserModel from "../models/user.js";
import UserClass from "../../data/user/user.js";

// * Project
import ProjectModel from "../models/project.js";
import ProjectClass from "../../data/project/project.js";

export const saveProjectToDatabase = async (project) => {
  const newProject = new ProjectClass(project);
  console.log("New Project: ", newProject);
  const projectModel = new ProjectModel(newProject);
  await projectModel.save();
  console.log("Project Model: ", projectModel);
  newProject.contributors.forEach(async (contributor) => {
    UserModel.findOneAndUpdate(
      { user_id: contributor.user_id },
      {
        $push: {
          projects: {
            id: newProject.id,
            name: newProject.name,
            edited: newProject.edited,
            framework: newProject.framework,
          },
        },
      },
      { new: true }
    ).exec();
  });
  return {
    id: newProject.id,
    name: newProject.name,
    edited: newProject.edited,
    framework: newProject.framework,
  };
};
