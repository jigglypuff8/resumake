const db = require("../models/dbModel");
import {
  initialStateType,
  ResumeType,
  SectionType,
  GridType,
  ProfileType,
} from "../../types";
import { Request, Response, NextFunction } from "express";

const userController: any = {};

userController.getUserData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  //get user information
  const userQuery = await db.query(`
      SELECT *
      FROM app_user
      JOIN resume ON app_user.user_id = resume.user_id
      WHERE app_user.user_id = ${id}
      ORDER BY last_modified DESC
      LIMIT 1`);

  // check if no results were returned
  if (userQuery.rowCount === 0) {
    console.log("No user records found");
    return res.status(400).send("No records found for that user");
  }

  const userData = userQuery.rows[0];

  const currentResume: ResumeType = {
    resume_id: userData.resume_id,
    last_modified: userData.last_modified,
    sections: [],
    // grid: [],
  };

  const initialState: initialStateType = {
    user_id: userData.user_id,
    grids: [],
    current_resume: currentResume,
    resumes: {},
    sections: [],
    profile: {
      name: userData.name,
      location: userData.location,
      linkedin: userData.linkedin,
      email: userData.email,
      job_title: "",
      additional: "",
    },
  };

  //get grid data
  const gridQuery = await db.query(`
  SELECT 
  g.grid_id, 
  g.resume_id, 
  g.component_id, 
  g.x_coordinate, 
  g.y_coordinate, 
  r.resume_id, 
  c.component_id
FROM 
  app_user u
  JOIN resume r ON r.user_id = u.user_id
  JOIN grid g ON g.resume_id = r.resume_id
  JOIN component c ON c.component_id = g.component_id
WHERE 
  u.user_id = ${id}
`);

  if (gridQuery.rowCount === 0) {
    console.log("No gryd records found");
    return res.status(400).send("No gryd data found for that user");
  }

  //add grid query information to initialState object grid property
  gridQuery.rows.forEach((row: GridType) => {
    initialState.grids.push(row);
  });

  //get resume and component data related to the user
  const resumeQuery = await db.query(`
  SELECT r.*, c.*
    FROM resume r
    JOIN component c ON c.user_id = r.user_id
    WHERE r.user_id = ${id};
`);

  if (resumeQuery.rowCount === 0) {
    console.log("No resume records found");
    return res.status(400).send("No resume records found for that user");
  }
  resumeQuery.rows.forEach((row: any) => {
    if (!initialState.resumes.hasOwnProperty(row.resume_id)) {
      initialState.resumes[row.resume_id] = {
        resume_id: row.resume_id,
        last_modified: row.last_modified,
        sections: [],
      };
    }
    const currentSection: SectionType = {
      component_id: row.component_id,
      header: row.header,
      bullets: row.bullets,
    };
    initialState.resumes[row.resume_id].sections.push(currentSection);
  });

  //get section data
  const sectionQuery = await db.query(
    `SELECT * FROM component WHERE user_id = ${id}`
  );

  if (gridQuery.rowCount === 0) {
    console.log("No component/section records found");
    return res.status(400).send("No section records found for that user");
  }
  sectionQuery.rows.forEach((row: any) => {
    const sectionData: SectionType = {
      component_id: row.component_id,
      header: row.header,
      bullets: row.bullets,
    };
    initialState.sections.push(sectionData);
    if (row.resume_id === currentResume.resume_id) {
      currentResume.sections.push(sectionData);
    }
    currentResume.sections.push(row);
  });
  console.log(initialState);
  return next();
};

module.exports = userController;
