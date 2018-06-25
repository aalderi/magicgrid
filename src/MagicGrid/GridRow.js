import React from 'react';
import PropTypes from 'prop-types';
import GridCell from './GridCell';

import './GridRow.css';

function GridRow({
  rowData,
  rowIndex,
  handleCellClick = () => {}
}) {
  return <div className="grid-row">
      {rowData.map((cellValue, columnIndex) => 
        <GridCell value={cellValue}
                  position={{
                    columnIndex,
                    rowIndex
                  }}
                  handleCellClick={handleCellClick}
                  key={`cell-${rowIndex}-${columnIndex}`} />)}
    </div>;
}

GridRow.propTypes = {
  rowData: PropTypes.array,
  rowIndex: PropTypes.number,
  handleCellClick: PropTypes.func
};

export default GridRow;
