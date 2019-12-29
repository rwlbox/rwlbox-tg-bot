const { random, isSpecial } = require('../utils')

// temp data
const commonLootboxData = [
  'Sorry, I have nothing for you but my salty dick. Try next time.',
  'Hey, mate, here is your prize: fuck off',
  'Great job this time! Your reward will be your own mom.',
  'Yes you did something useful for yourself, now what? Shoot some flying colors for ya? Go hard, you bitch.',
]

const specialLootboxData = [
  "Congratulations! You've won a special prize: suck my dick",
  'Amazing opportunity for your hard work: go drink tap water',
  'Hell yeah! You got a nice buff for the whole week: you can jerk off x2 times!',
]

const tipBoxData = [
  'As I see it, yes, you lazy faggot',
  'Ask again later. And after sucking my dick.',
  'Better not tell you now, I would drop dead immediately, sucker.',
  'Cannot predict now. You are such a pussy.',
  'Concentrate and ask again, asshole',
  'Don’t count on it, you, 25m virgin',
  'It is certain. You have brain cancer.',
  'It is decidedly so go fuck yourself.',
  'Well, fuck you. And your mom.',
  'Most likely if your previous life you was a dog. And not a cute one.',
  'My reply is no. ',
  'Very doubtful that you are man if you asks such questions.',
  'Yes. Really. No jokes.',
]

// generates lootbox from passed data
// generateLootbox(data: [Any]) -> Any
const generateLootbox = data => data[random(0, data.length)]

// generates special lootbox from passed data
// generateLootbox(data: [Any]) -> Any
const generateSpecialLootbox = data => data[random(0, data.length)]

const getLootbox = () =>
  isSpecial(process.env.CHANCE)
    ? generateLootbox(commonLootboxData)
    : generateSpecialLootbox(specialLootboxData)

// generates tip box
const getTipbox = () => tipBoxData[random(0, tipBoxData.length)]

module.exports = {
  getLootbox,
  getTipbox,
}
