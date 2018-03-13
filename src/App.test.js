import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { MemoryRouter } from 'react-router';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';
import { createGameReducer } from 'boardgame.io/core';
import * as Redux from 'redux';

Enzyme.configure({ adapter: new Adapter() });

const Grid = n => Array(n).fill(null);

// This wraps up the App in a MemoryRouter, which let's us set the route how we want
const RoutedApp = props => (
  <MemoryRouter initialEntries={[props.route]}>
    <App />
  </MemoryRouter>
);
RoutedApp.propTypes = {
  route: PropTypes.string,
};

test('sanity', () => {
  Enzyme.mount(<RoutedApp route="/" />);
});

test('makeMove buildFirstBuild', () => {
  const game = Enzyme.mount(<RoutedApp route="" />);
  const board = game.find('Board').instance();
  //board.props.moves.placeFirstStructure(0);

  const store = Redux.createStore(createGameReducer({game}));

  store.dispatch(makeMove('placeFirstStructure', [0]));
  //board.props.moves.placeFirstStructure(0);

  expect(board.props.G.cells[0].player).toEqual('0');
  expect(board.props.G.players[0].faction.mines.mines).toEqual(7);
  
   
  store.dispatch(gameEvent('endTurn'));
  expect(game.ctx.currentPlayer).toBe('1');

 
  let state = { G: {}, ctx: flow.ctx(2) };
  state = flow.processGameEvent(state, { type: 'endTurn' });
  expect(state.ctx.gameover).toBe(undefined);



  // test mine first build for first faction
 
});