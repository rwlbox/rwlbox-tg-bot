const { getLootbox, getTipbox } = require('../@rwlbox_core/lootbox/index')

const processGetLootboxCommand = (bot, msg) => {
  bot.sendMessage(msg.chat.id, getLootbox())
}

const processGetTipboxCommand = (bot, msg) => {
  bot.sendMessage(msg.chat.id, getTipbox())
}

module.exports = {
  processGetLootboxCommand,
  processGetTipboxCommand,
}
