function ticTacToe(placeholder, gridSize, callback) {

    // Save the placeholder element 
    this.placeholder = placeholder;
    // Paint with board
    this.paint(gridSize);
    // Save callback
    this.callback = callback;
    // Save scores
    this.scores = {
        X: 0,
        O: 0
    };

    this.marks = {
        X: "X",
        O: "O",
        count: 0
    };

    return this;
}

ticTacToe.prototype.paint = function (gridSize) {

    const self = this;

    // Get number of columns, considering board as N x N board (3 x 3)
    this.gridSize = gridSize;

    let html = '<table id="gameBoard" align="center">';

    for (let i = 0; i < gridSize; i++) {
        html += '<tr>';
        for (let j = 0; j < gridSize; j++) {
            html += '<td></td>';
        }
        html += '</tr>';
    }

    html += '</table>';

    this.placeholder.innerHTML = html;

    // Find all columns from the board
    this.columns = this.placeholder.getElementsByTagName("td");

    // Go through all the columns and add click event
    for (let i = 0; i < this.columns.length; i++) {
        this.columns[i].addEventListener("click", markHandler);
    }

    // on click mark the column "<td>"
    function markHandler(e) {
        self.mark(e.target);
    }

};

ticTacToe.prototype.mark = function (column) {

    // Stop if column is not empty
    if (column.innerHTML) {
        return;
    }

    // Count move
    this.marks.count++;
    const current_mark = this.marks.count % 2 === 1 ? this.marks.X : this.marks.O;
    column.innerHTML = current_mark;
    column.classList.add(current_mark);

    // Check if this player won
    if (this.didWin(current_mark)) {
        if (this.marks.count % 2 === 1) {
            this.scores.X++;
        } else {
            this.scores.O++;
        }
        this.callback(current_mark, this.scores);
    } else if (this.marks.count === this.columns.length) {
        // Send result as draw
        this.callback("draw");
    }

};

ticTacToe.prototype.didWin = function (mark) {

    // Count columns
    const gridSize = this.gridSize;
    let horizontal_count;
    let vertical_count;
    let right_to_left_count = 0;
    let left_to_right_count = 0;

    for (let i = 0; i < gridSize; i++) {
        horizontal_count = vertical_count = 0;
        for (let j = 0; j < gridSize; j++) {
            // "0,1,2", "3,4,5", "6,7,8"
            if (this.columns[i * gridSize + j].innerHTML == mark) {
                horizontal_count++;
            }
            // "0,3,6", "1,4,7", "2,5,8"
            if (this.columns[j * gridSize + i].innerHTML == mark) {
                vertical_count++;
            }
        }
        // If horizontal or vertical combination is found the return true
        if (horizontal_count == gridSize || vertical_count == gridSize) {
            return true;
        }
        // "0,4,8"
        if (this.columns[i * gridSize + i].innerHTML == mark) {
            right_to_left_count++;
        }
        // "2,4,6"
        if (this.columns[(gridSize - 1) * (i + 1)].innerHTML == mark) {
            left_to_right_count++;
        }
    }
    // If mark is present diagnolly
    if (right_to_left_count == gridSize || left_to_right_count == gridSize) {
        return true;
    }
    return false;
};

ticTacToe.prototype.empty = function () {
    // Go through all columns and empty them
    for (let i = 0; i < this.columns.length; i++) {
        this.columns[i].innerHTML = '';
        this.columns[i].classList.remove(this.marks.X);
        this.columns[i].classList.remove(this.marks.O);
    }
    // Reset the count
    this.marks.count = 0;
};

ticTacToe.prototype.reset = function () {
    this.empty();
    this.scores = {
        X: 0,
        O: 0
    };
};




const placeholder = document.getElementById("placeholder");
const tictactoe = new ticTacToe(placeholder, 3, onResult);
function onResult(result, scores) {
    if (result == 'draw') {
        alert("It's a draw !");
    } else {
        alert(result + " has won");
        updateScores(scores.X, scores.O);
    }
    tictactoe.empty();
}

function updateScores(X, O) {
    document.querySelector("#scoreboard #player1").innerHTML = X;
    document.querySelector("#scoreboard #player2").innerHTML = O;
}

function restart(gridSize) {
    tictactoe.reset();
    updateScores(0, 0);
    if (gridSize) {
        tictactoe.paint(gridSize);
    }
}
