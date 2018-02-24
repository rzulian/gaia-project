function buildFirstBuild(G, ctx, id) {
  let cells = [...G.cells];
  let players = [...G.players];

  if (cells[id].color = players[ctx.currentPlayer].faction.color) {
    if (players[ctx.currentPlayer].faction.buildMine()) {
      cells[id].player = ctx.currentPlayer;
      cells[id].buildType = 1;
      return { ...G, cells, players };
    }
  
  }
}

function buildMine(G, ctx, id) {
  let cells = [...G.cells];
  cells[id] = ctx.currentPlayer;
  return { ...G, cells };
}
function burn(G, ctx, num_power) {
  let players = [...G.players];
  players[ctx.currentPlayer].faction.burn(num_power);
  return { ...G, players };
}
function charge(G, ctx, num_power) {
  let players = [...G.players];
  players[ctx.currentPlayer].faction.charge(num_power);
  return { ...G, players };
}

export default {
  buildFirstBuild,
  buildMine,
  burn,
  charge
};
