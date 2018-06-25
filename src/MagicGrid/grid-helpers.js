import _ from 'lodash';

const MAX_VALUE = 99;
const FIBO_SIZE = 5;

const isNotEqual = (a1, a2) => a1.some((el, index) => el !== a2[index]);

const fibonacciSeries = (() => {
  const fiboSeries = [1 , 1];
  let i = 2;

  while (true) {
    const fiboNumber = fiboSeries[i - 2] + fiboSeries[i - 1];

    if (fiboNumber < MAX_VALUE + 1) {
      fiboSeries.push(fiboNumber);
    } else {
      return fiboSeries.join() + ',';
    }

    i++;
  }
})();

const getRow = (grid, rowNumber, gridSize) => grid.slice(rowNumber * gridSize, (rowNumber * gridSize) + gridSize);

const replaceRow = (grid, rowNumber, newRow, gridSize) => {
  const newGrid = grid.concat();
  newGrid.splice(rowNumber * gridSize, gridSize, ...newRow);
  return newGrid;
}

const getColumn =  (grid, columnNumber, gridSize) => {
  const column = [];
  for (let i = 0; i < gridSize; i++) {
    column.push(grid[(i * gridSize) + columnNumber]);
  }
  return column;
};

const replaceColumn = (grid, columnNumber, newColumn, gridSize) => newColumn.reduce((newGrid, value, rowIndex) => {
  newGrid[(rowIndex * gridSize) + columnNumber] = value;
  return newGrid;
}, grid.concat());

const isPartOfRow = (index, start, gridSize) => index >= start && index < start + gridSize;
const isPartOfColumn = (index, columnIndex, gridSize) => (index - columnIndex) % gridSize === 0;
const isPartOfRowOrColumn = (index, gridSize, { columnIndex, rowIndex }) => isPartOfRow(index, rowIndex * gridSize, gridSize) || isPartOfColumn(index, columnIndex, gridSize);

const isFibonacciSeries = numbers => fibonacciSeries.includes(numbers.join() + ',');

const increaseRowAndColumnValues = (grid, position, gridSize) => grid.map((value, index) => isPartOfRowOrColumn(index, gridSize, position) && value < MAX_VALUE ? ++value : value);

const getEmptiedFiboSeries = numbers => {
  const newNumbers = numbers.concat();
  const numbersLength = numbers.length - FIBO_SIZE + 1;
  const toBeEmptied = [];

  for (let i = 0; i < numbersLength; i++) {
    if (isFibonacciSeries(numbers.slice(i, i + FIBO_SIZE))) {
      toBeEmptied.push(i);
    }
  }

  toBeEmptied.forEach(index => newNumbers.fill(0, index, index + FIBO_SIZE));

  return newNumbers;
}

const emptyFiboSeries = (grid, gridSize) => {
  let newGrid = grid.concat();
  let columnGrid = grid.concat();
  let rowChanged = false;
  let columnChanged = false;

  for (let i = 0; i < gridSize; i++) {
    const row = getRow(grid, i, gridSize);
    const newRow = getEmptiedFiboSeries(row);

    if (isNotEqual(row, newRow)) {
      newGrid = replaceRow(newGrid, i, newRow, gridSize);
      rowChanged = true;
    }

    const column = getColumn(grid, i, gridSize);
    const newColumn = getEmptiedFiboSeries(column);

    if (isNotEqual(column, newColumn)) {
      columnGrid = replaceColumn(columnGrid, i, newColumn, gridSize);
      columnChanged = true;
    }
  }

  if (columnChanged) {
    if (rowChanged) {
      newGrid = newGrid.map((value, index) => columnGrid[index] === 0 ? 0 : value);
    } else {
      newGrid = columnGrid;
    }    
  }

  return newGrid;
};

export const getInitialGrid = gridSize => _.chunk(new Uint8Array(Math.pow(gridSize, 2)), gridSize);

export const increaseCellValues = (grid, gridSize, position) => {
  let newGrid = increaseRowAndColumnValues(_.flatten(grid), position, gridSize)
  newGrid = emptyFiboSeries(newGrid, gridSize);
  return _.chunk(newGrid, gridSize);
};
