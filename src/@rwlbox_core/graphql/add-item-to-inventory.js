const addItemToInventory = `mutation addItemToInventory($userid: Int!, $itemid: Int!) {
  insert_inventory(objects: {item_id: $itemid, user_id: $userid}) {
    returning {
    id
    item_id
    user_id
    }
  }
}`

module.exports = addItemToInventory
