// buildType: 0: none, 1:mine , 2: trading station, 3: researl lab, 4: accademy , 5: planetary institute,
// 7: gaia former, 8: satellite

const buildType = {
  NONE: 'none',
  MINE: 'mine',
  TRADING_STATION: 'trading station',
  RESEARCH_LAB: 'research lab',
  ACCADEMY: 'accademy',
  PLANETARY_INSTITUTE: 'planetary institute',
  GAIA_FORMER: 'gaia former',
  SATELLITE: 'satellite'
};

const cellType = {
  SPACE: 'space',
  PLANET: 'planet',
  LOST_PLANET: 'lost planet',
  EMPTY: 'empty'
};

const colors = {
  BLUE: 'blue',
  RED: 'red',
  ORANGE: 'orange',
  YELLOW: 'yellow',
  BROWN: 'brown',
  GRAY: 'gray',
  WHITE: 'white'
};

module.exports = {
  buildType,
  cellType,
  colors
};
