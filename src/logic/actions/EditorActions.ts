import { CursorType } from 'interfaces/enums/CursorType';
import { LabelType } from 'interfaces/enums/LabelType';
import { IEditorData } from 'interfaces/IEditorData';
import { IPoint } from 'interfaces/IPoint';
import { IRect } from 'interfaces/IRect';
import { ISize } from 'interfaces/ISize';
import { ViewPortHelper } from 'logic/helpers/ViewPortHelper';
import { PolygonRenderEngine } from 'logic/render/PolygonRenderEngine';
import { PrimaryEditorRenderEngine } from 'logic/render/PrimaryEditorRenderEngine';
import { RectRenderEngine } from 'logic/render/RectRenderEngine';
import { EditorModel } from 'model/EditorModel';
import React from 'react';
import { GeneralSelector } from 'store/selectors/GeneralSelector';
import { CanvasUtil } from 'utils/CanvasUtil';
import { DrawUtil } from 'utils/DrawUtil';
import { ImageUtil } from 'utils/ImageUtil';
import { PointUtil } from 'utils/PointUtil';
import { RectUtil } from 'utils/RectUtil';
import { ViewPortActions } from './ViewPortActions';

export class EditorActions {
  // =================================================================================================================
  // RENDER ENGINES
  // =================================================================================================================

  public static mountSupportRenderingEngine(activeLabelType: LabelType) {
    EditorModel.supportRenderingEngine =
      activeLabelType === LabelType.RECTANGLE
        ? new RectRenderEngine(EditorModel.canvas)
        : new PolygonRenderEngine(EditorModel.canvas);
  }

  public static swapSupportRenderingEngine(activeLabelType: LabelType) {
    EditorActions.mountSupportRenderingEngine(activeLabelType);
  }

  public static mountRenderEnginesAndHelpers(activeLabelType: LabelType) {
    EditorModel.viewPortHelper = new ViewPortHelper();
    EditorModel.primaryRenderingEngine = new PrimaryEditorRenderEngine(EditorModel.canvas);
    EditorActions.mountSupportRenderingEngine(activeLabelType);
  }

  // =================================================================================================================
  // RENDER
  // =================================================================================================================

  public static fullRender() {
    DrawUtil.clearCanvas(EditorModel.canvas);
    EditorModel?.primaryRenderingEngine?.render();
    EditorModel?.supportRenderingEngine?.render(EditorActions.getEditorData());
  }

  // =================================================================================================================
  // SETTERS
  // =================================================================================================================

  public static setLoadingStatus(status: boolean) {
    EditorModel.isLoading = status;
  }
  public static setActiveImage(image: HTMLImageElement) {
    EditorModel.image = image;
  }

  public static setViewPortActionsDisabledStatus(status: boolean) {
    EditorModel.viewPortActionsDisabled = status;
  }

  // =================================================================================================================
  // GETTERS
  // =================================================================================================================

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

  // =================================================================================================================
  // HELPERS
  // =================================================================================================================

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
