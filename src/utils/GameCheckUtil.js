import {NO_OF_ROW, NO_OF_COL, NUM_TO_WIN} from "../Game";

function checkWinCondition(squares, i, j) {

    const currentSymbol = squares[i][j];

    function checkRow() {
        let res = 0;
        let curr = 0;
        let endIndex = 0;

        for (let col = 0; col < NO_OF_COL; col++) {
            if (squares[i][col] === currentSymbol) {
                curr++;
            } else {
                curr = 0;
            }

            if (curr > res) {
                res = curr;
                endIndex = col;
            }
        }

        if (res >= NUM_TO_WIN) {
            let startIndex = endIndex;
            let row = squares[i];
            while (row[startIndex] === currentSymbol) {
                startIndex--;

                if (startIndex < 0) break;
            }

            startIndex++;

            // at start or end square
            if (startIndex === 0 || endIndex === NO_OF_COL - 1)
                return true;
            // empty next square
            if (row[startIndex - 1] == null || row[endIndex + 1] == null)
                return true;
            //block head & tail
            if (row[startIndex - 1] === row[endIndex + 1] && row[startIndex - 1] !== currentSymbol)
                return false;

            return true;
        }

        return false;
    }

    function checkColumn() {
        let res = 0;
        let curr = 0;
        let endIndex = 0;
        for (let row = 0; row < NO_OF_ROW; row++) {
            if (squares[row][j] === currentSymbol) {
                curr++;
            } else {
                curr = 0;
            }

            if (curr > res) {
                res = curr;
                endIndex = row;
            }
        }

        if (res >= NUM_TO_WIN) {
            let startIndex = endIndex;

            while (squares[startIndex][j] === currentSymbol) {
                startIndex--;

                if (startIndex < 0)
                    break;
            }

            startIndex++;

            // at start or end square
            if (startIndex === 0 || endIndex === NO_OF_ROW - 1)
                return true;

            // empty next square
            if (squares[startIndex - 1][j] == null || squares[endIndex + 1][j] == null)
                return true;

            //block head & tail
            if (squares[startIndex - 1][j] === squares[endIndex + 1][j] && squares[startIndex - 1][j] !== currentSymbol)
                return false;

            return true;
        }

        return false;
    }

    function checkDiag() {
        let res = 0;
        let curr = 0;

        let row = i;
        let col = j;

        while (row > 0 && col > 0) {
            row--;
            col--;
        }

        let endIndex = [row, col];

        while (row < NO_OF_ROW && col < NO_OF_COL) {
            if (squares[row][col] === currentSymbol) {
                curr++;
            } else {
                curr = 0;
            }

            if (curr > res) {
                res = curr;
                endIndex = [row, col];
            }
            row++;
            col++;
        }

        if (res >= NUM_TO_WIN) {
            let startIndex = [...endIndex];

            while (squares[startIndex[0]][startIndex[1]] === currentSymbol) {
                startIndex[0]--;
                startIndex[1]--;

                if (startIndex[0] < 0 || startIndex[1] < 0)
                    break;
            }
            startIndex[0]++;
            startIndex[1]++;

            // at start or end square
            if (startIndex[0] === 0 || startIndex[1] === 0 || endIndex[0] === NO_OF_ROW - 1 || endIndex[1] === NO_OF_ROW - 1)
                return true;

            // empty next square
            if (squares[startIndex[0] - 1][startIndex[1] - 1] == null || squares[endIndex[0] + 1][endIndex[1] + 1] == null)
                return true;

            //block head & tail
            if (squares[startIndex[0] - 1][startIndex[1] - 1] === squares[endIndex[0] + 1][endIndex[1] + 1]
                && squares[startIndex[0] - 1][startIndex[1] - 1] !== currentSymbol)
                return false;

            return true;
        }

        return false;
    }

    function checkAntiDiag() {
        let res = 0;
        let curr = 0;

        let row = i;
        let col = j;

        while (row > 0 && col < NO_OF_COL - 1) {
            row--;
            col++;
        }

        let endIndex = [row, col];

        while (row < NO_OF_ROW && col >= 0) {
            if (squares[row][col] === currentSymbol) {
                curr++;
            } else {
                curr = 0;
            }

            if (curr > res) {
                res = curr;
                endIndex = [row, col];
            }
            row++;
            col--;
        }

        if (res >= NUM_TO_WIN) {
            let startIndex = [...endIndex];

            while (squares[startIndex[0]][startIndex[1]] === currentSymbol) {
                startIndex[0]--;
                startIndex[1]++;

                if (startIndex[0] < 0 || startIndex[1] === NO_OF_COL)
                    break;
            }
            startIndex[0]++;
            startIndex[1]--;

            // at start or end square
            if (startIndex[0] === 0 || startIndex[1] === NO_OF_COL - 1 ||
                endIndex[0] === NO_OF_ROW - 1 || endIndex[1] === 0)
                return true;

            // empty next square
            if (squares[startIndex[0] - 1][startIndex[1] + 1] == null || squares[endIndex[0] + 1][endIndex[1] - 1] == null)
                return true;

            //block head & tail
            if (squares[startIndex[0] - 1][startIndex[1] + 1] === squares[endIndex[0] + 1][endIndex[1] - 1]
                && squares[startIndex[0] - 1][startIndex[1] + 1] !== currentSymbol)
                return false;

            return true;
        }

        return false;
    }

    const nRow = checkRow();
    const nCol = checkColumn();
    const nDiag = checkDiag();
    const nAntiDiag = checkAntiDiag();

    if (nRow || nCol || nDiag || nAntiDiag)
        return currentSymbol;

    return null;

}

function isBoardFull(totalChecked) {

    return totalChecked >= NO_OF_ROW * NO_OF_COL;
}

export {checkWinCondition, isBoardFull};