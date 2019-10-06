import React from 'react';
import '../index.css';
import RestartButton from './RestartButton'
import Square from './Square';
import { isBoardFull, resetColor } from '../utils/GameCheckUtil';
import MoveHistoryContainer from '../containers/MoveHistoryContainer';

class Game extends React.Component {

  constructor(props) {
    super(props);

    this.handleClickRestartButton = this.handleClickRestartButton.bind(this);
    this.handleOnClickSquare = this.handleOnClickSquare.bind(this);
    this.getStatus = this.getStatus.bind(this);
    this.renderBoard = this.renderBoard.bind(this);

    props.initBoard();
  }

  getStatus() {
    const currentSymbol = this.props.isXNext ? 'O' : 'X';
    const nextSymbol = this.props.isXNext ? 'X' : 'O';

    let text = <p>Lượt tiếp theo : {nextSymbol}</p>;

    if (this.props.win) {
      text = <p style={{ color: 'red' }}>Người thắng: {currentSymbol}</p>;
    } else if (isBoardFull(this.props.totalChecked)) {
      text = <p>Hoà !</p>;
    }
    return text;
  }

  handleClickRestartButton() {
    this.props.resetBoard();

    const rows = document.getElementsByClassName('rt-tr-group');
    rows[0].scrollIntoView(false);

    resetColor();
  }

  handleOnClickSquare(i, j) {
    if (this.props.squares[i][j] != null || this.props.win) {
      return;
    }

    this.props.onClickSquare(i, j);

    const rows = document.getElementsByClassName('rt-tr-group');
    if (this.props.currentSelected >= 10) {
      rows[this.props.currentSelected + 1].scrollIntoView(false);
    } else {
      rows[0].scrollIntoView(false);
    }
  }

  renderBoard() {
    return this.props.BASE_ROW.map((r) => (

      <div key={`r${r}`}
           className="board-row">

        {this.props.BASE_COL.map((c) =>
          (<React.Fragment key={`c${c}`}>

            <Square id={`${r}_${c}`} value={this.props.squares[r][c]} onClick={() => this.handleOnClickSquare(r, c)}/>

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

            <MoveHistoryContainer />
          </div>
        </div>
      </div>
    );
  }
}

export default Game;