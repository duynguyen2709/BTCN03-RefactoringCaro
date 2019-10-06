import { connect } from 'react-redux';
import {initBoard, resetBoard, setCurrentSelected, onClickSquare} from '../actions/Actions';
import Game from '../components/Game';

function mapStateToProps(state) {
  return {
    BASE_ROW: state.baseRow,
    BASE_COL: state.baseColumn,

    squares: state.squares,
    isXNext: state.isXNext,
    totalChecked: state.totalChecked,
    win: state.win,
    currentSelected: state.currentSelected,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    initBoard: () => dispatch(initBoard()),
    resetBoard: () => dispatch(resetBoard()),
    setCurrentSelected: (val) => dispatch(setCurrentSelected(val)),
    onClickSquare: (i, j) => dispatch(onClickSquare(i, j)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);