const { curry, compose } = require('ramda')

const extractCommand = str => str.replace(/__\w+|\-\-\d+/, '')

const preprocessTgTextMessage = msg => msg.replace(/[^*_~\w\s]/g, m => `\\${m}`)

const slugify = string => {
  const a =
    'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
  const b =
    'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
  const p = new RegExp(a.split('').join('|'), 'g')

  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}

// takes a msg and looks at its type
// isBotCommand(msg: String) -> Boolean
const isBotCommand = msg => msg.type && msg.type === 'bot_command'

// takes a bot instance and a chatId and sends default reply back
// defaultReplay(bot: TelegramBot, chatId: String) -> Function
const sendDefaultReply = curry(
  (
    bot,
    chatId,
    msg = 'Sorry, I do not understand. Use /help to get a list of all available commands.'
  ) => bot.sendMessage(chatId, msg)
)

// takes a tag and a value and logs out the value before passing it forward
// trace(tag?: String = '', val: Any ) -> Any
const trace = curry((tag = '', value) => {
  console.log(
    `${tag}:\n ${typeof value === 'object' ? JSON.stringify(value) : value}`
  )
  return value
})

const editMessageReplyMarkup = curry((bot, editMessageData = false) => {
  const {
    inline_keyboard,
    payload: { chat_id, message_id },
  } = editMessageData
  if (editMessageData) {
    bot.editMessageReplyMarkup(
      {
        inline_keyboard,
      },
      {
        chat_id,
        message_id,
      }
    )
  }
})

const answerCallbackQuery = curry((bot, id, payload) => {
  bot.answerCallbackQuery(id, payload)
})

module.exports = {
  isBotCommand,
  sendDefaultReply,
  trace,
  slugify,
  extractCommand,
  preprocessTgTextMessage,
  editMessageReplyMarkup,
  answerCallbackQuery,
  extractCommand,
}
