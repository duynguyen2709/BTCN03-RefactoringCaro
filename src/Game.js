import React from "react";
import "./index.css";
import RestartButton from './components/RestartButton';
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
            win: false
        };

        this.handleClickRestartButton = this.handleClickRestartButton.bind(this);
        this.handleOnClickSquare = this.handleOnClickSquare.bind(this);
        this.getStatus = this.getStatus.bind(this);
        this.renderBoard = this.renderBoard.bind(this);

        this.init();
    }

    init() {
        for (let i = 0; i < NO_OF_ROW; i++) {
            this.BASE_COL.push(i);
            this.BASE_ROW.push(i);
        }
    }

    handleClickRestartButton() {
        this.setState({
            squares: Array(NO_OF_ROW).fill(Array(NO_OF_COL).fill(null)),
            isXNext: true,
            totalChecked: 0,
            win: false
        })
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

        const currentSymbol = this.state.isXNext ? "X" : "O";

        const newArray = this.state.squares.map(function (arr) {
            return arr.slice();
        });
        newArray[i][j] = currentSymbol;

        this.setState({
            squares: newArray,
            isXNext: !this.state.isXNext,
            totalChecked: this.state.totalChecked + 1
        });

        const check = checkWinCondition(newArray, i, j);

        if (check != null) {
            this.setState({
                win: true
            })
        }
    }

    renderBoard() {
        return this.BASE_ROW.map((r) => (

            <div key={"r" + r}
                 className="board-row">

                {this.BASE_COL.map((c) =>
                    (<React.Fragment key={"c" + c}>

                        <Square value={this.state.squares[r][c]} onClick={() => this.handleOnClickSquare(r, c)}/>

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
                    </div>
                </div>
            </div>
        );
    }
}

export default Game;
