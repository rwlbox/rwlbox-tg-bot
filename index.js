require('dotenv').config()
const commandHandler = require('./src/rwlbox_bot_core/commandHandler/index')
// main dep
const TelegramBot = require('node-telegram-bot-api')

// bot instance object
const botInstance = new TelegramBot(process.env.BOT_TOKEN, {
  polling: {
    interval: 300,
    autoStart: true,
    params: {
      timeout: 10,
    },
  },
})

// local helpers
const instanceCommandHandler = commandHandler(botInstance)

// sends default message in case of not handled user inputs
botInstance.on('message', msg => instanceCommandHandler(msg))
