export const ROCK_PAPER_SCISSORS = [
  {
    id: 0,
    name: 'Rock',
    beats: [2],
    actions: ['crushes'],
  },
  {
    id: 1,
    name: 'Paper',
    beats: [0],
    actions: ['covers'],
  },
  {
    id: 2,
    name: 'Scissors',
    beats: [1],
    actions: ['cuts'],
  },
];

export const ROCK_PAPER_SCISSORS_SPOCK_LIZARD = [
  {
    id: 0,
    name: 'Rock',
    beats: [2, 4],
    actions: ['crushes', 'crushes'],
  },
  {
    id: 1,
    name: 'Paper',
    beats: [0, 3],
    actions: ['covers', 'disproves'],
  },
  {
    id: 2,
    name: 'Scissors',
    beats: [1, 4],
    actions: ['cuts', 'decapitates'],
  },
  {
    id: 3,
    name: 'Spock',
    beats: [0, 2],
    actions: ['vaporizes', 'smashes'],
  },
  {
    id: 4,
    name: 'Lizard',
    beats: [1, 3],
    actions: ['eats', 'poisons'],
  },
];

export function resolveRound(actions) {
  if (actions[0].id === actions[1].id) {
    return [
      -1,
      `${actions[0].name} ties ${actions[1].name}`,
    ];
  }

  const winnerIndex = actions[0].beats.includes(actions[1].id) ? 0 : 1;
  const looserIndex = winnerIndex === 0 ? 1 : 0;
  const beatsIndex = actions[winnerIndex].beats.indexOf(actions[looserIndex].id);
  const beatsActionLabel = actions[winnerIndex].actions[beatsIndex];

  return [
    winnerIndex,
    `${actions[winnerIndex].name} ${beatsActionLabel} ${actions[winnerIndex === 0 ? 1 : 0].name}`,
  ];
}

export function getRandomAction(rules) {
  const randomIndex = Math.floor(Math.random() * Math.floor(rules.length));

  return rules[randomIndex];
}
