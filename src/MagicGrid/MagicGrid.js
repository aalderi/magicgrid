import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getInitialGrid, increaseCellValues } from './grid-helpers';
import GridRow from './GridRow';

import './MagicGrid.css';

class MagicGrid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      grid: getInitialGrid(props.size)
    };
  }

  increaseCellNumbers = position => this.setState({ grid: increaseCellValues(this.state.grid, this.props.size, position) });

  render() {
    return <div className="magicgrid">
        {this.state.grid.map((rowData, index) =>
            <GridRow rowData={rowData}
                     rowIndex={index}
                     handleCellClick={this.increaseCellNumbers}
                     key={`key-${index}`} />)}
      </div>;
  }
}

MagicGrid.defaultProps = {
  number: 50
};

MagicGrid.propTypes = {
  size: PropTypes.number
};

export default MagicGrid;
