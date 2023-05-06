const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
  productId: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  manufacturer: { type: String, required: true },
  country: { type: String, required: true },
  prise: { type: String, required: true },
  quantity: { type: String, required: true },
  owner: { type: Types.ObjectId, ref: 'User' },
})

module.exports = model('Product', schema)
