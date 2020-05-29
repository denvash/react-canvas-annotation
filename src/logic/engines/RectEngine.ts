import { RENDER_ENGINE } from 'config';
import { IEditorData, IPoint, IRect, IRectAnchor } from 'interfaces';
import { CursorType, LabelType } from 'interfaces/enums';
import { store } from 'store';
import { updateCustomCursorStyle } from 'store/general/actionCreators';
import {
  updateActiveLabelId,
  updateHighlightedLabelId,
  updateImageData,
} from 'store/labels/actionCreators';
import { AnnotationData, LabelRect, LabelsData } from 'store/labels/types';
import { GeneralSelector, LabelsSelector } from 'store/selectors';
import { DrawUtil, PointUtil, RectUtil, RenderEngineUtil } from 'utils';
import uuid from 'uuid';
import { EditorActions } from '../EditorActions';
import { BaseEngine } from './BaseEngine';

export class RectEngine extends BaseEngine {
  private config: typeof RENDER_ENGINE = RENDER_ENGINE;
  private startCreateRectPoint: IPoint;
  private startResizeRectAnchor: IRectAnchor;

  public constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    this.labelType = LabelType.RECTANGLE;
  }

  public mouseDownHandler = (data: IEditorData, onClick?: (id: string) => void) => {
    const isMouseOverImage: boolean = RenderEngineUtil.isMouseOverImage(data);
    const isMouseOverCanvas: boolean = RenderEngineUtil.isMouseOverCanvas(data);

    if (isMouseOverCanvas) {
      const rectUnderMouse: LabelRect = this.getRectUnderMouse(data);
      if (!!rectUnderMouse) {
        const rect: IRect = this.calculateRectRelativeToActiveImage(rectUnderMouse.rect, data);
        const anchorUnderMouse: IRectAnchor = this.getAnchorUnderMouseByRect(
          rect,
          data.mousePositionOnViewPortContent,
          data.viewPortContentImageRect,
        );

        const highlightedLabelId = LabelsSelector.getHighlightedLabelId();

        if (!!anchorUnderMouse) {
          onClick(rectUnderMouse.id);
          store.dispatch(updateActiveLabelId(rectUnderMouse.id));
          this.startRectResize(anchorUnderMouse);
        } else {
          if (!!highlightedLabelId) {
            onClick(highlightedLabelId);
            store.dispatch(updateActiveLabelId(highlightedLabelId));
          } else {
            this.startRectCreation(data.mousePositionOnViewPortContent);
          }
        }
      } else if (isMouseOverImage) {
        this.startRectCreation(data.mousePositionOnViewPortContent);
      }
    }
  };

  public mouseUpHandler = (
    data: IEditorData,
    onLabelsDataChange?: (labelsData: LabelsData) => void,
  ) => {
    if (!!data.viewPortContentImageRect) {
      const mousePositionSnapped: IPoint = RectUtil.snapPointToRect(
        data.mousePositionOnViewPortContent,
        data.viewPortContentImageRect,
      );
      const activeLabelRect: LabelRect = LabelsSelector.getActiveRectLabel();

      if (
        !!this.startCreateRectPoint &&
        !PointUtil.equals(this.startCreateRectPoint, mousePositionSnapped)
      ) {
        const minX: number = Math.min(this.startCreateRectPoint.x, mousePositionSnapped.x);
        const minY: number = Math.min(this.startCreateRectPoint.y, mousePositionSnapped.y);
        const maxX: number = Math.max(this.startCreateRectPoint.x, mousePositionSnapped.x);
        const maxY: number = Math.max(this.startCreateRectPoint.y, mousePositionSnapped.y);

        const rect = {
          x: minX,
          y: minY,
          width: maxX - minX,
          height: maxY - minY,
        };
        this.addRectLabel(
          RenderEngineUtil.transferRectFromImageToViewPortContent(rect, data),
          onLabelsDataChange,
        );
      }

      if (!!this.startResizeRectAnchor && !!activeLabelRect) {
        const rect: IRect = this.calculateRectRelativeToActiveImage(activeLabelRect.rect, data);
        const startAnchorPosition: IPoint = PointUtil.add(
          this.startResizeRectAnchor.position,
          data.viewPortContentImageRect,
        );
        const delta: IPoint = PointUtil.subtract(mousePositionSnapped, startAnchorPosition);
        const resizeRect: IRect = RectUtil.resizeRect(rect, this.startResizeRectAnchor.type, delta);
        const scale: number = RenderEngineUtil.calculateImageScale(data);
        const scaledRect: IRect = RectUtil.scaleRect(resizeRect, scale);

        const imageData = LabelsSelector.getImageData();
        imageData.labelRects = imageData.labelRects.map((labelRect: LabelRect) => {
          if (labelRect.id === activeLabelRect.id) {
            return {
              ...labelRect,
              rect: scaledRect,
            };
          }
          return labelRect;
        });
        const { labelRects, labelPolygons } = imageData;
        const labelsData: LabelsData = { labelRects, labelPolygons };
        onLabelsDataChange(labelsData);
        store.dispatch(updateImageData(imageData));
      }
    }
    this.endRectTransformation();
  };

  public mouseMoveHandler = (
    data: IEditorData,
    onHover?: (id: string) => void,
    onMouseOut?: (id: string) => void,
  ) => {
    if (!!data.viewPortContentImageRect && !!data.mousePositionOnViewPortContent) {
      const isOverImage: boolean = RenderEngineUtil.isMouseOverImage(data);
      if (isOverImage && !this.startResizeRectAnchor) {
        const labelRect: LabelRect = this.getRectUnderMouse(data);
        if (!!labelRect && !this.isInProgress()) {
          if (LabelsSelector.getHighlightedLabelId() !== labelRect.id) {
            onHover(labelRect.id);
            store.dispatch(updateHighlightedLabelId(labelRect.id));
          }
        } else {
          if (LabelsSelector.getHighlightedLabelId() !== null) {
            onMouseOut(LabelsSelector.getHighlightedLabelId());
            store.dispatch(updateHighlightedLabelId(null));
          }
        }
      }
    }
  };

  public render(data: IEditorData) {
    const activeLabelId: string = LabelsSelector.getActiveLabelId();
    const imageData: AnnotationData = LabelsSelector.getImageData();

    if (imageData) {
      imageData.labelRects.forEach((labelRect: LabelRect) => {
        const displayAsActive: boolean = labelRect.id === activeLabelId;
        displayAsActive
          ? this.drawActiveRect(labelRect, data)
          : this.drawInactiveRect(labelRect, data);
      });
      this.drawCurrentlyCreatedRect(
        data.mousePositionOnViewPortContent,
        data.viewPortContentImageRect,
      );
      this.updateCursorStyle(data);
    }
  }

  private drawCurrentlyCreatedRect(mousePosition: IPoint, imageRect: IRect) {
    if (!!this.startCreateRectPoint) {
      const mousePositionSnapped: IPoint = RectUtil.snapPointToRect(mousePosition, imageRect);
      const activeRect: IRect = {
        x: this.startCreateRectPoint.x,
        y: this.startCreateRectPoint.y,
        width: mousePositionSnapped.x - this.startCreateRectPoint.x,
        height: mousePositionSnapped.y - this.startCreateRectPoint.y,
      };
      const activeRectBetweenPixels = RenderEngineUtil.setRectBetweenPixels(activeRect);
      DrawUtil.drawRect(
        this.canvas,
        activeRectBetweenPixels,
        this.config.lineActiveColor,
        this.config.lineThickness,
      );
    }
  }

  private drawInactiveRect(labelRect: LabelRect, data: IEditorData) {
    const rectOnImage: IRect = RenderEngineUtil.transferRectFromViewPortContentToImage(
      labelRect.rect,
      data,
    );
    const highlightedLabelId: string = LabelsSelector.getHighlightedLabelId();
    const displayAsActive: boolean = labelRect.id === highlightedLabelId;
    this.renderRect(rectOnImage, displayAsActive);
  }

  private drawActiveRect(labelRect: LabelRect, data: IEditorData) {
    let rect: IRect = this.calculateRectRelativeToActiveImage(labelRect.rect, data);
    if (!!this.startResizeRectAnchor) {
      const startAnchorPosition: IPoint = PointUtil.add(
        this.startResizeRectAnchor.position,
        data.viewPortContentImageRect,
      );
      const endAnchorPositionSnapped: IPoint = RectUtil.snapPointToRect(
        data.mousePositionOnViewPortContent,
        data.viewPortContentImageRect,
      );
      const delta = PointUtil.subtract(endAnchorPositionSnapped, startAnchorPosition);
      rect = RectUtil.resizeRect(rect, this.startResizeRectAnchor.type, delta);
    }
    const rectOnImage: IRect = RectUtil.translate(rect, data.viewPortContentImageRect);
    this.renderRect(rectOnImage, true);
  }

  private renderRect(rectOnImage: IRect, isActive: boolean) {
    const rectBetweenPixels = RenderEngineUtil.setRectBetweenPixels(rectOnImage);

    const lineColor: string = isActive
      ? this.config.lineActiveColor
      : this.config.lineInactiveColor;

    DrawUtil.drawRect(this.canvas, rectBetweenPixels, lineColor, this.config.lineThickness);

    if (isActive) {
      const handleCenters: IPoint[] = RectUtil.mapRectToAnchors(rectOnImage).map(
        (rectAnchor: IRectAnchor) => rectAnchor.position,
      );
      handleCenters.forEach((center: IPoint) => {
        const handleRect: IRect = RectUtil.getRectWithCenterAndSize(center, this.config.anchorSize);
        const handleRectBetweenPixels: IRect = RenderEngineUtil.setRectBetweenPixels(handleRect);
        DrawUtil.drawRectWithFill(
          this.canvas,
          handleRectBetweenPixels,
          this.config.activeAnchorColor,
        );
      });
    }
  }

  private updateCursorStyle(data: IEditorData) {
    if (
      !!this.canvas &&
      !!data.mousePositionOnViewPortContent &&
      !GeneralSelector.getImageDragModeStatus()
    ) {
      const rectAnchorUnderMouse: IRectAnchor = this.getAnchorUnderMouse(data);
      if (!!rectAnchorUnderMouse || !!this.startResizeRectAnchor) {
        store.dispatch(updateCustomCursorStyle(CursorType.MOVE));
        return;
      } else if (RenderEngineUtil.isMouseOverCanvas(data)) {
        if (!RenderEngineUtil.isMouseOverImage(data) && !!this.startCreateRectPoint)
          store.dispatch(updateCustomCursorStyle(CursorType.MOVE));
        else RenderEngineUtil.wrapDefaultCursorStyleInCancel(data);
        this.canvas.style.cursor = 'none';
      } else {
        this.canvas.style.cursor = 'default';
      }
    }
  }

  // =================================================================================================================
  // HELPERS
  // =================================================================================================================

  public isInProgress(): boolean {
    return !!this.startCreateRectPoint || !!this.startResizeRectAnchor;
  }

  private calculateRectRelativeToActiveImage(rect: IRect, data: IEditorData): IRect {
    const scale: number = RenderEngineUtil.calculateImageScale(data);
    return RectUtil.scaleRect(rect, 1 / scale);
  }

  private addRectLabel = (rect: IRect, onLabelsDataChange) => {
    const imageData: AnnotationData = LabelsSelector.getImageData();
    const labelRect: LabelRect = {
      id: uuid.v4(),
      rect,
    };
    imageData.labelRects.push(labelRect);
    const { labelRects, labelPolygons } = imageData;
    const labelsData: LabelsData = { labelRects, labelPolygons };
    onLabelsDataChange(labelsData);
    store.dispatch(updateImageData(imageData));
    store.dispatch(updateActiveLabelId(labelRect.id));
  };

  private getRectUnderMouse(data: IEditorData): LabelRect {
    const activeRectLabel: LabelRect = LabelsSelector.getActiveRectLabel();
    if (!!activeRectLabel && this.isMouseOverRectEdges(activeRectLabel.rect, data)) {
      return activeRectLabel;
    }

    const labelRects: LabelRect[] = LabelsSelector.getImageData().labelRects;
    for (let i = 0; i < labelRects.length; i++) {
      if (this.isMouseOverRectEdges(labelRects[i].rect, data)) {
        return labelRects[i];
      }
    }
    return null;
  }

  private isMouseOverRectEdges(rect: IRect, data: IEditorData): boolean {
    const rectOnImage: IRect = RectUtil.translate(
      this.calculateRectRelativeToActiveImage(rect, data),
      data.viewPortContentImageRect,
    );

    const outerRectDelta: IPoint = {
      x: this.config.anchorHoverSize.width / 2,
      y: this.config.anchorHoverSize.height / 2,
    };
    const outerRect: IRect = RectUtil.expand(rectOnImage, outerRectDelta);

    const innerRectDelta: IPoint = {
      x: -this.config.anchorHoverSize.width / 2,
      y: -this.config.anchorHoverSize.height / 2,
    };
    const innerRect: IRect = RectUtil.expand(rectOnImage, innerRectDelta);

    return (
      RectUtil.isPointInside(outerRect, data.mousePositionOnViewPortContent) &&
      !RectUtil.isPointInside(innerRect, data.mousePositionOnViewPortContent)
    );
  }

  private getAnchorUnderMouseByRect(
    rect: IRect,
    mousePosition: IPoint,
    imageRect: IRect,
  ): IRectAnchor {
    const rectAnchors: IRectAnchor[] = RectUtil.mapRectToAnchors(rect);
    for (let i = 0; i < rectAnchors.length; i++) {
      const anchorRect: IRect = RectUtil.translate(
        RectUtil.getRectWithCenterAndSize(rectAnchors[i].position, this.config.anchorHoverSize),
        imageRect,
      );
      if (!!mousePosition && RectUtil.isPointInside(anchorRect, mousePosition)) {
        return rectAnchors[i];
      }
    }
    return null;
  }

  private getAnchorUnderMouse(data: IEditorData): IRectAnchor {
    const labelRects: LabelRect[] = LabelsSelector.getImageData().labelRects;
    for (let i = 0; i < labelRects.length; i++) {
      const rect: IRect = this.calculateRectRelativeToActiveImage(labelRects[i].rect, data);
      const rectAnchor = this.getAnchorUnderMouseByRect(
        rect,
        data.mousePositionOnViewPortContent,
        data.viewPortContentImageRect,
      );
      if (!!rectAnchor) return rectAnchor;
    }
    return null;
  }

  private startRectCreation(mousePosition: IPoint) {
    this.startCreateRectPoint = mousePosition;
    store.dispatch(updateActiveLabelId(null));
    EditorActions.setViewPortActionsDisabledStatus(true);
  }

  private startRectResize(activatedAnchor: IRectAnchor) {
    this.startResizeRectAnchor = activatedAnchor;
    EditorActions.setViewPortActionsDisabledStatus(true);
  }

  private endRectTransformation() {
    this.startCreateRectPoint = null;
    this.startResizeRectAnchor = null;
    EditorActions.setViewPortActionsDisabledStatus(false);
  }
}
