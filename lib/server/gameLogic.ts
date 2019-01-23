export class connectFour {
  public board: number[][];
  public player1: number;
  public player2: number;
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
    this.player1 = 1;
    this.player2 = 2;
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
  public checkWin(): number {
    let winner: number = 0;
    //check rows
    this.board.forEach((row: number[]) => {
      let localWinner: number = this.checkRow(row);
      if (localWinner === 1 || localWinner === 2) {
        winner = localWinner;
      }
    });

    //check columns
    for (let col = 0; col < this.board.length; col++) {
      let column: number[] = [];
      for (let row = 0; row < this.board.length; row++) {
        column.push(this.board[row][col]);
      }
      let localWinner: number = this.checkRow(column);
      if (localWinner === 1 || localWinner === 2) {
        winner = localWinner;
      }
    }

    //check diagnals
    //TODO
    //returns 0 if no winner
    return winner;
  }
  private checkRow(row: number[]): number {
    let player: number = row[0];
    let count: number = 1;
    for (let i = 1; i < row.length; i++) {
      if (player === row[i]) {
        count++;
      }
      if (count === 4) {
        return player;
      }
      if (player !== row[i]) {
        count = 1;
      }
      player = row[i];
    }
    //returns 0 if no win
    return 0;
  }
}
