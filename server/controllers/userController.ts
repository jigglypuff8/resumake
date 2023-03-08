const db = require('../models/dbModel');
import {  GridType, initialStateType, ProfileType } from '../../types';
import { Request, Response, NextFunction } from "express";

const userController: any = {};

userController.getUserData = async (req: Request, res: Response, next: NextFunction) => {

    const objToSend: any = {  };
    const { id } = req.params;
    // const query = await db.query(`SELECT * FROM GRID LEFT JOIN component ON grid.componentId = component.componentId`);
    const userQuery = await db.query(`
        SELECT * 
        FROM app_user
        JOIN resume ON app_user.userId = resume.userId
        WHERE app_user.userId = ${id}
        ORDER BY posting_date DESC
        LIMIT 1`)

    // check if no results were returned
    if (userQuery.rowCount === 0) {
        console.log('No user records found');
        return res.status(400).send('No records found for that user');
    }
    // fill out profile info and last resume edited
    const userInfo = userQuery.rows[0];
    objToSend.userId = userInfo.userId;
    const profileInfo: ProfileType = {
        name: userInfo.name,
        location: userInfo.location,
        email: userInfo.email,
        jobTitle: userInfo.job_title,
        additional: ''
    }
    objToSend.profile = profileInfo;
    console.log(objToSend)

    // fill in the current resume info
    const currentResume = {
        resumeId: userInfo.resumeId,
        title: userInfo.title,
        lastModified: userInfo.posting_date,
        sections: [],
    }
    objToSend.currentResume = currentResume;

//get all grid data from the user
    const gridQuery = await db.query(`
    SELECT g.*, c.header, c.bullets
    FROM grid g
    JOIN resume r ON g.resumeId = r.resumeId
    JOIN component c ON g.componentId = c.componentId
    WHERE r.userId = ${id}`);
        const gridInfo = gridQuery.rows;
        console.log(gridInfo);

    objToSend.grid
    // const userDataObj: UserData = {}
    // res.locals = userDataObj;

    return next();
}


module.exports = userController;