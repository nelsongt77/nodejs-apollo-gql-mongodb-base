const db = require('./../db')
const collectionName = 'users'

const schema = new db.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  lastName: { type: String, default: null },
  identification: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: String, default: null },
  mobile: { type: String, default: null },
  img: { type: String, default: null },
  genderId: { type: String, default: '1' },
  isEnable: { type: Boolean, default: true },
  search_text: { type: String, default: '', index: 'text' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isRemove: { type: Boolean, default: false }
}, {
  versionKey: false,
  collection: collectionName,
  _id: false
})

module.exports = db.model(collectionName, schema);
