const express = require('express');
const router = express.Router();
const Campus = require('../../db/models').Campus;
const User = require('../../db/models').User;

module.exports = router;

// GET REQUEST FOR CAMPUSES
router.get('/', (req, res, next) => {
  Campus.findAll({
    include: [User]
  })
    .then(campuses => {
      res.json(campuses);
    })
});

// POST REQUEST FOR A NEW CAMPUS
router.post('/', (req, res, next) => {
  Campus.create(req.body)
    .then((created) => {
      res.json(created)
    })
});

// PUT (UPDATE) REQUEST FOR A CAMPUS
router.put('/:campusId', (req, res, next) => {
  Campus.update(req.body, {
    where: { id: req.params.campusId },
    returning: true
  })
    .then(updatedCampus => {
      res.json(updatedCampus);
    })
});

// DELETE REQEUST FOR A CAMPUS
router.delete('/:campusId', (req, res, next) => {
  Campus.destroy({
    where: {
      id: req.params.campusId
    },
    returning: true
  })
    .then(() => {
      console.log('deleted the campus entry');
    })
});

// BASIC ROUTING FOR CAMPUSES COMPLETED
