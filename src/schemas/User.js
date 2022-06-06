module.exports = `
  type User {
    _id: ID
    name: String
    lastName: String
    identification: String
    email: String
    phone: String
    mobile: String
    #img: String
    isEnable: Boolean
    createdAt: DateTime
    updatedAt: DateTime
  }
  
  input User_filter {
    _id: ID
    search: String
    isEnable: Boolean
  }
  
  input User_input {
    _id: ID
    name: String!
    lastName: String
    identification: String!
    email: String!
    phone: String
    mobile: String
    isEnable: Boolean
  }
  
  type Query {
    User_get(options: Options, filter: User_filter): [User]
    User_count(filter: User_filter): Int
  }
  
  type Mutation {
    User_save(user: User_input): ID
    User_remove(_id: ID!): Boolean
  }
`;
