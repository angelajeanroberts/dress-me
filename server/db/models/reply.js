const Sequelize = require('sequelize')
const db = require('../db')

const Reply = db.define('reply', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  productUrl: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: Sequelize.TEXT
  },
  description: {
    type: Sequelize.TEXT
  },
  status: {
    type: Sequelize.ENUM('Posted', 'Accepted'),
    defaultValue: 'Posted'
  },
  tip: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = Reply
