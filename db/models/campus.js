const Sequelize = require('sequelize');
const db = require('../index.js');

module.exports = db.define('campus', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  image: {
    // going to store the filepath to images here using a string
    type: Sequelize.STRING,
    allowNull: false
  }
})
