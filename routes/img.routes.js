const {Router} = require('express')
const Img = require('../models/Img')

const router = Router()

router.post(
  '/addImg/:productId',
  async (req, res) => {
    try {
      const productId = req.params.productId
      const candidate = await Img.findOne({productId})
      if (candidate) {
        candidate.data = req.body.img
        await candidate.save()
      } else {
        let new_img = new Img({
          data: req.body.img,
          contentType: 'image/jpeg',
          productId: req.params.productId
        })
        await new_img.save()
      }
    } catch (e) {
      res.status(500).json({message: 'Bad request 7'})
    }
  })

router.get('/:productId', async (req, res) => {
  try {
    const img = await Img.findOne({productId: req.params.productId})
    res.json(img)
  } catch (e) {
    res.status(500).json({message: 'Bad request 8'})
  }
})

module.exports = router
