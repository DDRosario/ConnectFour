export type Action =
  | {
      type: 'GET_BOARD';
      board: number[][];
    }
  | {
      type: 'NEW_GAME';
    }
  | {
      type: 'TURN';
    };
