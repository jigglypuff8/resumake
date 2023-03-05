const db = require('../models/dbModel');

const userController = {};

userController.getUserData = async (req, res, next) => {
    
    const { id } = req.params;
    const query = await db.query(`SELECT * FROM GRID LEFT JOIN component ON grid.componentId = component.componentId`);
    res.locals = query;
    return next();
}

module.exports = userController;
