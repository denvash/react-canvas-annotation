import { IRect } from 'interfaces/IRect';
import { ViewPortActions } from 'logic/actions/ViewPortActions';
import { EditorModel } from 'staticModels/EditorModel';
import { BaseRenderEngine } from './BaseRenderEngine';

export class PrimaryEditorRenderEngine extends BaseRenderEngine {
  public constructor(canvas: HTMLCanvasElement) {
    super(canvas);
  }

  public mouseMoveHandler(): void {}
  public mouseDownHandler(): void {}
  public mouseUpHandler(): void {}

  public render(): void {
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
