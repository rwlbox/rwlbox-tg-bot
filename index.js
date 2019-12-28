require('dotenv').config()
const https = require('https')

//main dep
const TelegramBot = require('node-telegram-bot-api')

// bot instance object
const botInstance = new TelegramBot(process.env.BOT_TOKEN, { polling: true })

botInstance.on('message', msg => console.log(msg))
