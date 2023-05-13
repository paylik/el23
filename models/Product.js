const { Schema, model } = require('mongoose')

const schema = new Schema({
  productId: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  manufacturer: { type: String, required: true },
  country: { type: String, required: true },
  price: { type: String, required: true },
  img: { type: String },
})

module.exports = model('Product', schema)
