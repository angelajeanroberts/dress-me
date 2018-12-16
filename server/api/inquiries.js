const router = require('express').Router()
const {Inquiry, Reply, User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const inquiries = await Inquiry.findAll({
      include: [
        {model: Reply},
        {
          model: User,
          attributes: ['firstName', 'lastName', 'id']
        }
      ]
    })
    res.json(inquiries)
  } catch (err) {
    next(err)
  }
})

router.get('/:inquiryId', async (req, res, next) => {
  try {
    const id = req.params.inquiryId
    const inquiry = await Inquiry.findById(id, {
      include: [
        {model: Reply},
        {
          model: User,
          attributes: ['firstName', 'lastName', 'id']
        }
      ]
    })
    res.json(inquiry)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    //change this so that fields are taken from req.body
    const body = req.body
    const inquiry = await Inquiry.create(body)
    res.json(inquiry)
  } catch (err) {
    next(err)
  }
})

router.put('/:inquiryId', async (req, res, next) => {
  try {
    //same as above
    const body = req.body
    const id = req.params.inquiryId
    const inquiryToUpdate = await Inquiry.findById(id)
    await inquiryToUpdate.update(body)
    const updatedInquiry = await Inquiry.findById(id, {
      include: [
        {model: Reply},
        {
          model: User,
          attributes: ['firstName', 'lastName', 'id']
        }
      ]
    })
    res.json(updatedInquiry)
  } catch (err) {
    next(err)
  }
})

router.delete('/:inquiryId', async (req, res, next) => {
  try {
    await Inquiry.destroy({
      where: {id: req.params.inquiryId}
    })
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
