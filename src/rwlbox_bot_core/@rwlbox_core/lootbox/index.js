const { rewardBoxes, rewardChances } = require('./lootbox.data')
const { randomInRange } = require('../utils')
const { map, range, compose, prop, curry } = require('ramda')
const { trace } = require('../../../utils')

const getUserChances = () => rewardChances

const getUserRewards = () => rewardBoxes

const wrapBox = ([rewardData, extensionData]) => {
  const box = {
    boxKicker: 'Congratulations! Here is your well-deserved box:',
    boxName: rewardData.name,
    boxDescription: rewardData.description,
  }
  return extensionData
    ? {
        ...box,
        extensionKicker: 'Amazing luck: your reward is extended!',
        extensionName: extensionData.name,
        extensionDescription: extensionData.description,
      }
    : box
}

const packBox = curry(
  ({ main, extensions }, [rewardCategory, extensionCategory]) => {
    const availableRewardsList = prop(rewardCategory)(main)
    const actualReward =
      availableRewardsList[randomInRange(0, availableRewardsList.length, false)]
    if (extensionCategory) {
      const availableExtensionsList = prop(extensionCategory)(extensions)
      const actualExtension =
        availableExtensionsList[
          randomInRange(0, availableExtensionsList.length, false)
        ]
      return [actualReward, actualExtension]
    }
    return [actualReward]
  }
)(getUserRewards())

const matchExtensionCategory = curry(([rewardCategory, extensions]) => {
  if (rewardCategory === 'white') return [rewardCategory, null]
  const extensionChance = randomInRange(0, 100, false)
  const sortedExtensionChances = Object.entries(extensions).sort(
    ([key1, val1], [key2, val2]) => val1 - val2
  )
  let extensionCategory = null
  for (let [category, chance] of sortedExtensionChances) {
    if (extensionChance <= chance) {
      extensionCategory = category
    }
  }
  return [rewardCategory, extensionCategory]
})

const matchRewardCategory = curry((globalChances, rolledChance) => {
  const { main, extensions } = globalChances
  const sortedMainChances = Object.entries(main).sort(
    ([key1, val1], [key2, val2]) => val1 - val2
  )
  let rewardCategory = 'white'
  for (let [key, val] of sortedMainChances) {
    if (rolledChance <= val) {
      rewardCategory = key
      break
    }
  }
  return [rewardCategory, extensions]
})(getUserChances())

const makeBox = compose(
  wrapBox,
  packBox,
  matchExtensionCategory,
  matchRewardCategory
)

const getLootbox = () => makeBox(randomInRange())

const alotofboxes = compose(
  map(r => getLootbox()),
  range(1)
)

console.log(alotofboxes(100).filter(a => a.extensionKicker))

module.exports = {
  getLootbox,
  // getPenaltybox,
  // showInventory,
  // showEffects,
  // activateLootbox,
  // showHistory
}
