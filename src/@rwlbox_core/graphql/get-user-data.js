const getUserData = `query getUserData($user_tg_id: Int!) {
    users(where: { tg_chat_id: { _eq: $user_tg_id } }) {
      first_name
      card_board {
        chance
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
    }
  }
`

module.exports = getUserData
