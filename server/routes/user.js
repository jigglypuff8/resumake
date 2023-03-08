const express = require('express');

const userController = require('../controllers/userController');

const router = express.Router();

router.get('/',
  (req, res) => res.status(200).send('good')
);

router.get('/:id',
  userController.getUserData,
  (req, res) => res.status(200).end()
);

module.exports = router;