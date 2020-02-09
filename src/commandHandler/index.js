const { sendDefaultReply } = require('../utils')
const { processGetLootboxCommand, processStartCommand } = require('./commands')
const { curry } = require('ramda')

const commandHandler = curry((rwlboxCoreInstance, bot, msg) => {
  const {
    chat: { id },
    text,
  } = msg
  console.log(msg)
  switch (text) {
    case '/get_lootbox':
      return processGetLootboxCommand(rwlboxCoreInstance.lootbox, bot, msg)
    case '/start':
      return processStartCommand(bot, msg)
    default:
      return sendDefaultReply(
        bot,
        id,
        'This command is absent. Use /help to get list of all available commands.'
      )
  }
})

module.exports = commandHandler
