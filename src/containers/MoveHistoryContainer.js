import { connect } from 'react-redux';
import { resetTable, setCurrentSelected } from '../actions/Actions';
import MoveHistory from '../components/MoveHistory';

function mapStateToProps(state) {
  return {
    data : state.historyMoves,
    currentSelected : state.currentSelected,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentSelected: (val) => dispatch(setCurrentSelected(val)),
    resetTable: (index) => dispatch(resetTable(index))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MoveHistory);