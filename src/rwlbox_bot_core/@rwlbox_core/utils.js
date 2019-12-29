const { curry } = require('ramda')

const random = curry((min, max, isFloat = false) => {
  const range = max - min
  const $random = Math.random() * range + min
  return isFloat ? $random : Math.floor($random)
})

const isSpecial = chance => Math.random() < (chance / 100).toFixed(1)

module.exports = {
  isSpecial,
  random,
}
