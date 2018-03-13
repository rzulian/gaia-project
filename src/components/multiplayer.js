import React from 'react';
import { Client } from 'boardgame.io/react';
import GaiaProjectGame from '../game/game';
import GaiaProjectBoard from './board';

const App = Client({
  game: GaiaProjectGame,
  board: GaiaProjectBoard,
  multiplayer: true,
  debug: false
});

const Multiplayer = () => (
  <div style={{ padding: 50 }}>
    <App gameID="multi" playerID="0" />
    <App gameID="multi" playerID="1" />
  </div>
);

export default Multiplayer;
