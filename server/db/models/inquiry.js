const Sequelize = require('sequelize')
const db = require('../db')

const Inquiry = db.define('inquiry', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  productType: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  occasion: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  minPrice: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      notEmpty: true
    }
  },
  maxPrice: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      notEmpty: true
    }
  },
  status: {
    type: Sequelize.ENUM('Open', 'Closed'),
    defaultValue: 'Open'
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Inquiry
