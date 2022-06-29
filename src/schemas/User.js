module.exports = `
  type User {
    _id: ID
    name: String
    lastName: String
    identification: String
    email: String
    phone: String
    mobile: String
    img: String
    gender: Gender
    isEnable: Boolean
    createdAt: DateTime
    updatedAt: DateTime
  }
  
  type Gender {
    _id: String
    name: String
  }
  
  input User_filter {
    _id: ID
    search: String
    genderId: String
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
    genderId: String
    isEnable: Boolean
  }
  
  type Query {
    User_get(options: Options, filter: User_filter): [User]
    User_count(filter: User_filter): Int
    User_genders: [Gender]
  }
  
  type Mutation {
    User_save(user: User_input): ID
    User_remove(_id: ID!): Boolean
  }
`;
