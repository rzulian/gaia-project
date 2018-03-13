import { colors, buildType, cellType } from './constants';

function checkHabitability(player, cell) {
  //the cell is a planet and it's empty
  if (cell.cellType !== cellType.PLANET && cell.buildType !== buildType.NONE) {
    return false;
  }

  //check if the player has enough ore to pay terraforming
  let diff =
    colors.findIndex(player.faction.color) - colors.findIndex(cell.color);
  if (diff > 3) {
    diff -= 7;
  } else if (diff < -3) {
    diff += 7;
  }
  let terraforming_steps = Math.abs(diff);

  return (
    terraforming_steps <=
      player.faction.navigation_range + player.faction.navigation_boost
  );
}

function checkAccessibility(player, cell) {
  return 
    true // dist <= player.faction.navigation_range + player.faction.navigation_boost;
}

function placeFirstStructure(G, ctx, id) {
  let cells = [...G.cells];
  let players = [...G.players];

  if (cells[id].color === players[ctx.currentPlayer].faction.color) {
    // will be different for Ivitis - places planetary institute

    cells[id].buildType = players[
      ctx.currentPlayer
    ].faction.placeFirstStructure();
    cells[id].player = ctx.currentPlayer;

    return { ...G, cells, players };
  }
}

function buildMine(G, ctx, id) {
  let cells = [...G.cells];
  let players = [...G.players];

  let isHabitable = checkHabitability(players[ctx.currentPlayer], cells[id]);
  let isAccessible = checkAccessibility(ctx.currentPlayer, id);
  let isEmpty = cells[id].buildType == buildType.NONE;

  if (isEmpty && isAccessible && isHabitable) {
    if (players[ctx.currentPlayer].faction.buildMine()) {
      cells[id].player = ctx.currentPlayer;
      cells[id].buildType = buildType.MINE;
      //reset terreorming step frre and navigation boost
      //pay for terraforming
      return { ...G, cells, players };
    }
  }
}

function burn(G, ctx, num_power) {
  let players = [...G.players];
  players[ctx.currentPlayer].faction.discard_free_action(num_power);
  return { ...G, players };
}
function charge(G, ctx, num_power) {
  let players = [...G.players];
  players[ctx.currentPlayer].faction.charge(num_power);
  return { ...G, players };
}

export default {
  placeFirstStructure,
  buildMine,
  burn,
  charge
};
