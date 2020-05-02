import { Direction } from './enums/Direction';
import { IPoint } from './IPoint';

export interface RectAnchor {
  type: Direction;
  position: IPoint;
}
