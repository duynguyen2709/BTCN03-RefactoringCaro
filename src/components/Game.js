import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React from 'react';
import '../index.css';
import RestartButton from './RestartButton';
import MoveHistory from './MoveHistory';
import Square from './Square';
import { checkWinCondition, isBoardFull } from '../utils/GameCheckUtil';
import { NO_OF_ROW, NO_OF_COL, ActionConstant } from '../utils/Constants';

class Game extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      squares: Array(NO_OF_ROW).fill(Array(NO_OF_COL).fill(null)),
      isXNext: true,
      totalChecked: 0,
      win: false,
      historyMoves: [],
      historySquares: [],
      currentSelected: -1,
      currentTurn: 0
    };

    this.resetTable = this.resetTable.bind(this);
    this.handleClickRestartButton = this.handleClickRestartButton.bind(this);
    this.handleOnClickSquare = this.handleOnClickSquare.bind(this);
    this.getStatus = this.getStatus.bind(this);
    this.renderBoard = this.renderBoard.bind(this);
    this.setCurrentSelected = this.setCurrentSelected.bind(this);

    props.init();
  }

  setCurrentSelected(select) {
    this.setState({
      currentSelected: select
    });
  }

  getStatus(color = 'red') {
    const currentSymbol = this.state.isXNext ? 'O' : 'X';
    const nextSymbol = this.state.isXNext ? 'X' : 'O';

    let text = <p>Lượt tiếp theo : {nextSymbol}</p>;

    if (this.state.win) {
      text = <p style={{ color }}>Người thắng: {currentSymbol}</p>;
    } else if (isBoardFull(this.state.totalChecked)) {
      text = <p>Hoà !</p>;
    }
    return text;
  }

  handleClickRestartButton() {
    this.setState({
      squares: Array(NO_OF_ROW).fill(Array(NO_OF_COL).fill(null)),
      isXNext: true,
      totalChecked: 0,
      win: false,
      historyMoves: [],
      historySquares: [],
      currentSelected: -1,
      currentTurn: 0
    });

    const rows = document.getElementsByClassName('rt-tr-group');
    rows[0].scrollIntoView(false);

    const cells = document.getElementsByClassName('square');

    for (let i = 0; i < cells.length; i++)
      cells[i].style.backgroundColor = '#eff1bc';
  }

  handleOnClickSquare(i, j) {
    if (this.state.squares[i][j] != null || this.state.win) {
      return;
    }

    if (this.state.currentTurn < this.state.historySquares.length) {
      this.state.historySquares = this.state.historySquares.slice(0, this.state.currentTurn);
      this.state.historyMoves = this.state.historyMoves.slice(0, this.state.currentTurn);
    }

    const currentSymbol = this.state.isXNext ? 'X' : 'O';

    const elementClicked = {
      id: this.state.totalChecked + 1,
      symbol: currentSymbol,
      row: i + 1,
      column: j + 1
    };

    this.state.historyMoves.push(elementClicked);

    const { squares } = this.state;
    const newArray = squares.map(arr => arr.slice());
    newArray[i][j] = currentSymbol;

    this.state.historySquares.push(newArray);

    const { isXNext, totalChecked, historyMoves, historySquares, currentTurn } = this.state;

    this.setState({
      squares: newArray,
      isXNext: !isXNext,
      totalChecked: totalChecked + 1,
      historyMoves,
      historySquares,
      currentSelected: totalChecked,
      currentTurn: currentTurn + 1
    }, () => {
      const rows = document.getElementsByClassName('rt-tr-group');
      if (this.state.currentSelected > 10) {
        rows[this.state.currentSelected + 1].scrollIntoView(false);
      } else {
        rows[0].scrollIntoView(false);
      }
    });

    const check = checkWinCondition(newArray, i, j);

    if (check != null) {
      this.setState({
        win: true
      });
    }
  }

  resetTable(index) {
    const { historySquares } = this.state;
    this.setState({
      squares: historySquares[index],
      isXNext: index % 2 === 1,
      currentTurn: index + 1,
      currentSelected: index,
      totalChecked: index + 1
    });
  }

  renderBoard() {
    return this.props.BASE_ROW.map((r) => (

      <div key={`r${r}`}
           className="board-row">

        {this.props.BASE_COL.map((c) =>
          (<React.Fragment key={`c${c}`}>

            <Square id={`${r}_${c}`} value={this.state.squares[r][c]} onClick={() => this.handleOnClickSquare(r, c)}/>

          </React.Fragment>))}
      </div>));
  }

  render() {
    return (
      <div className="container">
        <div className="game">
          <div className="game-board">
            {this.renderBoard()}
          </div>

          <div>
            <div className="game-info">
              {this.getStatus()}
            </div>

            <RestartButton onClick={this.handleClickRestartButton}/>

            <MoveHistory data={this.state.historyMoves}
                         resetTable={this.resetTable}
                         currentSelected={this.state.currentSelected}
                         setCurrentSelected={this.setCurrentSelected}
            />

          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    BASE_ROW: state.baseRow,
    BASE_COL: state.baseColumn
  };
}

function mapDispatchToProps(dispatch) {
  return {
    init: () => dispatch({ type: ActionConstant.INIT_BOARD })
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Game);
