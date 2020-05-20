import { IEditorData, IPoint, IRect, ISize } from 'interfaces';
import { CursorType } from 'interfaces/enums';
import { EditorModel } from 'model';
import { GeneralSelector } from 'store/selectors';
import { CanvasUtil, DrawUtil, ImageUtil, PointUtil, RectUtil } from 'utils';
import { PrimaryEngine } from './engines';
import { ViewPortActions } from './ViewPortActions';
import { ViewPortHelper } from './ViewPortHelper';

export class EditorActions {
  public static mountRenderEnginesAndHelpers() {
    EditorModel.viewPortHelper = new ViewPortHelper();
    EditorModel.primaryRenderingEngine = new PrimaryEngine(EditorModel.canvas);
  }

  public static fullRender() {
    DrawUtil.clearCanvas(EditorModel.canvas);
    EditorModel?.primaryRenderingEngine?.render();
    EditorModel?.supportRenderingEngine?.render(EditorActions.getEditorData());
  }

  public static setLoadingStatus(status: boolean) {
    EditorModel.isLoading = status;
  }
  public static setActiveImage(image: HTMLImageElement) {
    EditorModel.image = image;
  }

  public static setViewPortActionsDisabledStatus(status: boolean) {
    EditorModel.viewPortActionsDisabled = status;
  }

  public static getEditorData(event?: Event): IEditorData {
    return {
      mousePositionOnViewPortContent: EditorModel.mousePositionOnViewPortContent,
      viewPortContentSize: CanvasUtil.getSize(EditorModel.canvas),
      event: event,
      zoom: GeneralSelector.getZoom(),
      viewPortSize: EditorModel.viewPortSize,
      defaultRenderImageRect: EditorModel.defaultRenderImageRect,
      viewPortContentImageRect: ViewPortActions.calculateViewPortContentImageRect(),
      realImageSize: ImageUtil.getSize(EditorModel.image),
      absoluteViewPortContentScrollPosition: ViewPortActions.getAbsoluteScrollPosition(),
    };
  }

  public static updateMousePositionIndicator(
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent> | MouseEvent,
  ) {
    if (!EditorModel.image || !EditorModel.canvas) {
      EditorModel.mousePositionIndicator.style.display = 'none';
      EditorModel.cursor.style.display = 'none';
      return;
    }

    const mousePositionOverViewPortContent: IPoint = CanvasUtil.getMousePositionOnCanvasFromEvent(
      event,
      EditorModel.canvas,
    );
    const viewPortContentScrollPosition: IPoint = ViewPortActions.getAbsoluteScrollPosition();
    const viewPortContentImageRect: IRect = ViewPortActions.calculateViewPortContentImageRect();
    const mousePositionOverViewPort: IPoint = PointUtil.subtract(
      mousePositionOverViewPortContent,
      viewPortContentScrollPosition,
    );
    const isMouseOverImage: boolean = RectUtil.isPointInside(
      viewPortContentImageRect,
      mousePositionOverViewPortContent,
    );
    const isMouseOverViewPort: boolean = RectUtil.isPointInside(
      { x: 0, y: 0, ...EditorModel.viewPortSize },
      mousePositionOverViewPort,
    );

    if (isMouseOverViewPort && !GeneralSelector.getPreventCustomCursorStatus()) {
      EditorModel.cursor.style.left = mousePositionOverViewPort.x + 'px';
      EditorModel.cursor.style.top = mousePositionOverViewPort.y + 'px';
      EditorModel.cursor.style.display = 'block';

      if (
        isMouseOverImage &&
        ![CursorType.GRAB, CursorType.GRABBING].includes(GeneralSelector.getCustomCursorStyle())
      ) {
        const imageSize: ISize = ImageUtil.getSize(EditorModel.image);
        const scale: number = imageSize.width / viewPortContentImageRect.width;
        const mousePositionOverImage: IPoint = PointUtil.multiply(
          PointUtil.subtract(mousePositionOverViewPortContent, viewPortContentImageRect),
          scale,
        );
        const text: string =
          'x: ' +
          Math.round(mousePositionOverImage.x) +
          ', y: ' +
          Math.round(mousePositionOverImage.y);

        EditorModel.mousePositionIndicator.innerHTML = text;
        EditorModel.mousePositionIndicator.style.left = mousePositionOverViewPort.x + 15 + 'px';
        EditorModel.mousePositionIndicator.style.top = mousePositionOverViewPort.y + 15 + 'px';
        EditorModel.mousePositionIndicator.style.display = 'block';
      } else {
        EditorModel.mousePositionIndicator.style.display = 'none';
      }
    } else {
      EditorModel.cursor.style.display = 'none';
      EditorModel.mousePositionIndicator.style.display = 'none';
    }
  }
}
