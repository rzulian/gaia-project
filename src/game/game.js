import { Game, TurnOrder } from 'boardgame.io/core';
import HadschHallas from './factions/hadschhallas';
import Moves from './moves';


export function getInitialState() {
  const G = {
    cells: [],
    players: {}
  };
  G.cells = Array(9).fill(null);
  // buildType: 0: none, 1:mine , 2: trading station, 3: researl lab, 4: accademy , 5: planetary institute,
  // 7: gaia former, 8: satellite
  G.cells[0] = { active: null, color: 'red', player: null, buildType: null };
  G.cells[1] = { active: null, color: 'yellow', player: null, buildType: null };

  G.players = [
    { faction: new HadschHallas() },
    { faction: new HadschHallas() }
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
        allowedMoves: ['buildFirstBuild'], 
        turnOrder: TurnOrder.REVERSE,
        //  {
        //   first: function first(G, ctx) {
        //     return ctx.numPlayers - 1+'';
        //   },
        //   next: function next(G, ctx) {
        //     if ((ctx.currentPlayer = 0)) return;
        
        //     return (+ctx.currentPlayer - 1)+'';
        //   }}, 
        // // endPhaseIf: (G,ctx,)=>{if (G.cells[0].buildType===0) {return '0'} else {return 'actions'}}
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
