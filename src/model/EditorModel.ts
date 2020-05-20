import Scrollbars from 'react-custom-scrollbars';
import { IPoint } from '../interfaces/IPoint';
import { IRect } from '../interfaces/IRect';
import { ISize } from '../interfaces/ISize';
import { BaseEngine } from '../logic/engines/BaseEngine';
import { PrimaryEngine } from '../logic/engines/PrimaryEngine';
import { ViewPortHelper } from '../logic/ViewPortHelper';

export class EditorModel {
  public static editor: HTMLDivElement;
  public static canvas: HTMLCanvasElement;
  public static mousePositionIndicator: HTMLDivElement;
  public static cursor: HTMLDivElement;
  public static viewPortScrollbars: Scrollbars;
  public static image: HTMLImageElement;

  public static primaryRenderingEngine: PrimaryEngine;
  public static supportRenderingEngine: BaseEngine;

  public static viewPortHelper: ViewPortHelper;

  public static isLoading: boolean = false;
  public static viewPortActionsDisabled: boolean = false;
  public static mousePositionOnViewPortContent: IPoint;
  public static viewPortSize: ISize;

  // x and y describe the dimension of the margin that remains constant regardless of the scale of the image
  // width and height describes the render image size for 100% scale
  public static defaultRenderImageRect: IRect;
}
