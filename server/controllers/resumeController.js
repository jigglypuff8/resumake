const db = require('../models/dbModel');

const resumeController = {};

resumeController.test = async (req, res, next) => {
    let sqlQuery='SELECT NOW() AS "theTime"';
    try {
    const testQuery = await db.query(sqlQuery);
    console.log(testQuery);
    } catch (e) {
        console.log(e, e.message)
    }
}

resumeController.getComponent = async (req, res, next) => {
    
    const { id } = req.params;
    const query = await db.query(`SELECT * FROM GRID LEFT JOIN component ON grid.componentId = component.componentId`);
    res.locals = query;
    return next();
}

resumeController.createComponent = async (req, res, next) => {
    try {
        const {header, bullets} = req.body;
        const { userId } = req.params;
    
        const query = await db.query(`INSERT INTO component (userId,header,bullets) VALUES ($1,$2,$3)`, [userId,header,bullets])
        res.locals = query
       
    } catch (error) {
        console.log(error.message)
    }
  
}
/*
CREATE TABLE component (
componentId serial NOT NULL,
userId int NOT NULL,
header varchar NOT NULL,
bullets varchar NOT NULL,
CONSTRAINT component_pk PRIMARY KEY (componentId)
);
*/
module.exports = resumeController;
