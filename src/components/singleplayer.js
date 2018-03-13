import React from 'react';
import { Client } from 'boardgame.io/react';
import GaiaProjectGame from '../game/game';
import GaiaProjectBoard from './board';

const App = Client({
  game: GaiaProjectGame,
  board: GaiaProjectBoard
});

const Singleplayer = () => (
  <div style={{padding: 50}}>
    <App gameID="single" />
  </div>
);

export default Singleplayer;