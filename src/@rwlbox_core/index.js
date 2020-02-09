// import functionality modules
const initiateLootboxModule = require('./lootbox/index')

// wrapper object
const initiateRwlboxCore = dbInstance => {
  const lootbox = initiateLootboxModule(dbInstance)

  return {
    lootbox,
  }
}

module.exports = initiateRwlboxCore
