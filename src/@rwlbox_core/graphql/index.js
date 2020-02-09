const gql = require('graphql-tag')
const getUserData = require('./get-user-data.js')

const queries = {
  getUserData: gql(getUserData),
}

module.exports = queries
