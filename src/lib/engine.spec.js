import {
  ROCK_PAPER_SCISSORS,
  ROCK_PAPER_SCISSORS_SPOCK_LIZARD,
  getRandomAction,
  resolveRound,
} from './engine'

describe('getRandomAction()', () => {

  it('should return a random action object from given ROCK_PAPER_SCISSORS rules', () => {
    const availableActionNames = ROCK_PAPER_SCISSORS.map(action => action.name);

    const random = getRandomAction(ROCK_PAPER_SCISSORS);

    expect(availableActionNames).toContain(random.name);
  });

  it('should return a random action object from given ROCK_PAPER_SCISSORS_SPOCK_LIZARD rules', () => {
    const availableActionNames = ROCK_PAPER_SCISSORS_SPOCK_LIZARD.map(action => action.name);

    const random = getRandomAction(ROCK_PAPER_SCISSORS_SPOCK_LIZARD);

    expect(availableActionNames).toContain(random.name);
  });

});

describe('resolveRound()', () => {

  it('should return a tied result for a round given two equal actions', () => {
    const result = resolveRound([{
      id: 0,
      name: 'Rock',
      beats: [2],
      actions: ['crushes'],
    }, {
      id: 0,
      name: 'Rock',
      beats: [2],
      actions: ['crushes'],
    }]);

    expect(result).toEqual([-1, 'Rock ties Rock']);
  });

  it('should return an appropriate result for a round given two actions', () => {
    const result = resolveRound([{
      id: 0,
      name: 'Rock',
      beats: [2],
      actions: ['crushes'],
    }, {
      id: 2,
      name: 'Scissors',
      beats: [1],
      actions: ['cuts'],
    }]);

    expect(result).toEqual([0, 'Rock crushes Scissors']);
  });

});