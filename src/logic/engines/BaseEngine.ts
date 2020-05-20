import { IEditorData } from 'interfaces';
import { EventType, LabelType } from 'interfaces/enums';
import { LabelsData } from 'store/labels/types';
import { MouseEventUtil } from 'utils/MouseEventUtil';

export abstract class BaseEngine {
  protected readonly canvas: HTMLCanvasElement;
  public labelType: LabelType;

  protected constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  public update(
    data: IEditorData,
    onLabelsDataChange?: (labelsData: LabelsData) => void,
    onHover?: (id: string) => void,
    onClick?: (id: string) => void,
  ): void {
    if (!!data.event) {
      switch (MouseEventUtil.getEventType(data.event)) {
        case EventType.MOUSE_MOVE:
          this.mouseMoveHandler(data, onHover);
          break;
        case EventType.MOUSE_UP:
          this.mouseUpHandler(data, onLabelsDataChange);
          break;
        case EventType.MOUSE_DOWN:
          this.mouseDownHandler(data, onClick, onLabelsDataChange);
          break;
        default:
          break;
      }
    }
  }

  protected abstract mouseDownHandler(
    data: IEditorData,
    onClick?: (id: string) => void,
    onLabelsDataChange?: (labelsData: LabelsData) => void,
  ): void;

  protected abstract mouseMoveHandler(data: IEditorData, onHover?: (id: string) => void): void;

  protected abstract mouseUpHandler(
    data: IEditorData,
    onLabelsDataChange?: (labelsData: LabelsData) => void,
  ): void;

  abstract render(data: IEditorData): void;
  abstract isInProgress(): boolean;
}
