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
    if (this.turn) {
      return this.player1;
    } else {
      return this.player2;
    }
  }
  public checkWin(): void {}

  public placeMove(coordinate: number): void {}
}
