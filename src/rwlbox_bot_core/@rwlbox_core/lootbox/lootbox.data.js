// all cards should have types like weebs lucky = recreational and so on

// type scheme:
// watch/read: recreational
// eat/own: gratificational
// go/meet/try: experientional
// and buffs

const rewardBoxes = {
  extensions: {
    triggers: [
      {
        name: 'Greed',
        description: 'Doubles next reward',
      },
    ],
    buffs: [
      {
        name: 'Teafucker',
        description:
          'You can drink as much coffe as you want for the next seven days. Till noon, obviously.',
      },
      {
        name: 'Mr R0b0t G#y',
        description:
          'You are free to learn cybersec instead of usual learning materials for the next 7 days.',
      },
      {
        name: 'Belletrist',
        description:
          'Literature switch: read any fiction you want for the next 7 days.',
      },
      {
        name: 'Bard',
        description:
          'Learn any guitar melody/song you want for the next 7 days.',
      },
      {
        name: 'To the glory!',
        description: 'This weekend you are able to play any game you want.',
      },
    ],
  },
  main: {
    // like common
    white: [
      // white shouldn't be static. Think of a meme of quote service integration
      {
        name: 'Oww, it is empty',
        description: 'Anyway you did great, but not this time, mate.',
      },
      {
        name: 'Oww, it is empty',
        description: 'Hey! Hold strong, you will be lucky next time.',
      },
      {
        name: 'Oww, it is empty',
        description: 'Well, it is not a perfect world. Do more, open more.',
      },
    ],
    // rare
    blue: [
      {
        name: 'Treat-a-bit',
        description:
          'Go buy yourself some treat in terms of food, your budger is 100 roubles.',
      },
      {
        name: 'Coffee Wish',
        description: 'This ticket allows you to actually buy a coffee',
      },
      {
        name: "Procrastinator's Pass Lv.1",
        description: '2 Pomodoros of finest procrastination out there',
      },
      {
        name: 'Weebs lucky Lv.1',
        description: 'Watch 1 anime episode any time',
      },
      {
        name: 'Shopoholic Lv.1',
        description:
          'Right to buy something out of the "Needs" category, Tier 3',
      },
    ],
    // legendary
    purple: [
      {
        name: 'Puff puff pass',
        description: 'You can go buy yourself a single charged vape.',
      },
      {
        name: 'Shopoholic Lv.2',
        description:
          'Right to buy something out of the "Needs" category, Tier 2-3',
      },
      {
        name: "Big Weeb's Lv.2",
        description:
          'Yes, the entire title up to 12 series is at your disposal. Any time.',
      },
      {
        name: "Procrastinator's Pass Lv.2",
        description: '4 Pomodoros of finest procrastination out there',
      },
      {
        name: 'Treat-a-bit-more',
        description: 'Go buy treats, your budget is 300 roubles.',
      },
    ],
    // unique
    pink: [
      {
        name: 'Treat-a-lot',
        description: 'Go buy treats, your budget is 500 roubles',
      },
      {
        name: 'Shopoholic Lv.3',
        description:
          'Right to buy something from the "Needs" category that is in game, any tier',
      },
      {
        name: "Big Weeb's Lv.3",
        description: 'HOLY FUCK WATCH AN ENTIRE TITLE UP TO 24 SERIES ANY TIME',
      },
      {
        name: "Procrastinator's Pass Lv.3",
        description: '8 Pomodoros of finest procrastination out there',
      },
      {
        name: 'Purity',
        description: 'Removes all debuffs if activated',
      },
    ],
    // trigger in the end of lootbox evaluation chain
  },
}

// penaly part is put on hold
const penaltyBoxes = {
  triggers: [],
  debuffs: [
    {
      name: 'Silence',
      description:
        'You have lost you ability to use any reward cards for the next 7 days.',
    },
    {
      name: 'Tirany',
      description: 'All unused recreational',
    },
    {},
  ],
  navy: [],
  velvet: [
    {
      name: 'Purged all reward cards',
    },
  ],
  black: [
    {
      name: 'Purge',
      description: 'All reward cards in inventory are purged',
    },
  ],
}

const rewardChances = {
  main: {
    white: 100,
    blue: 30,
    purple: 15,
    pink: 5,
  },
  extensions: {
    buffs: 10,
    triggers: 3,
  },
}

module.exports = {
  rewardBoxes,
  rewardChances,
  // penaltyBoxes,
}
