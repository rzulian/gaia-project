import React from 'react';
import PropTypes from 'prop-types';

//import { HexGrid } from './hex';
import  Token  from './token';

//import './board.css';

class Board extends React.Component {
  static propTypes = {
    G: PropTypes.any.isRequired,
    ctx: PropTypes.any.isRequired,
    moves: PropTypes.any,
    events: PropTypes.any
  };

  state = {
    x: 0,
    y: 0,
    z: 0
  };

  clickCard = card => {
    this.props.moves.playCard(card);
  };

  clickHex = ({ x, y, z }) => {
    this.setState({ x, y, z });
  };

  render() {
    return (
       <div className="mk">
 

        {/* <HexGrid radius={6} cols={5} rows={3} style={{width: '800px'}} onClick={this.clickHex}>
          <Token
            x={this.state.x}
            y={this.state.y}
            z={this.state.z}
            animate={true}
            style={{ fill: '#555' }}
          />
        </HexGrid> */}
      </div>
    );
  }
}

/* const App = Client({
  game: ComplexGame,
  numPlayers: 1,
  board: Board,
  debug: false,
});

const Render = () => (
  <div style={{ padding: 50 }}>
    <App gameID="single" />
  </div>
);
 */
export default Board;
