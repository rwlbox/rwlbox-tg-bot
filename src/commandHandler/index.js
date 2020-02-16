const { sendDefaultReply, slugify, extractCommand } = require('../utils')
const {
  processGetLootboxCommand,
  processStartCommand,
  processHelpCommand,
  processShowInventoryCommand,
  processShowStatsCommand,
  processAddItemToInventory,
  processRemoveItemFromInventory,
  processDisableUseButton,
  // @TODO
  // think of a better way
} = require('./commands')
const { curry, compose } = require('ramda')

const commandHandler = curry((rwlboxCoreInstance, bot, msg) => {
  // @TODO
  // think of a better way
  const chatId = msg.id
    ? ((msg.message || {}).chat || {}).id
    : (msg.chat || {}).id
  const text = compose(slugify, extractCommand)(msg.text || msg.data)
  console.log('entry text', text)
  switch (text) {
    case 'start':
      return processStartCommand(bot, chatId)
    case 'help':
      return processHelpCommand(bot, chatId)
    case 'add-item-to-inventory':
      return processAddItemToInventory(rwlboxCoreInstance.inventory, bot, msg)
    case 'remove-item-from-inventory':
      return processRemoveItemFromInventory(
        rwlboxCoreInstance.inventory,
        bot,
        msg
      )
    case 'disable-use-button':
      return processDisableUseButton(bot, chatId, msg)
    case 'get-lootbox':
      return processGetLootboxCommand(rwlboxCoreInstance.lootbox, bot, chatId)
    case 'show-stats':
      return processShowStatsCommand(bot, chatId)
    case 'show-inventory':
      return processShowInventoryCommand(
        rwlboxCoreInstance.inventory,
        bot,
        chatId
      )
    default:
      return sendDefaultReply(
        bot,
        chatId,
        'This command is absent. Use /help to get list of all available commands.'
      )
  }
})

module.exports = commandHandler
