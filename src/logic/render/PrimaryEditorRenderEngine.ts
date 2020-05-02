import { EditorData } from 'interfaces/EditorData';
import { IRect } from 'interfaces/IRect';
import { ViewPortActions } from 'logic/actions/ViewPortActions';
import { EditorModel } from 'staticModels/EditorModel';
import { BaseRenderEngine } from './BaseRenderEngine';

export class PrimaryEditorRenderEngine extends BaseRenderEngine {
  public constructor(canvas: HTMLCanvasElement) {
    super(canvas);
  }

  // =================================================================================================================
  // EVENT HANDLERS
  // =================================================================================================================

  public mouseMoveHandler(data: EditorData): void {}
  public mouseDownHandler(data: EditorData): void {}
  public mouseUpHandler(data: EditorData): void {}

  // =================================================================================================================
  // RENDERING
  // =================================================================================================================

  public render(data: EditorData): void {
    EditorModel.primaryRenderingEngine.drawImage(
      EditorModel.image,
      ViewPortActions.calculateViewPortContentImageRect(),
    );
  }

  public drawImage(image: HTMLImageElement, imageRect: IRect) {
    if (!!image && !!this.canvas) {
      const ctx = this.canvas.getContext('2d');
      ctx.drawImage(image, imageRect.x, imageRect.y, imageRect.width, imageRect.height);
    }
  }

  isInProgress(): boolean {
    return false;
  }
}
