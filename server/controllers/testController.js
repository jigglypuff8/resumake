const db = require('../models/resumesModel');

const testController = {};

testController.test = async (req, res, next) => {
    let sqlQuery='SELECT NOW() AS "theTime"';
    try {
    const testQuery = await db.query(sqlQuery);
    console.log(testQuery);
    } catch (e) {
        console.log(e, e.message)
    }
    return next();
}

module.exports = testController;
