const { compose, curry } = require('ramda')
const {
  preprocessTgTextMessage,
  answerCallbackQuery,
  editMessageReplyMarkup,
} = require('../utils')

const processGetLootboxCommand = async (rwlbox, bot, id) => {
  try {
    const boxData = await rwlbox.getLootbox(id)
    // @TODO: create template
    const bonusMsg = boxData =>
      boxData.bonusKicker
        ? `
  \n
  \=\=\=\=\=\=\=\=\=\=\=\=\=\=\n
  _${boxData.bonusKicker}_\n
  *${boxData.bonusName}*\n
  ${boxData.bonusDescription}
  \=\=\=\=\=\=\=\=\=\=\=\=\=\=\n
  `
        : ''

    const boxMsg = curry(
      (boxData, bonusMsg) => `
_${boxData.boxKicker}_\n
*${boxData.boxName}*\n
${boxData.boxDescription}\n
${bonusMsg}
   `
    )(boxData)

    const message = compose(preprocessTgTextMessage, boxMsg, bonusMsg)
    if (!boxData.bonusKicker && boxData.type !== 'white') {
      bot.sendMessage(id, message(boxData), {
        parse_mode: 'MarkdownV2',
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Use now \u2705',
                callback_data: 'disable-use-button',
              },
            ],
            [
              {
                text: 'Add into inventory \uD83D\uDCBC',
                callback_data: `add-item-to-inventory--${boxData.id}`,
              },
            ],
          ],
        },
      })
    } else {
      bot.sendMessage(id, message(boxData), {
        parse_mode: 'MarkdownV2',
      })
    }
  } catch (e) {
    bot.sendMessage(id, e)
  }
}

const processStartCommand = (bot, id) => {
  bot.sendMessage(
    id,
    `*Welcome to Rwlbox\\!*\n
We are so glad you have decided to play with us and\\, well\\, with yourself\\. Use \\/help to get list of all available commands\\, contact \\@bolotskydev if there is any questions\\. Have a nice game\\!\n
_Rwlbox team_\n
[Follow us on Twitter](https://twitter/@rwlbox)
    `,
    {
      parse_mode: 'MarkdownV2',
      reply_markup: {
        keyboard: [
          [
            { text: 'Get lootbox \uD83D\uDCE6' },
            { text: 'Show inventory \uD83D\uDCBC' },
          ],
          [{ text: 'Show stats \uD83D\uDCC8' }, { text: 'Help \uD83D\uDE4F' }],
        ],
      },
    }
  )
}

const processHelpCommand = (bot, id) => {
  bot.sendMessage(id, `Nothing is there yet`, {
    parse_mode: 'MarkdownV2',
    reply_markup: {
      keyboard: [
        [
          { text: 'Get lootbox \uD83D\uDCE6' },
          { text: 'Show inventory \uD83D\uDCBC' },
        ],
        [{ text: 'Show stats \uD83D\uDCC8' }, { text: 'Help \uD83D\uDE4F' }],
      ],
    },
  })
}

const processShowInventoryCommand = async (rwlbox, bot, chatId) => {
  try {
    const inventoryContent = await rwlbox.showInventory(chatId)
    if (!inventoryContent.length) {
      return bot.sendMessage(
        chatId,
        preprocessTgTextMessage(
          `*Looks like your inventory is currently empty. Add some cards and try again.*`
        ),
        {
          parse_mode: 'MarkdownV2',
        }
      )
    }

    const boxMsg = boxData => `
_${boxData.type}_\n
*${boxData.title}*\n
${boxData.description}\n
   `
    const message = compose(preprocessTgTextMessage, boxMsg)

    bot.sendMessage(
      chatId,
      preprocessTgTextMessage(`*Here is what in your inventory:*`),
      {
        parse_mode: 'MarkdownV2',
      }
    )

    inventoryContent.forEach(({ linked_card: { card }, id }) => {
      bot.sendMessage(chatId, message(card), {
        parse_mode: 'MarkdownV2',
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Use \u2705',
                callback_data: `remove-item-from-inventory--${id}`,
              },
            ],
          ],
        },
      })
    })
  } catch (e) {
    console.log(e)
    bot.sendMessage(chatId, e.toString())
  }
}

const processShowStatsCommand = (bot, id) => {
  bot.sendMessage(id, `Nothing is there yet`, {
    parse_mode: 'MarkdownV2',
    reply_markup: {
      keyboard: [
        [
          { text: 'Get lootbox \uD83D\uDCE6' },
          { text: 'Show inventory \uD83D\uDCBC' },
        ],
        [{ text: 'Show stats \uD83D\uDCC8' }, { text: 'Help \uD83D\uDE4F' }],
      ],
    },
  })
}

const processRemoveItemFromInventory = (rwlbox, bot, cbdata) => {
  const {
    id,
    data,
    message: { message_id, chat },
  } = cbdata
  const isUsed = /(__\w+)/.test(data)
  const inventoryItemId = data.replace(/.*\-\-(\d+)/, '$1')

  if (isUsed) {
    return bot.answerCallbackQuery(id, {
      text: 'This item has already been used.',
      show_alert: true,
    })
  }

  rwlbox.removeItemFromInventory(inventoryItemId)
  editMessageReplyMarkup(bot, {
    inline_keyboard: [
      [
        {
          text: 'Used \u2757',
          callback_data: 'remove-item-from-inventory__used',
        },
      ],
    ],
    payload: {
      message_id,
      chat_id: chat.id,
    },
  })
  answerCallbackQuery(id, {
    text: '',
    show_alert: false,
  })
}

const processAddItemToInventory = (rwlbox, bot, cbdata) => {
  const {
    id,
    data,
    message: { message_id, chat },
  } = cbdata
  const isUsed = /(__\w+)/.test(data)
  const inventoryItemId = data.replace(/.*\-\-(\d+)/, '$1')
  console.log(data, isUsed)
  if (isUsed) {
    return bot.answerCallbackQuery(id, {
      text: 'This item is already in the inventory.',
      show_alert: true,
    })
  }
  console.log(chat.id, inventoryItemId)
  rwlbox.addItemToInventory(chat.id, inventoryItemId)
  editMessageReplyMarkup(bot, {
    inline_keyboard: [
      [
        {
          text: 'Saved \u2757',
          callback_data: 'add-item-to-inventory__used',
        },
      ],
    ],
    payload: {
      message_id,
      chat_id: chat.id,
    },
  })
  answerCallbackQuery(id, {
    text: '',
    show_alert: false,
  })
}

const processDisableUseButton = (
  bot,
  id,
  {
    message: {
      message_id,
      chat: { id: chat_id },
    },
  }
) => {
  editMessageReplyMarkup(bot, {
    inline_keyboard: [
      [
        {
          text: 'Used \u2757',
          callback_data: 'remove-item-from-inventory__used',
        },
      ],
    ],
    payload: {
      message_id,
      chat_id,
    },
  })
  answerCallbackQuery(id, {
    text: '',
    show_alert: false,
  })
}

module.exports = {
  processGetLootboxCommand,
  processStartCommand,
  processHelpCommand,
  processShowStatsCommand,
  processShowInventoryCommand,
  processRemoveItemFromInventory,
  processAddItemToInventory,
  processDisableUseButton,
}
