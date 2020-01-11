const { sendDefaultReply } = require('../../utils')
const { processGetLootboxCommand } = require('./commands')

const commandHandler = bot => msg => {
  const {
    chat: { id },
    text,
  } = msg
  const defaultReply = sendDefaultReply(bot)
  console.log(msg)
  console.log(process.env.CHANCE)
  switch (text) {
    case '/get_lootbox':
      return processGetLootboxCommand(bot, msg)
    default:
      return defaultReply(id)
  }
}

module.exports = commandHandler
