// import functionality modules
const initiateLootboxModule = require('./lootbox/index')
const initiateInventoryModule = require('./inventory/index')

// wrapper object
const initiateRwlboxCore = dbInstance => {
  const lootbox = initiateLootboxModule(dbInstance)
  const inventory = initiateInventoryModule(dbInstance)

  return {
    lootbox,
    inventory,
  }
}

module.exports = initiateRwlboxCore
