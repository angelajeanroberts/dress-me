const router = require('express').Router()
const {Transaction, Inquiry, Reply, User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const transactions = await Transaction.findAll({
      include: [
        {model: Reply},
        {model: Inquiry},
        {
          model: User,
          attributes: ['firstName', 'lastName', 'id']
        }
      ]
    })
    res.json(transactions)
  } catch (err) {
    next(err)
  }
})

router.get('/:transactionId', async (req, res, next) => {
  try {
    const id = req.params.transactionId
    const transaction = await Transaction.findById(id, {
      include: [
        {model: Reply},
        {model: Inquiry},
        {
          model: User,
          attributes: ['firstName', 'lastName', 'id']
        }
      ]
    })
    res.json(transaction)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    //change this so that fields are taken from req.body
    const body = req.body
    const transaction = await Transaction.create(body)
    res.json(transaction)
  } catch (err) {
    next(err)
  }
})