const { queries, mutations } = require('../graphql')
const { curry } = require('ramda')

const { getUserData: getUserDataQuery } = queries

const {
  removeItemFromInventory: removeItemFromInventoryMutation,
  addItemToInventory: addItemToInventoryMutation,
} = mutations

const initiateInventoryModule = db => {
  // module helper function, queries the hasura for user data
  const getUserData = curry((db, uid) =>
    db.query({
      query: getUserDataQuery,
      variables: {
        user_tg_id: uid,
      },
    })
  )(db)

  const addItemToInventory = curry((db, uid, itemid) =>
    getUserData(uid).then(res => {
      db.mutate({
        mutation: addItemToInventoryMutation,
        variables: {
          userid: res.data.users[0].id,
          itemid,
        },
      })
    })
  )(db)

  const removeItemFromInventory = curry((db, id) =>
    db.mutate({
      mutation: removeItemFromInventoryMutation,
      variables: {
        id,
      },
    })
  )(db)

  const showInventory = uid =>
    getUserData(uid).then(res => {
      if (!res.data.users.length)
        return new Error('Can not retrieve inventory of user with such id')
      return res.data.users[0].inventory
    })

  return {
    addItemToInventory,
    removeItemFromInventory,
    showInventory,
  }
}

module.exports = initiateInventoryModule
