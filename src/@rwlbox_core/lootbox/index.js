const getUserDataQuery = require('../graphql').queries.getUserData

const { randomInRange } = require('../utils')
const { compose, curry } = require('ramda')

// the whole stuff is moduled in order to use injected deps
const initiateLootboxModule = db => {
  // module helper function, queries the hasura for user data
  const getUserData = curry((db, uid) =>
    db.query({
      query: getUserDataQuery,
      variables: {
        user_tg_id: uid,
      },
    })
  )(db)

  // takes computed data and modifies a bit for easy representation
  const wrapBox = ([actualBox, actualBonus]) => {
    const box = {
      boxKicker: 'Congratulations! Here is your well-deserved box:',
      boxName: actualBox.title,
      boxDescription: actualBox.description,
      id: actualBox.id,
      type: actualBox.chance,
    }
    return actualBonus
      ? {
          ...box,
          bonusKicker: 'Amazing luck: your reward is extended!',
          bonusName: actualBonus.title,
          bonusDescription: actualBonus.description,
        }
      : box
  }

  const packBox = ([user_data, boxCategory, bonusCategory]) => {
    const card_board = user_data.card_board.map(({ card, chance, id }) => ({
      ...card,
      id,
      chance,
    }))
    const availableBoxList = card_board.filter(
      ({ chance }) => boxCategory === chance
    )
    const actualBox =
      availableBoxList[randomInRange(0, availableBoxList.length, false)]
    if (bonusCategory) {
      const availableBonusList = card_board.filter(
        ({ chance }) => bonusCategory === chance
      )
      const actualBonus =
        availableBonusList[randomInRange(0, availableBonusList.length, false)]
      return [actualBox, actualBonus]
    }
    return [actualBox]
  }

  const matchBonusCategory = ([user_data, boxCategory]) => {
    const boosts = user_data.chances.filter(({ type }) => type === 'boost')
    const buffs = user_data.chances.filter(({ type }) => type === 'buff')

    if (boxCategory === 'white') return [user_data, boxCategory, null]
    const bonusChance = randomInRange(0, 100, false)
    const bonusCategories = [boosts.value, buffs.value].sort((a, b) => a - b)
    const bonusCategory = bonusCategories.find(a => bonusChance < a)
    if (
      bonusCategories.length ===
      bonusCategories.filter(a => bonusChance < a).length
    ) {
      bonusCategory =
        bonusCategories[randomInRange(0, bonusCategories.length, false)]
    }

    return [user_data, boxCategory, bonusCategory]
  }

  const matchRewardCategory = (rolledChance, user_data) => {
    const { chances: boxes } = user_data
    const sortedBoxesChances = boxes
      .filter(({ type }) => ['blue', 'purple', 'pink'].includes(type))
      .sort((boxA, boxB) => boxB.value - boxA.value)
    let boxCategory = 'white'
    for (let box of sortedBoxesChances) {
      if (rolledChance <= box.value) {
        boxCategory = box.type
        break
      }
    }
    return [user_data, boxCategory]
  }

  const makeBox = compose(
    wrapBox,
    packBox,
    matchBonusCategory,
    matchRewardCategory
  )

  const getLootbox = uid => {
    return getUserData(uid).then(res => {
      if (!res.data.users.length) return new Error('User id does not exist')
      return makeBox(randomInRange(), res.data.users[0])
    })
  }

  return {
    getLootbox,
  }
}

module.exports = initiateLootboxModule
