import './theme/reset.css';
import './theme/effects.scss';

import Game from './components/game';

const game = new Game();

game.render(document.body);