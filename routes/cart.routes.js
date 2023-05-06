const { Router } = require('express')
const Cart = require('../models/Cart')
const auth = require ('../middleware/auth.middleware')
const router = Router()

router.post('/add', async (req, res) => {
  try {

  }
  catch (e) {
    res.status(500).json({message: 'Bad request'})
  }
})

router.get('/', auth, async (req, res) => {
  try {
    const cart = await Cart.find({ owner: req.user.userId })
    res.json(cart)
  }
  catch (e) {
    res.status(500).json({message: 'Bad request'})
  }
})

module.exports = router
