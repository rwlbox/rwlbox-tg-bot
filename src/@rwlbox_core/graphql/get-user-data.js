const getUserData = `query getUserData($user_tg_id: Int!) {
    users(where: { tg_chat_id: { _eq: $user_tg_id } }) {
      id
      first_name
      card_board {
        chance
        id
        card {
          title
          type
          description
        }
      }
      chances(order_by: { value: desc }) {
        value
        type
      }
      inventory {
        id
        linked_card {
          card {
            description
            title
            type
            id
          }
        }
      }
    }
  }
`

module.exports = getUserData
