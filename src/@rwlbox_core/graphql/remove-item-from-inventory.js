const removeItemFromInventory = `mutation removeInventoryItem($id: Int!) {
  delete_inventory(where: {id: {_eq: $id}}) {
    returning {
    id
    item_id
    user_id
    }
  }
}`

module.exports = removeItemFromInventory
