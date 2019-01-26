enum player {
  none = 0,
  player1 = 1,
  player2 = 2
}
export class connectFour {
  public board: number[][];
  public readonly player1: number;
  public readonly player2: number;
  private turn: boolean;
  constructor() {
    this.board = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0]
    ];
    this.player1 = player.player1;
    this.player2 = player.player2;
    this.turn = true;
  }
  private toggleTurn(): void {
    this.turn = !this.turn;
  }
  public getTurn(): number {
    return this.turn ? this.player1 : this.player2;
  }
  public placeMove(column: number): boolean {
    //return false if could not place the piece
    let placed: boolean = false;
    let currentPlayer: number = this.getTurn();
    for (let row = this.board.length - 1; row >= 0; row--) {
      if (this.board[row][column] === 0) {
        this.board[row][column] = currentPlayer;
        placed = true;
        this.toggleTurn();
        //change current player if we were able to place a piece
        break;
      }
    }
    return placed;
  }
  public checkWin(): player {
    let winner: player = 0;
    //check rows
    this.board.forEach((row: number[]) => {
      winner = winner || this.checkRow(row);
    });
    //check columns
    for (let col = 0; col < this.board.length; col++) {
      let column: number[] = [];
      for (let row = 0; row < this.board.length; row++) {
        column.push(this.board[row][col]);
      }
      winner = winner || this.checkRow(column);
    }
    //returns 0 if no winner
    return winner || this.checkMinorDiagonals() || this.checkMajorDiagonals();
  }
  private checkRow(row: number[]): player {
    let piece: player = row[0];
    let count: number = 1;
    for (let i = 1; i < row.length; i++) {
      if (piece === row[i]) {
        count++;
      }
      if (count === 4) {
        return piece;
      }
      if (piece !== row[i]) {
        count = 1;
      }
      piece = row[i];
    }
    //returns 0 if no win
    return player.none;
  }
  private checkMajorDiagonals(): player {
    let player: player = 0;
    let count: number = 0;
    //start at the 0 column
    let col: number = 0;
    let row: number = this.board.length - 1;
    do {
      player = this.board[row][col];
    } while (row >= 0 && col <= this.board[0].length);
    //start at row 5
    //increment both till off board
    //keep count
    return player;
  }
  private checkMinorDiagonals(): player {
    let player: player = 0;
    return player;
  }
}
