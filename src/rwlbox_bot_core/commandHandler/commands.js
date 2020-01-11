const { getLootbox } = require('../@rwlbox_core/lootbox/index')

const processGetLootboxCommand = (bot, msg) => {
  bot.sendMessage(msg.chat.id, getLootbox())
}

module.exports = {
  processGetLootboxCommand,
}
