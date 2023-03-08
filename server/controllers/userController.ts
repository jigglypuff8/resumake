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
  // const query = await db.query(`SELECT * FROM GRID LEFT JOIN component ON grid.componentId = component.componentId`);
  // const userQuery = await db.query(`
  //     SELECT *
  //     FROM app_user
  //     JOIN resume ON app_user.userId = resume.userId
  //     WHERE app_user.userId = ${id}
  //     ORDER BY posting_date DESC
  //     LIMIT 1`)

  const initialState: initialStateType = {
    userId: null,
    grids: [],
    currentResume: null,
    resumes: null,
    sections: [] || null,
    profile: {
      name: "",
      location: "",
      linkedin: "",
      email: "",
      jobTitle: "",
      additional: "",
    },
  };
  //   `SELECT app_user.userId, resume.resumeId, component.componentId, component.header, component.bullets, grid.x_coordinate, grid.y_coordinate
  // FROM app_user
  // LEFT JOIN resume ON app_user.userId = resume.userId
  // LEFT JOIN component ON app_user.userId = component.userId
  // LEFT JOIN grid ON resume.resumeId = grid.resumeId AND component.componentId = grid.componentId
  // WHERE app_user.userId = 1`
  const query = await db.query(`
        SELECT 
        app_user.userId, 
        resume.resumeId, 
        resume.title, 
        component.componentId, 
        component.header, 
        component.bullets, 
        grid.x_coordinate, 
        grid.y_coordinate 
    FROM 
        app_user 
        INNER JOIN resume ON app_user.userId = resume.userId 
        INNER JOIN grid ON resume.resumeId = grid.resumeId 
        INNER JOIN component ON grid.componentId = component.componentId
        WHERE app_user.userId = ${id}`);

  // check if no results were returned
  if (query.rowCount === 0) {
    console.log("No user records found");
    return res.status(400).send("No records found for that user");
  }

  query.rows.forEach((row: any) => {
    console.log(row);
    //Set the userId in the initial state
    initialState.userId = row.userId;
    // if the current resume hasn't been set yet, set it to the first one in the results
    if (!initialState.currentResume) {
      initialState.currentResume = {
        resumeId: row.resumeId,
        title: row.title,
        lastModified: row.posting_date,
        sections: [],
      };
    }
    //if current resume exists, update to the last modified
    if (initialState.currentResume.lastModified < row.posting_date) {
      initialState.currentResume = {
        resumeId: row.resumeId,
        title: row.title,
        lastModified: row.posting_date,
        sections: [],
      };
    }

    // if the resumes array hasn't been populated yet, create an empty array for it
    if (!initialState.resumes) {
      initialState.resumes = [];
    }
    // check if the current resume ID matches the last resume added to the array, and if not, add a new resume object
    if (
      initialState.resumes[initialState.resumes.length - 1]?.resumeId !==
      row.resumeId
    ) {
      initialState.resumes.push({
        resumeId: row.resumeId,
        title: row.title,
        lastModified: row.posting_date,
        sections: [],
      });
    }

    // if the grids array hasn't been populated yet, create an empty array for it
    if (!initialState.grids) {
      initialState.grids = [];
    }

    // add a new grid object to the grids array
    initialState.grids.push({
      gridId: row.gridId,
      resumeId: row.resumeId,
      componentId: row.componentId,
      x_coordinate: row.x_coordinate,
      y_coordinate: row.y_coordinate,
    });

    // create a new section object and add it to the sections array
    const section: SectionType = {
      componentId: row.componentId,
      header: row.header,
      bullets: row.bullets,
    };
    //add it to the sections array
    initialState.sections.push(section);

    if (initialState.currentResume.resumeId === row.resumeId) {
      initialState.currentResume.sections.push(section);
    }
  });
  console.log(initialState);
  return next();
};

module.exports = userController;
