const { curry } = require('ramda')

// takes a msg and looks at its type
// isBotCommand(msg: String) -> Boolean
const isBotCommand = msg => msg.type && msg.type === 'bot_command'

// takes a bot instance and a chatId and sends default reply back
// defaultReplay(bot: TelegramBot, chatId: String) -> Function
const sendDefaultReply = curry(bot => chatId =>
  (() =>
    bot.sendMessage(
      chatId,
      "Sorry, I don't understand. Use /help to get a list of all available commands."
    ))()
)

// takes a tag and a value and logs out the value before passing it forward
// trace(tag?: String, val: Any ) -> Any
const trace = tag => value => {
  console.log(typeof value === 'object' ? JSON.stringify(value) : value)
  return value
}

module.exports = {
  isBotCommand,
  sendDefaultReply,
  trace,
}
