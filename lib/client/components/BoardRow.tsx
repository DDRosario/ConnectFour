import * as React from 'react';
import { BoardCell, cell } from './BoardCell';

export interface BoardRowProps {
  row: cell[];
  placeMove: Function;
}

export const BoardRow = (props: BoardRowProps) => {
  return (
    <span className="boardRow">
      {props.row.map((cell, i) => {
        return (
          <BoardCell
            cell={cell}
            key={i}
            placeMove={props.placeMove}
            column={i}
          />
        );
      })}
    </span>
  );
};
