const Task = require('../models/Task')
const { handlePagination, generateId } = require('@codecraftkit/utils')

const task_get = async (parent, { options, filter = {} }) => {
  try {
    const { skip, limit } = handlePagination(options)
    const { _id, name, key, taskListId } = filter
    const query = { isRemove: false }

    if(_id && _id !== '') query._id = _id
    if(taskListId && taskListId !== '') query.taskListId = taskListId
    if(name && name !== '') query.name = {$regex: name, $options: 'gi'}
    if(key && key !== '') query.key = key

    const collection = Task.find(query)

    if(skip) collection.skip(skip)
    if(limit) collection.limit(limit)

    return await collection
  } catch (e) {
    return e
  }
}

const task_create = async (parent, { task }) => {
  try {
    const { name, key, taskListId, reminderDate, backgroundColor } = task
    const ID = generateId()
    const record =  new Task({
      _id: ID,
      name,
      key,
      taskListId,
      reminderDate,
      backgroundColor
    })
    await record.save()
    return ID
  } catch (e) {
    return e
  }
}

const task_update = async (parent, { task }) => {
  try {
    const { _id, name, key, taskListId, reminderDate, backgroundColor } = task
    const update = { $set: { name, key, taskListId, reminderDate, backgroundColor } }
    await Task.updateOne({ _id }, update)
    return _id
  } catch (e) {
    return e
  }
}

const task_save = async (parent, { task }) => {
  try {
    return task._id ? await task_update(parent, { task }) : await task_create(parent, { task })
  } catch (e) {
    return e
  }
}

const task_remove = async (parent, { _id }) => {
  try {
    await Task.updateOne({ _id }, { $set: { isRemove: true } })
    return true
  } catch (e) {
    return e
  }
}

module.exports = {
  Query: { task_get },
  Mutation: { task_save, task_remove }
}
