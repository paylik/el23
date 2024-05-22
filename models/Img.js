const {Schema, model} = require('mongoose')

const schema = new Schema({
  data: {type: String, request: true},
  contentType: {type: String, required: true},
  productId: {type: String, required: true, unique: true}
}, {
  timestamps: true
})

module.exports = model('Img', schema)
