const router = require('express').Router()
const {User, Inquiry, Reply} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['firstName', 'lastName', 'id', 'email', 'isAdmin']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const id = req.params.userId
    const user = await User.findById(id, {
      attributes: ['firstName', 'lastName', 'id', 'email', 'isAdmin'],
      include: [Inquiry, Reply]
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})
