const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
  userId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  owner: { type: Types.ObjectId, ref: 'User' },
})

module.exports = model('Cart', schema)
