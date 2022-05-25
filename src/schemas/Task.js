module.exports = `
  input Options {
    page: Int
    limit: Int
  }
  
  type Task {
    _id: ID
    name: String
    key: String
    taskListId: String
    reminderDate: DateTime
    backgroundColor: String
    createdAt: DateTime
    updatedAt: DateTime
  }
  
  input Task_input {
    _id: ID
    name: String
    key: String
    taskListId: String
    reminderDate: DateTime
    backgroundColor: String
  }
  
  input Task_filter {
    _id: ID
    name: String
    key: String
    taskListId: String
  }
  
  type Query {
    task_get(options: Options, filter: Task_filter): [Task]
  }
  
  type Mutation {
    task_save(task: Task_input): ID
    task_remove(_id: ID!): Boolean
  }
`;
