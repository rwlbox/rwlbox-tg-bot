const { curry } = require('ramda')
const { sendDefaultReply } = require('../utils')

const authInterceptor = curry((botInstance, fn, msg) =>
  Number.parseInt(process.env.ADMIN_TG_CHAT_ID) === msg.chat.id
    ? fn(botInstance, msg)
    : sendDefaultReply(
        botInstance,
        msg.chat.id,
        'Sorry, Rwlbox is still in development and you can not use any of its functions at the moment.'
      )
)

module.exports = { authInterceptor }
