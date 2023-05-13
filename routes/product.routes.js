const { Router } = require('express')
const Product = require('../models/Product')
const router = Router()

router.post(
  '/generate',
  async (req, res) => {
  try {
    const { productId, category, description, manufacturer, country, price, img } = req.body
    const candidate = await Product.findOne({ productId })

    if (candidate) {
      return res.status(400).json({ message: 'This product already exists.' })
    }

    const product = new Product({ productId, category, description, manufacturer, country, price, img })

    await product.save()

    res.status(201).json({ product })
  }
  catch (e) {
    res.status(500).json({message: 'Bad request 3'})
  }
})

router.get('/', async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  }
  catch (e) {
    res.status(500).json({message: 'Bad request 4'})
  }
})

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    res.json(product)
  }
  catch (e) {
    res.status(500).json({message: 'Bad request 5'})
  }
})

module.exports = router
