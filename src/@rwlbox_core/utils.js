const { curry } = require('ramda')
// generates random number in given range;
// randomInRange(min: Number) -> (max: Number) -> (isFloat: Bool) -> Number
const randomInRange = curry((min = 0, max = 100, isFloat = false) => {
  // flip values if they are presented in wrong order
  const range = max > min ? max - min : min - max
  const $random = Math.random() * range + min
  return isFloat ? $random : Math.floor($random)
})

module.exports = {
  randomInRange,
}
