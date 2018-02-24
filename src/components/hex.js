/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from 'react';
import PropTypes from 'prop-types';

/**
 * HexGrid
 *
 * Component to display a hex grid.
 * Reference: https://www.redblobgames.com/grids/hexagons/.
 *
 * We use cube co-ordinates (see reference).
 *
 * Props:
 *   radius     - The number of levels around the central hex.
 *   style      - CSS style of the HTML element.
 *
 * Usage:
 *
 * <HexGrid radius={5}>
 *   <Hex x={0} y={0} z={0}/>
 * </HexGrid>
 */
export class HexGrid extends React.Component {
  static propTypes = {
    radius: PropTypes.number.isRequired,
    cols: PropTypes.number,
    rows: PropTypes.number,
    outline: PropTypes.bool,
    style: PropTypes.object,
    hexSize: PropTypes.number,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.element
    ])
  };

  static defaultProps = {
    radius: 5,
    outline: true,
    hexSize: 1
  };

  _getOutline() {
    if (!this.props.outline) {
      return null;
    }

    // let hexes = [];
    // const r = this.props.radius;
    // for (let x = -r; x <= r; x++) {
    //   for (let y = -r; y <= r; y++) {
    //     const z = - x - y;
    //     if (Math.abs(z) > r) continue;
    //     hexes.push(
    //       <Hex key={`${x}:${y}:${z}`}
    //            x={x} y={y} z={z}
    //            size={this.props.hexSize} />);
    //   }
    // }

    let hexes = [];
    const map_width = this.props.cols - 1;
    const map_height = this.props.rows - 1;
    const r = this.props.radius;
    for (let x = 0; x <= map_width; x++) {
      const x_offset = Math.floor(x / 2);
      for (let y = -x_offset; y <= map_height - x_offset; y++) {
        const z = -x - y;
        hexes.push(
          <Hex
            key={`${x}:${y}:${z}`}
            x={x}
            y={y}
            z={z}
            size={this.props.hexSize}
          />
        );
      }
    }

    //     unordered_set<Hex> map;
    // for (int q = 0; q < map_width; q++) {
    //     int q_offset = floor(q/2); // or q>>1
    //     for (int r = -q_offset; r < map_height - q_offset; r++) {
    //         map.insert(Hex(q, r, -q-r));

    //     unordered_set<Hex> map;
    // for (int q = -map_radius; q <= map_radius; q++) {
    //     int r1 = max(-map_radius, -q - map_radius);
    //     int r2 = min(map_radius, -q + map_radius);
    //     for (int r = r1; r <= r2; r++) {
    //         map.insert(Hex(q, r, -q-r));

    return hexes;
  }

  render() {
    const t = this.props.hexSize ;
    return (
      <svg
        //viewBox={-t + ' ' + -t + ' ' + 2 * t + ' ' + 2 * t}
        viewBox={
          -t +
          ' ' +
          -t * this.props.rows*2 +
          ' ' +
          this.props.cols * t *2+
          ' ' +
          this.props.rows * t*3
        }
        style={this.props.style}
      >
        <g>{this._getOutline()}</g>
        {this.props.children}
      </svg>
    );
  }
}

/**
 * Hex (flat-topped).
 *
 */
export class Hex extends React.Component {
  static propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    z: PropTypes.number,
    size: PropTypes.number
  };

  static defaultProps = {
    size: 1,
    x: 0,
    y: 0,
    z: 0
  };

  state = {
    highlight: false
  };

  constructor(props) {
    super(props);
  }

  get width() {
    return this.props.size * 2;
  }

  get height() {
    return (Math.sqrt(3) / 2 * this.width).toFixed(3);
  }

  /**
   * Get the co-ordinates of the hex center.
   * cube to axial coordinates (using x,y)
   */
  get center() {
    const q = this.props.x;
    const r = this.props.y;
    const x = this.props.size * 3 * q / 2.0;
    const y = this.props.size * Math.sqrt(3) * (r + q / 2.0);
    return { x, y };
  }

  /**
   * Get the points of the vertices.
   */
  get points() {
    //   b____c
    //   /    \
    // a/      \d
    //  \      /
    //   \____/
    //   f    e

    const s = this.props.size;
    const h = this.height;

    const xa = -s;
    const xb = -s / 2.0;
    const xc = +s / 2.0;
    const xd = +s;
    const xe = xc;
    const xf = xb;

    const ya = 0.0;
    const yb = h / 2.0;
    const yc = yb;
    const yd = ya;
    const ye = -h / 2.0;
    const yf = ye;

    const flatTop = [
      `${xa},${ya}`,
      `${xb},${yb}`,
      `${xc},${yc}`,
      `${xd},${yd}`,
      `${xe},${ye}`,
      `${xf},${yf}`
    ];

    return flatTop.join(' ');
  }

  onClick = () => {
    this.setState(old => ({ highlight: !old.highlight }));
  };

  render() {
    const sx = this.center.x;
    const sy = this.center.y;

    const col= this.props.x;
    const row= this.props.y + ( this.props.x - ( this.props.x & 1))/2;

  
    const fill = this.state.highlight ? '#aaa' : '#fff';

    return (
      <g className="hex" transform={`translate(${sx}, ${sy})`}>
        <polygon
          points={this.points}
          onClick={this.onClick}
          fill={fill}
          stroke="#aaa"
          strokeWidth={0.01}
        />
        <text
          x={0.3}
          y={0.3}
          font-family="Verdana"
          font-size="0.1"
          fill="red"
        >
          {this.props.x},{this.props.y},{this.props.z} 
          c{this.props.x},{row}
        </text>
      </g>
    );
  }
}
