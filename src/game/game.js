import { Game, TurnOrder } from 'boardgame.io/core';
import {HadschHallas} from './factions/hadschhallas';
import {Ivits} from './factions/ivits';
import Moves from './moves';
import { colors, buildType, cellType } from './constants';

export function getInitialState() {
  const G = {
    cells: [],
    players: {}
  };
  G.cells = Array(9).fill(null);

  G.cells[0] = { cellType: cellType.PLANET, active: null, color: colors.RED , player: null, buildType: buildType.NONE };
  G.cells[1] = { cellType: cellType.PLANET,active: null, color: colors.RED , player: null, buildType: buildType.NONE };

  G.players = [
    { faction: new HadschHallas() },
    { faction: new Ivits() }
  ];

  // Our game state is ready to go– return it!
  return G;
}


const GaiaProjectGame = Game({
  setup: getInitialState,

  moves: Moves,

  flow: {
   
    phases: [
      {
        name: 'setup',
        allowedMoves: ['placeFirstStructure'], 
        turnOrder: TurnOrder.DEFAULT,
              },
      {
        name: 'gaia'
      },
      {
        name: 'actions'
      }
    ]
  }
});

export default GaiaProjectGame;
