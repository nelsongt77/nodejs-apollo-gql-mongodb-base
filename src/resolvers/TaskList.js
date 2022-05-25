const TaskList = require('../models/TaskList')
const { handlePagination, generateId } = require('@codecraftkit/utils')

const taskList_get = async (parent, { options, filter = {} }) => {
  try {
    const { skip, limit } = handlePagination(options)
    const { _id, name } = filter
    const query = { isRemove: false }

    if(_id && _id !== '') query._id = _id
    if(name && name !== '') query.name = {$regex: name, $options: 'gi'}

    const collection = TaskList.find(query)

    if(skip) collection.skip(skip)
    if(limit) collection.limit(limit)

    return await collection
  } catch (e) {
    return e
  }
}

const taskList_create = async (parent, { taskList }) => {
  try {
    const { name } = taskList
    const ID = generateId()
    const record =  new TaskList({
      _id: ID,
      name
    })
    await record.save()
    return ID
  } catch (e) {
    return e
  }
}

const taskList_update = async (parent, { taskList }) => {
  try {
    const { _id, name } = taskList
    await TaskList.updateOne({ _id }, { $set: { name } })
    return taskList._id
  } catch (e) {
    return e
  }
}

const taskList_save = async (parent, { taskList }) => {
  try {
    if(taskList._id) {
      return await taskList_update(parent, { taskList })
    } else {
      return await taskList_create(parent, { taskList })
    }
  } catch (e) {
    return e
  }
}

const taskList_remove = async (parent, { _id }) => {
  try {
    await TaskList.updateOne({ _id }, { $set: { isRemove: true } })
    return true
  } catch (e) {
    return e
  }
}

module.exports = {
  Query: { taskList_get },
  Mutation: { taskList_save, taskList_remove }
}
