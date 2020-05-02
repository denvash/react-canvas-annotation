import { IPoint } from './IPoint';
import { IRect } from './IRect';
import { ISize } from './ISize';

export interface IEditorData {
  viewPortContentSize: ISize;
  mousePositionOnViewPortContent: IPoint;
  event?: Event;
  zoom: number;
  viewPortSize: ISize;
  defaultRenderImageRect: IRect;
  realImageSize: ISize;
  viewPortContentImageRect: IRect;
  absoluteViewPortContentScrollPosition: IPoint;
}
