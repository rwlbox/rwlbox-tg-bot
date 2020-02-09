const { compose, curry } = require('ramda')

const processGetLootboxCommand = async (rwlbox, bot, msg) => {
  let boxData
  try {
    boxData = await rwlbox.getLootbox(msg.chat.id)
    // @TODO: create template
    const bonusMsg = boxData =>
      boxData.bonusKicker
        ? `
  \n
  \=\=\=\=\=\=\=\=\=\=\=\=\=\=\n
  _${boxData.bonusKicker}_\n
  *${boxData.bonusName}*\n
  ${boxData.bonusDescription}
  \=\=\=\=\=\=\=\=\=\=\=\=\=\=\n
  `
        : ''

    const boxMsg = curry(
      (boxData, bonusMsg) => `
_${boxData.boxKicker}_\n
*${boxData.boxName}*\n
${boxData.boxDescription}\n
${bonusMsg}
   `
    )(boxData)

    // prepend every non-word non-markup character
    const prep = msg => msg.replace(/[^*_~\w\s]/g, m => `\\${m}`)
    const message = compose(prep, boxMsg, bonusMsg)
    bot.sendMessage(msg.chat.id, message(boxData), {
      parse_mode: 'MarkdownV2',
    })
  } catch (e) {
    bot.sendMessage(msg.chat.id, e)
  }
}

const processStartCommand = (bot, msg) => {
  bot.sendMessage(
    msg.chat.id,
    `*Welcome to Rwlbox\\!*\n
We are so glad you have decided to play with us and\\, well\\, with yourself\\. Use \\/help to get list of all available commands\\, contact \\@bolotskydev if there is any questions\\. Have a nice game\\!\n
_Rwlbox team_\n
[Follow us on Twitter](https://twitter/@rwlbox)
    `,
    {
      parse_mode: 'MarkdownV2',
    }
  )
}

module.exports = {
  processGetLootboxCommand,
  processStartCommand,
}
