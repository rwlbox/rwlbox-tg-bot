const { curry } = require('ramda')
const { sendDefaultReply } = require('../utils')

const authInterceptor = curry((botInstance, fn, msg) => {
  // @TODO
  // think of a better way
  const chatId = msg.id
    ? ((msg.message || {}).chat || {}).id
    : (msg.chat || {}).id
  return Number.parseInt(process.env.ADMIN_TG_CHAT_ID) === chatId
    ? fn(botInstance, msg)
    : sendDefaultReply(
        botInstance,
        chatId,
        'Sorry, Rwlbox is still in development and you can not use any of its functions at the moment.'
      )
})

module.exports = { authInterceptor }
