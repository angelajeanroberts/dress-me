const router = require('express').Router()
const {Reply, Inquiry, User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const replies = await Reply.findAll({
      include: [
        {model: Inquiry},
        {
          model: User,
          attributes: ['firstName', 'lastName', 'id']
        }
      ]
    })
    res.json(replies)
  } catch (err) {
    next(err)
  }
})

router.get('/:replyId', async (req, res, next) => {
    try {
      const id = req.params.replyId
      const reply = await Reply.findById(id, {
        include: [
          {model: Inquiry},
          {
            model: User,
            attributes: ['firstName', 'lastName', 'id']
          }
        ]
      })
      res.json(reply)
    } catch (err) {
      next(err)
    }
  })
  
  router.post('/', async (req, res, next) => {
    try {
      //change this so that fields are taken from req.body
      const body = req.body
      const reply = await Reply.create(body)
      res.json(reply)
    } catch (err) {
      next(err)
    }
  })
  
  router.put('/:replyId', async (req, res, next) => {
    try {
      //same as above
      const body = req.body
      const id = req.params.replyId
      const replyToUpdate = await Reply.findById(id)
      await replyToUpdate.update(body)
      const updatedReply = await Reply.findById(id, {
        include: [
          {model: Inquiry},
          {
            model: User,
            attributes: ['firstName', 'lastName', 'id']
          }
        ]
      })
      res.json(updatedReply)
    } catch (err) {
      next(err)
    }
  })
  
  router.delete('/:replyId', async (req, res, next) => {
    try {
      await Reply.destroy({
        where: {id: req.params.replyId}
      })
      res.sendStatus(204)
    } catch (err) {
      next(err)
    }
  })
  