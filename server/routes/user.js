const express = require('express');
const router = express.Router();
const User = require('../../db/models').User;

module.exports = router;

// GET REQUEST FOR STUDENTS
router.get('/', (req, res, next) => {
  User.findAll({})
    .then(students => {
      res.json(students);
    })
});

// POST REQUEST FOR A NEW STUDENT
router.post('/', (req, res, next) => {
  User.create(req.body)
    .then((created) => {
      res.json({ created });
    })
});

// PUT (UPDATE) REQUEST FOR ONE STUDENT
router.put('/:studentId', (req, res, next) => {
  User.update(req.body, {
    where: {id: req.params.studentId},
    returning: true
  })
    .then(updatedStudent => {
      res.json(updatedStudent);
    })
});

// DELETE REQYEST FOR A STUDENT
router.delete('/:studentId', (req, res, next) => {
  User.destroy({
    where: {
      id: req.params.studentId
    },
    returning: true
  })
    .then(() => {
      console.log('deleted the user entry');
    })
});

// BASIC ROUTING FOR USERS COMPLETED
