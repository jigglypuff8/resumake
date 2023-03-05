const express = require('express');

const resumeController = require('../controllers/resumeController');

const router = express.Router();


router.get('/:id',
  resumeController.getComponent,
  (req, res) => res.status(200).send(res.locals)
);

router.post('/:userId', resumeController.createComponent, (req, res) => res.status(200).send(res.locals))

module.exports = router;