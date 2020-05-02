import { EventType } from 'interfaces/enums/EventType';
import { LabelType } from 'interfaces/enums/LabelType';
import { IEditorData } from 'interfaces/IEditorData';
import { LabelsData } from 'store/labels/types';
import { MouseEventUtil } from 'utils/MouseEventUtil';

export abstract class BaseRenderEngine {
  protected readonly canvas: HTMLCanvasElement;
  public labelType: LabelType;

  protected constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  public update(data: IEditorData, onLabelsDataChange?: (labelsData: LabelsData) => void): void {
    if (!!data.event) {
      switch (MouseEventUtil.getEventType(data.event)) {
        case EventType.MOUSE_MOVE:
          this.mouseMoveHandler(data);
          break;
        case EventType.MOUSE_UP:
          this.mouseUpHandler(data, onLabelsDataChange);
          break;
        case EventType.MOUSE_DOWN:
          this.mouseDownHandler(data);
          break;
        default:
          break;
      }
    }
  }

  protected abstract mouseDownHandler(data: IEditorData): void;
  protected abstract mouseMoveHandler(data: IEditorData): void;
  protected abstract mouseUpHandler(
    data: IEditorData,
    onLabelsDataChange?: (labelsData: LabelsData) => void,
  ): void;

  abstract render(data: IEditorData): void;

  abstract isInProgress(): boolean;
}
