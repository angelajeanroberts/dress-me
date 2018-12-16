const Sequelize = require('sequelize')
const db = require('../db')

const Transaction = db.define('transaction', {
  type: {
    type: Sequelize.ENUM('Debit', 'Credit'),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  amount: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Transaction
