const gql = require('graphql-tag')
// queries
const getUserData = require('./get-user-data.js')
// mutations
const addItemToInventory = require('./add-item-to-inventory')
const removeItemFromInventory = require('./remove-item-from-inventory')

const queries = {
  getUserData: gql(getUserData),
}

const mutations = {
  addItemToInventory: gql(addItemToInventory),
  removeItemFromInventory: gql(removeItemFromInventory),
}

module.exports = {
  queries,
  mutations,
}
