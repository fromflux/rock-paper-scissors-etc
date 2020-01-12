import { ROCK_PAPER_SCISSORS as currentRules } from '../lib/engine';

export const GAME_SCREENS = {
  MENU: 'MENU',
  PLAY: 'PLAY',
}

export const PLAYER_TYPES = {
  HUMAN: 'HUMAN',
  COMPUTER: 'COMPUTER'
}

class State {
  constructor(rules) {
    this.data = {
      rules: rules || currentRules,
      players: [
        {
          type: PLAYER_TYPES.HUMAN,
          score: 0,
          lastAction: null,
        }, {
          type: PLAYER_TYPES.COMPUTER,
          score: 0,
          lastAction: null,
        }
      ],
      activeScreen: GAME_SCREENS.MENU,
      rounds: 1,
      roundResult: null,
    };

    return {
      set: (state) => {
        this.data = {
          ...this.data,
          ...state,
        };
      },
      get: () => {
        return this.data;
      }
    }
  }
}

export default State;