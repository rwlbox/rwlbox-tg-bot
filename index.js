require('dotenv').config()
const commandHandler = require('./src/commandHandler/index')
const TelegramBot = require('node-telegram-bot-api')
const rwlboxInitiator = require('./src/@rwlbox_core/index')
const ApolloClient = require('apollo-boost').ApolloClient
const fetch = require('cross-fetch/polyfill').fetch
const createHttpLink = require('apollo-link-http').createHttpLink
const InMemoryCache = require('apollo-cache-inmemory').InMemoryCache
const { authInterceptor } = require('./src/hof/index')

// apollo client
const client = new ApolloClient({
  link: createHttpLink({
    uri: process.env.HASURA_API_ENDPOINT,
    fetch: fetch,
  }),
  cache: new InMemoryCache(),
})

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

// provide core functionality with client instance at upper level
// just like with bot instance
const rwlboxInstance = rwlboxInitiator(client)

//provide tg bot command handler with rwlboxInstance
const activatedCommandHandler = commandHandler(rwlboxInstance)

// sends default message in case of not handled user inputs
botInstance.on('message', authInterceptor(botInstance, activatedCommandHandler))
