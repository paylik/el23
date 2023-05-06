const { Router } = require('express')
// const config = require('../config/default.json')
const Product = require('../models/Product')
const auth = require ('../middleware/auth.middleware')
const router = Router()

router.post('/generate', auth, async (req, res) => {
  try {
    // const baseUrl = config.baseUrl

  }
  catch (e) {
    res.status(500).json({message: 'Bad request'})
  }
})

router.get('/', async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  }
  catch (e) {
    res.status(500).json({message: 'Bad request'})
  }
})

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    res.json(product)
  }
  catch (e) {
    res.status(500).json({message: 'Bad request'})
  }
})

module.exports = router
