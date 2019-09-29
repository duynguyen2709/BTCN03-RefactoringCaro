import React from "react";
import "./index.css";
import RestartButton from './components/RestartButton';
import MoveHistory from './components/MoveHistory';
import Square from './components/Square';
import {checkWinCondition, isBoardFull} from "./utils/GameCheckUtil";

export const NO_OF_ROW = 20;
export const NO_OF_COL = 20;

export const NUM_TO_WIN = 5;

class Game extends React.Component {

    constructor(props) {
        super(props);

        this.BASE_ROW = [];
        this.BASE_COL = [];

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

        this.init();
    }

    init() {
        for (let i = 0; i < NO_OF_ROW; i++) {
            this.BASE_COL.push(i);
            this.BASE_ROW.push(i);
        }
    }

    resetTable(index){
        this.setState({
            squares: this.state.historySquares[index],
            isXNext: index % 2 === 1,
            currentTurn: index + 1,
            currentSelected: index,
            totalChecked: index + 1
        });
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

        const rows = document.getElementsByClassName("rt-tr-group");
        rows[0].scrollIntoView(false);

        for (let cell of document.getElementsByClassName("square")){
            cell.style.backgroundColor = "#eff1bc";
        }

    }

    getStatus(color = 'red') {
        const currentSymbol = this.state.isXNext ? "O" : "X";
        const nextSymbol = this.state.isXNext ? "X" : "O";

        let text = <p>Lượt tiếp theo : {nextSymbol}</p>;

        if (this.state.win) {
            text = <p style={{color: color}}>Người thắng: {currentSymbol}</p>;
        } else if (isBoardFull(this.state.totalChecked)) {
            text = <p>Hoà !</p>;
        }
        return text;
    }

    handleOnClickSquare(i, j) {
        if (this.state.squares[i][j] != null || this.state.win) {
            return;
        }

        if (this.state.currentTurn < this.state.historySquares.length){
            this.state.historySquares = this.state.historySquares.slice(0, this.state.currentTurn);
            this.state.historyMoves = this.state.historyMoves.slice(0, this.state.currentTurn);
        }

        const currentSymbol = this.state.isXNext ? "X" : "O";

        const elementClicked = {
            id: this.state.totalChecked + 1,
            symbol: currentSymbol,
            row: i + 1,
            column: j + 1
        };

        this.state.historyMoves.push(elementClicked);

        const newArray = this.state.squares.map(function (arr) {
            return arr.slice();
        });
        newArray[i][j] = currentSymbol;

        this.state.historySquares.push(newArray);

        this.setState({
            squares: newArray,
            isXNext: !this.state.isXNext,
            totalChecked: this.state.totalChecked + 1,
            historyMoves: this.state.historyMoves,
            historySquares: this.state.historySquares,
            currentSelected: this.state.totalChecked,
            currentTurn: this.state.currentTurn + 1,
        },() => {
            const rows = document.getElementsByClassName("rt-tr-group");
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
            })
        }
    }

    setCurrentSelected(select){
        this.setState({
            currentSelected: select
        })
    }

    renderBoard() {
        return this.BASE_ROW.map((r) => (

            <div key={"r" + r}
                 className="board-row">

                {this.BASE_COL.map((c) =>
                    (<React.Fragment key={"c" + c}>

                        <Square id={r + "_" + c} value={this.state.squares[r][c]} onClick={() => this.handleOnClickSquare(r, c)}/>

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

export default Game;
