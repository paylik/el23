const {Router} = require('express')
// const bodyParser = require('body-parser');
const Product = require('../models/Product')
const Img = require('../models/Img')
// const fileUpload = require('express-fileupload')

const router = Router()
// router.use(fileUpload({}))
// router.use(Router.static('public'))

router.post(
  '/generate',
  async (req, res) => {
    try {

      const {title, productId, category, description, properties, manufacturer, country, price, img} = req.body
      // const candidate = await Product.findOne({ _id })
      //
      // if (candidate) {
      //   return res.status(400).json({ message: 'This product already exists.' })
      // }

      const product = new Product({
        title,
        productId,
        category,
        description,
        properties,
        manufacturer,
        country,
        price,
        img
      })

      await product.save()
      // console.log("PROD", product)
      //
      // await JSON.parse(img).mv(`pics ${product.id}.jpg`)   // save image
      // res.end(`${product.id}.jpg`)
      // console.log("IMG", img)

      res.status(201).json({product})
    } catch (e) {
      res.status(500).json({message: `Bad request 3 ${e}`})
    }
  })

router.post(
  '/upload',
  async (req, res) => {
    // try {
    console.log("RRRR", req)

    let upFile = req.files.file
    let upDest = "/files/upload/" + upFile.name

    await upFile.mv(upDest, err => {
      if (err) {
        return res.status(500).send(err);
      }
      res.send("File uploaded!");
    })

    //   res.status(201).json({ upFile })
    // }
    // catch (e) {
    //   res.status(500).json({message: `Bad request 3 ${e}`})
    // }
  })

router.get('/', async (req, res) => {
  try {
    const products = await Product.find()
    let p = Array.from(new Set(products.map(p => p.category)))
    res.status(200).json(p)
  } catch (e) {
    res.status(500).json({message: 'Bad request 4'})
  }
})

router.get('/category/:category', async (req, res) => {
  try {
    const products = await Product.find({category: req.params.category})
    res.json(products)
  } catch (e) {
    res.status(500).json({message: 'Bad request 4'})
  }
})


router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    res.json(product)
  } catch (e) {
    res.status(500).json({message: 'Bad request 5'})
  }
})

router.patch('/update/:id', async (req, res) => {
  try {
    const {title, productId, category, description, properties, manufacturer, country, price, img} = req.body
    const product = await Product.findById(req.params.id)
    product.title = title
    product.productId = productId
    product.category = category
    product.description = description
    product.properties = properties
    product.manufacturer = manufacturer
    product.country = country
    product.price = price
    product.img = img
    await product.save()
    res.status(200).json({product})
  } catch (e) {
    res.status(500).json({message: `Bad request 7 ${e}`})
  }
})

router.delete('/delete/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    const productId = product.productId
    const img = Img.findOne({productId})
    await product.deleteOne()
    await img.deleteOne()
    res.status(200).json({message: `Product deleted`})
  } catch (e) {
    res.status(500).json({message: `Bad request 6 ${e}`})
  }
})

module.exports = router
