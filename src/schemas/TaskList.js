module.exports = `
  type TaskList {
    _id: ID
    name: String
    createdAt: DateTime
    updatedAt: DateTime
  }
  
  input TaskList_input {
    _id: ID
    name: String
  }
  
  type Query {
    taskList_get(options: Options, filter: TaskList_input): [TaskList]
  }
  
  type Mutation {
    taskList_save(taskList: TaskList_input): ID
    taskList_remove(_id: ID!): Boolean
  }
`;
