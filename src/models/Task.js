const db = require('./../db')
const collectionName = 'tasks'

const schema = new db.Schema({
  _id: { type: String, required: true },
  name: { type: String },
  key: { type: String },
  reminderDate: Date,
  backgroundColor: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isRemove: { type: Boolean, default: false }
}, {
  versionKey: false,
  collection: collectionName,
  _id: false
})

module.exports = db.model(collectionName, schema);
