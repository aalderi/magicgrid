import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './GridCell.css';

class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transition: ''
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.value !== nextProps.value ||
      this.state.transition !== nextState.transition) {
      return true;
    }

    return false;
  }

  componentDidUpdate(prevProps, prevState) {
    const { value } = this.props;

    if (prevProps.value !== value) {
      this.setState({ transition: value === 0 ? 'emptied' : 'add' });
    }

    if (this.state.transition !== '') {
      setTimeout(() => this.setState({ transition: '' }), 0);
    }
  }

  render() {
    const { handleCellClick, position, value } = this.props;
    const { transition } = this.state;

    const cellClassNames = classnames('grid-cell', {
      'grid-cell-add-value': transition === 'add',
      'grid-cell-emptied-value': transition === 'emptied'
    });

    return <div className={cellClassNames}
                onClick={() => handleCellClick(position)}>
        {value > 0 && value}
      </div>;
  }
}

Cell.defaultProps = {
  value: 0,
  position: {
    columnIndex: 0,
    rowIndex: 0
  },
  handleCellClick: () => {}
};

Cell.propTypes = {
  position: PropTypes.object,
  value: PropTypes.number,
  handleCellClick: PropTypes.func
};

export default Cell;
