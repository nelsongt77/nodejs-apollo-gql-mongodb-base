const User = require('../models/User')
const { handlePagination, generateId } = require('@codecraftkit/utils')

const genders = {
  '1': { _id: '1', name: 'Man', alter: 'men' },
  '2': { _id: '2', name: 'Woman', alter: 'women' },
}

const User_get = async (parent, { options, filter = {}, count = false }) => {
  try {
    const { skip, limit } = handlePagination(options)
    const { _id, search, isEnable, genderId } = filter
    const query = { isRemove: false }

    if(_id && _id !== '') query._id = _id
    if(genderId && genderId !== '') query.genderId = genderId
    if(typeof isEnable !== 'undefined') query.isEnable = isEnable
    if(search && search !== '') {
      query['$text'] = {'$search': search}
    }

    const collection = User.find(query)

    if(count) {
      collection.count()
    } else {
      if(skip) collection.skip(skip)
      if(limit) collection.limit(limit)
    }

    const users = await collection

    for (let i = 0; i < users.length; i++) {
      const user = users[i]
      user.gender = genders[user?.genderId || '1']
      user.img = `https://randomuser.me/api/portraits/${user.gender.alter}/${i+1}.jpg`
    }

    return users
  } catch (e) {
    return e
  }
}

const User_count = async (parent, { filter = {} }) => {
  try {
    return await User_get(parent, { filter, count: true })
  } catch (e) {
    return e
  }
}

const User_create = async (parent, { user }) => {
  try {
    const {
      name,
      lastName,
      identification,
      email,
      phone,
      mobile,
      genderId,
      isEnable
    } = user
    const ID = generateId()
    const search_text = `${name} ${lastName} ${identification} ${email} ${phone} ${mobile}`
    const record =  new User({
      _id: ID,
      name,
      lastName,
      identification,
      email,
      phone,
      mobile,
      genderId,
      isEnable,
      search_text
    })
    await record.save()
    return ID
  } catch (e) {
    return e
  }
}

const User_update = async (parent, { user }) => {
  try {
    const {
      _id,
      name,
      lastName,
      identification,
      email,
      phone,
      mobile,
      genderId,
      isEnable
    } = user
    const search_text = `${name} ${lastName} ${identification} ${email} ${phone} ${mobile}`
    const update = { $set: {
        name,
        lastName,
        identification,
        email,
        phone,
        mobile,
        genderId,
        isEnable,
        search_text
      }
    }
    await User.updateOne({ _id }, update)
    return _id
  } catch (e) {
    return e
  }
}

const User_save = async (parent, { user }) => {
  try {
    const actions = {
      create: User_create,
      update: User_update
    }
    const actionKey = user._id ? 'update' : 'create'
    return actions[actionKey](parent, { user })
  } catch (e) {
    return e
  }
}

const User_remove = async (parent, { _id }) => {
  try {
    await User.updateOne({ _id }, { $set: { isRemove: true } })
    return true
  } catch (e) {
    return e
  }
}

const User_genders = async () => {
  try {
    return Object.values(genders)
  } catch (e) {
    return e
  }
}

module.exports = {
  Query: { User_get, User_count, User_genders },
  Mutation: { User_save, User_remove }
}
