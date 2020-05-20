import { Direction } from './enums/Direction';
import { IPoint } from './IPoint';

export interface IRectAnchor {
  type: Direction;
  position: IPoint;
}
